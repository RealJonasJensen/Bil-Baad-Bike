import Vue from "vue";
import Vuex from "vuex";

import artikler from "./modules/artikler";
import sponsor from "./modules/sponsor";
import info from "./modules/info";
import login from "./modules/login";
import beskeder from "./modules/beskeder";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        artikler,
        sponsor,
        info,
        login,
        beskeder
    }
})