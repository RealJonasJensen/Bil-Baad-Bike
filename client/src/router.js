import VueRouter from "vue-router";
import Vue from "vue";

import Forsiden from "./components/Forside/Forside.vue";
import Kategori from "./components/Kategori/Kategori.vue";
import Arkiv from "./components/Arkiv/Arkiv.vue";

Vue.use(VueRouter);

export const routes = [
    { path: "/", component: Forsiden },
    { path: "/baad", component: Kategori },
    { path: "/bil", component: Kategori },
    { path: "/bike", component: Kategori },
    { path: "/arkiv", component: Arkiv },
]

export default new VueRouter({ mode: "history", routes })