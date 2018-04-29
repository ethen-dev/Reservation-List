const ReservationList = {
    name: 'ReservationList',
    template: 
    `<div class="content-container">
        <h1>Listado de reservas</h1>
        <div class="data row">
            <div>{{dataCol1}}</div>
            <div>{{dataCol2}}</div>
            <div>{{dataCol3}}</div>
            <div>{{dataCol4}}</div>
            <div></div>
        </div>
        <div class="row-container">
            <div class="row" v-for="(reservation, index) in reservations" v-bind:class="hidden(reservation.Date)">
                <div>{{reservation.Name}}</div>
                <div>{{reservation.LastName}}</div>
                <div>{{reservation.Date}}</div>
                <div>{{reservation.comensales}}</div>
                <div class="row-container">
                    <button @click="setReservationValues(reservation)">Detalle</button>
                    <button @click="setIndex(index, reservation)">Modificar</button>
                    <button @click="deleteReservation(reservation)">Eliminar</button>
                </div>
            </div>
        </div>
        <div class="row">
            <button @click="$router.push('/new')">Nueva Reserva</button>
            <button v-if="in24" @click="filter">{{button24}}</button>
        </div>
    </div>`,
    data: function() {
        return {
            title: 'Listado de reservas',
            dataCol1: 'Nombre',
            dataCol2: 'Apellido',
            dataCol3: 'Fecha',
            dataCol4: 'Comensales',
            dataCol5: '',
            reservations: [],
            in24: false,
            button24: 'Reservas 24h'
        };
    },
    computed: {
        in24C() {
            return this.$store.state.in24;
        }
    },
    methods: {
        hidden(date) {
            let resDate = this.getDates(date);
            if (this.$route.path.includes('24')) {
                if (this.close(date)){
                   return {
                       active: true
                   }
               } else {
                   return {
                       hidden: true
                   }
               }
            }

        },
        filter() {
            if(!this.$route.path.includes('24')) {
                this.title = 'reservas en las proximas 24h';
                this.button24 = 'todas las reservas'
                this.$router.push('/24');
            } else {
                this.title = 'Listado de reservas';
                this.button24 = 'Reservas 24h'
                this.$router.push('/');
            }
        },
        setIndex(i, reservation) {
            this.$store.commit('setIndex', reservation.id)
            this.$store.commit('setReservationValues', reservation);
            this.$router.push('/modify');
        },
        setReservationValues(reservation) {
            this.$store.commit('setReservationValues', reservation);
            this.$router.push('/detail');
        },
        deleteReservation(res) {
            fireRefToCollection.doc(res.id).delete().then( () => {
                console.log('Deleted');
              }).catch( (error) => {
                console.log(error);
            });
        },
        getDate() {
            let x = new Date();
            let year = x.getFullYear();
            let month = x.getMonth()+1;
            let day = x.getDate();
            let hour = x.getHours();
            let dateObj = {
                day: day,
                month: month,
                year: year,
                hour: hour
            }
            return dateObj;
        },
        getDates(date) {
            let res = {}
            res.day = date.split('/').slice(0)[0],
            res.month = date.split('/').slice(1)[0]
            res.year = date.split('/').slice(2)[0].split(':').slice(0)[0],
            res.hour = date.split('/').slice(2)[0].split(':').slice(1)[0]
            return res;
        },
        nextReserves() {
            if (this.reservations.length != 0) {
                let today = this.getDate();
                let reservationDate;
                for (let index = 0; index < this.reservations.length; index++) {
                    reservationDate = this.getDates(this.reservations[index].Date);
                    if (today.year == reservationDate.year) {
                        if (today.month == reservationDate.month) {
                            if (today.day == reservationDate.day || (reservationDate.day == (today.day+1))) {
                                this.in24 = true;
                            } else {
                                this.in24 = false;
                            }
                        }
                    }  
                }
            } else {
                this.in24 = false;
            }
        },
        close(date){
            let today = this.getDate();
            let res = this.getDates(date);
            if (today.year == res.year) {
                if (today.month == res.month) {
                    if (today.day == res.day || (res.day == (today.day+1))) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    },
    mounted() {
        getRealtimeUpdateCollection = (collection) => {
            fireRefToCollection.onSnapshot( (querySnapshot) => {
              var data = [];
              let i = 0;
              querySnapshot.forEach((doc) => {
                data.push(doc.data());
                data[i].id = doc.id;
                i++;
              });
              this.reservations = data;
            });
          }
        getRealtimeUpdateCollection('reservation');
        setTimeout(()=> {
            this.nextReserves();
        },1000);
    },
    updated() {
        this.nextReserves();
    }
};
