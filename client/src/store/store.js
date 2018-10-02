import Vue from "vue";
import Vuex from "vuex";

import artikler from "./modules/artikler";
import sponsor from "./modules/sponsor";
import info from "./modules/info";
import login from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        artikler,
        sponsor,
        info,
        login,
    }
})