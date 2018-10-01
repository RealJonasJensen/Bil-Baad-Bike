import Vue from "vue";
import Vuex from "vuex";

import artikler from "./modules/artikler";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        artikler
    }
})