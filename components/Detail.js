const Detail = {
    name: 'Detail',
    template: 
    `
    <div class="row-container">
            <h1>{{title}}</h1>
        
            <p>Nombre 
            </p>
            {{reservation.Name}}
        
            <p>Apellidos 
            </p>
            {{reservation.LastName}}
        
            <p>Telefono 
            </p>
            {{reservation.Phone}}
        
            <p>Comensales 
            </p>
            {{reservation.comensales}}
        
            <p>Comentarios 
            </p>
            {{reservation.Comentarios}}

            <button @click="$router.push('/')">Volver</button>
        
    </div>   
    `,
    data: function() {
        return {
            title: 'Reserva',
            reservation: {}
        };
    },
    methods: {

    },
    mounted() {
        this.reservation = this.$store.state.reservation;
    }
};
