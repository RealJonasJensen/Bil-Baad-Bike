import VueRouter from "vue-router";
import Vue from "vue";
import store from "./store/store";

import Forsiden from "./components/Forside/Forside.vue";
import Kategori from "./components/Kategori/Kategori.vue";
import Arkiv from "./components/Arkiv/Arkiv.vue";
import Kontakt from "./components/Kontakt/Kontakt.vue";
import Sponsor from "./components/Sponsor/Sponsor.vue";
import Login from "./components/Login/Login.vue";
import Admin from "./components/Admin/Admin.vue";
import Register from "./components/Admin/Register/Register.vue";
import Redaktion from "./components/Redaktion/Redaktion.vue";
import VisEn from "./components/Artikel/VisEn.vue";
import OpretNy from "./components/Admin/OpretNy/OpretNy.vue";
import Rediger from "./components/Admin/Rediger/Rediger.vue";
import RedigerEn from "./components/Admin/Rediger/RedigerEn.vue";
import Soeg from "./components/Soeg/Soeg.vue";
import AdminKontakt from "./components/Admin/Kontakt/Kontakt.vue";
import AdminPriser from "./components/Admin/Priser/Priser.vue";
import RedigerPriserEn from "./components/Admin/Priser/PriserRedigerEn.vue";
import NyPris from "./components/Admin/Priser/NyPris.vue";
import Beskeder from "./components/Admin/Beskeder/Beskeder.vue";
import RedigerRedaktoer from "./components/Admin/RedigerRedaktoer/RedigerRedaktoer.vue";
import enRedaktoer from "./components/Admin/RedigerRedaktoer/enRedaktoer.vue";

Vue.use(VueRouter);

export const routes = [
    { path: "/", component: Forsiden },
    { path: "/baad", component: Kategori },
    { path: "/bil", component: Kategori },
    { path: "/bike", component: Kategori },
    { path: "/arkiv", component: Arkiv },
    { path: "/kontakt", component: Kontakt },
    { path: "/sponsor", component: Sponsor },
    { path: "/redaktionen", component: Redaktion },
    { path: "/soeg/:term", component: Soeg },
    { path: "/admin", component: Admin }, // Fjern snart
    { path: "/admin/kontakt", component: AdminKontakt }, // Fjern snart
    { path: "/admin/priser", component: AdminPriser }, // Fjern snart
    { path: "/admin/priser/opret", component: NyPris }, // Fjern snart
    { path: "/admin/priser/:id", component: RedigerPriserEn }, // Fjern snart
    { path: "/admin/beskeder/", component: Beskeder }, // Fjern snart
    { path: "/admin/redigerredaktoer", component: RedigerRedaktoer }, // Fjern snart
    { path: "/admin/redigerredaktoer/:id", component: enRedaktoer }, // Fjern snart
    {
        path: "/login", component: Login, beforeEnter: (to, from, next) => {
            if (store.state.login.isAuthenticated) { next("/admin") } else { next() }
        }
    },
    // {
    //     path: "/admin", component: Admin, beforeEnter: (to, from, next) => {
    //         if (store.state.login.isAuthenticated) { next() } else { next("/") }
    //     }
    // },
    {
        path: "/admin/register", component: Register, beforeEnter: (to, from, next) => {
            if (store.state.login.bruger.type === "admin") { next() } else { next("/") }
        }
    },
    {
        path: "/admin/opret", component: OpretNy, beforeEnter: (to, from, next) => {
            if (store.state.login.isAuthenticated) { next() } else { next("/") }
        }
    },
    {
        path: "/admin/rediger", component: Rediger, beforeEnter: (to, from, next) => {
            if (store.state.login.isAuthenticated) { next() } else { next("/") }
        }
    },
    {
        path: "/admin/rediger/:id", component: RedigerEn, beforeEnter: (to, from, next) => {
            if (store.state.login.isAuthenticated) { next() } else { next("/") }
        }
    },
    { path: "/:typeId/:id", component: VisEn },
]

export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    }, mode: "history", routes
})