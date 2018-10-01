import VueRouter from "vue-router";
import Vue from "vue";

import Forsiden from "./components/Forside/Forside.vue";

Vue.use(VueRouter);

export const routes = [
    { path: "/", component: Forsiden }
]

export default new VueRouter({ mode: "history", routes })