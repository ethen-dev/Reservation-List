const routes = [
    { path: '/', component: ReservationList },
    { path: '/24', component: ReservationList },
    { path: '/new', component: NewReservation },
    { path: '/modify', component: NewReservation },
    { path: '/detail', component: Detail }
];

const router = new VueRouter({
    routes,
});
