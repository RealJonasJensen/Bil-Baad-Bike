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
    { path: "/:typeId/:id", component: VisEn },
    {
        path: "/login", component: Login, beforeEnter: (to, from, next) => {
            if (store.state.login.isAuthenticated) { next("/admin") } else { next() }
        }
    },
    {
        path: "/admin", component: Admin, beforeEnter: (to, from, next) => {
            if (store.state.login.isAuthenticated) { next() } else { next("/") }
        }
    },
    {
        path: "/register", component: Register, beforeEnter: (to, from, next) => {
            if (store.state.login.bruger.type === "admin") { next() } else { next("/") }
        }
    },
    {
        path: "/opret", component: OpretNy, beforeEnter: (to, from, next) => {
            if (store.state.login.isAuthenticated) { next() } else { next("/") }
        }
    }
]

export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    }, mode: "history", routes
})