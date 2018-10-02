import Vue from "vue";
import Vuex from "vuex";

import artikler from "./modules/artikler";
import sponsor from "./modules/sponsor";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        artikler,
        sponsor
    }
})