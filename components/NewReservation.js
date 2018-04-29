const NewReservation = {
    name: 'NewReservation',
    template: 
    `
    <div class="row-container">
        <p>{{warning}}</p>
        <div class="row">
            <h1>{{title}}</h1>
        </div>
        <div class="row">
            <p>Nombre
            </p>
            <input type="text" v-model="name">
        </div>
        <div class="row">
            <p>Apellidos
            </p>
            <input type="text" v-model="lastName">
        </div>
        <div class="row">
            <p>Telefono
            </p>
            <input type="text" v-model="phone">
        </div>
        <div class="row">
            <p>Comensales
            </p>
            <select v-model="sCom">
                <option v-for="com in comensales" v-bind:value="com.value">{{com.text}}</option>
            </select>
        </div>
        <div class="row">
            <p>Fecha
            </p>

            <select v-model="sDay" v-bind:class="{warning: fail}">
                <option v-for="day in days" v-bind:value="day.value">{{day.text}}</option>
            </select>
            <select v-model="sMonth" v-bind:class="{warning: fail}">
                <option v-for="month in months" v-bind:value="month.value">{{month.text}}</option>
            </select>
            <select v-model="sYear" v-bind:class="{warning: fail}">
                <option v-for="year in years" v-bind:value="year.value">{{year.text}}</option>
            </select>
            <select v-model="sHour" v-bind:class="{warning: fail}">
                <option v-for="hour in hours" v-bind:value="hour.value">{{hour.text}}</option>
            </select>
        </div>
        <div class="row">
            <p>Comentarios
            </p>
            <input type="text" v-model="comments">
        </div>
        <div class="row">
            <button @click="saveReservation" v-if="!this.$route.path.includes('modify')">Guardar</button>
            <button @click="modifyReservation" v-if="this.$route.path.includes('modify')">Modificar</button>
        </div>
    </div>   
    `,
    data: function() {
        return {
            title: 'Nueva reserva',
            name: '',
            lastName: '',
            phone: '',
            comensales: [
                {text:'1', value:1},
                {text:'2', value:2},
                {text:'3', value:3},
                {text:'4', value:4},
                {text:'5', value:5},
                {text:'6', value:6},
                {text:'7', value:7},
                {text:'8', value:8},
                {text:'9', value:9},
                {text:'10', value:10},
            ],
            comments: '',
            hours: [
                {text:'11:00', value:11},
                {text:'12:00', value:12},
                {text:'13:00', value:13},
                {text:'14:00', value:14},
                {text:'19:00', value:19},
                {text:'20:00', value:20},
                {text:'21:00', value:21},
                {text:'22:00', value:22},
                {text:'23:00', value:23}
            ],
            date: Date.now(),
            days: [],
            months: [],
            years: [],
            sDay: '',
            sMonth: '',
            sYear: '',
            sHour: '',
            sCom: '',
            warning: '',
            fail: false
        };
    },
    mounted() {
        let res;
        if (this.$route.path.includes('modify')) {
            this.title = 'Modificar reserva'
            res = this.$store.state.reservation;
            this.name = res.Name;
            this.lastName = res.LastName;
            this.phone = res.Phone;
            this.sCom = res.comensales;
            this.comments = res.Comentarios;
            this.sDay = res.Date.split('/').slice(0)[0],
            this.sMonth = res.Date.split('/').slice(1)[0]
            this.sYear = res.Date.split('/').slice(2)[0].split(':').slice(0)[0],
            this.sHour = res.Date.split('/').slice(2)[0].split(':').slice(1)[0]
        }
        for (let index = 1; index <= 31; index++) {
            let day = {text: index, value: index}
            this.days.push(day);
        }
        for (let index = 1; index <= 12; index++) {
            let month = {text: index, value: index}
            this.months.push(month);
        }
        for (let index = 2018; index <= 2020; index++) {
            let year = {text: index, value: index}
            this.years.push(year);
        }

    },
    methods: {
        saveReservation() {
            let today = this.getDate();
            let date = `${this.sDay}/${this.sMonth}/${this.sYear}:${this.sHour}`;
            if (this.close(date)) {
                db.collection('reservation').add({
                    Name: this.name,
                    LastName: this.lastName,
                    Phone: this.phone,
                    Date: `${this.sDay}/${this.sMonth}/${this.sYear}:${this.sHour}`,
                    comensales: this.sCom,
                    Comentarios: this.comments
                })
                this.$router.push('/');
            } else {
                this.fail = true;
                this.warning = 'La fecha de la reserva ha de ser al menos, 24h posterior a la fecha actual'
            }
        },
        modifyReservation(){
            let today = this.getDate();
            let date = `${this.sDay}/${this.sMonth}/${this.sYear}:${this.sHour}`;
            if (this.close(date)) {
                fireRefToCollection.doc(this.$store.state.index).set({
                    Name: this.name,
                    LastName: this.lastName,
                    Phone: this.phone,
                    Date: `${this.sDay}/${this.sMonth}/${this.sYear}:${this.sHour}`,
                    comensales: this.sCom,
                    Comentarios: this.comments
                  }).then(() => {
                    console.log('Data updated succefully')
                  }).catch(function (error) {
                    console.log(error);
                });
                this.$router.push('/');
            } else {
                this.fail = true;
                this.warning = 'La fecha de la reserva ha de ser al menos, 24h posterior a la fecha actual'
            }
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
        close(date){
            let today = this.getDate();
            let res = this.getDates(date);
            let ret = false;
            if (today.year < res.year) {
                ret = true;
            }
            if (today.year == res.year) {
                if (today.month < res.month) {
                    ret = true;
                }
            }
            if (today.year == res.year) {
                if (today.month == res.month) {
                    if ((res.day > (today.day))) {
                        ret = true;
                    }
                }
            }
            return ret;
        }
    },
};
