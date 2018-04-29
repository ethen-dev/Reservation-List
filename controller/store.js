const store = new Vuex.Store({
    state: {
        index: '',
        reservation: {},
        in24: false,
    },
    mutations: {
        setIndex(state, value){
            state.index = value;
        },
        setReservationValues(state, value){
            state.reservation = value;
        },
        setIn24State(state, value) {
            state.in24 = !state.in24;
        }
    },
});
