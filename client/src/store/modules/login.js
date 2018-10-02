import axios from "axios";
import router from "../../router";
import store from "../store";

const state = {
    idToken: null,
    isAuthenticated: false,
    bruger: {
        type: false,
        redaktion: [],
        navn: null,
    },
    loginErrors: {}
}

const mutations = {
    setBruger(state, data) {
        state.idToken = data.token;
        state.isAuthenticated = true;
        state.bruger.type = data.type;
        state.bruger.navn = data.navn;
        state.bruger.redaktion = data.redaktion;
    },
    fjernBruger(state) {
        state.idToken = null;
        state.isAuthenticated = false;
        state.bruger = {};
    },
    loginFejl(state, err) {
        state.loginErrors = err;
    }
}

const actions = {
    login({ commit }, payload) {
        axios.post("/brugere/login", payload)
            .then(res => {
                //console.log(res.data)
                commit("setBruger", res.data)
                router.replace("/admin");
            })
            .catch(err => commit("loginFejl", err.response.data))
    },
    register({ state }, payload) {
        //console.log(payload)
        state.idToken ? axios.defaults.headers.common["Authorization"] = state.idToken : null;
        axios.post("/brugere/register", payload)
            .then(res => {
                console.log(res.data);
                router.replace("/admin")
            })
            .catch(err => console.log(err))
    },
    logout({ commit }) {
        commit("fjernBruger");
        router.replace("/");
    }
}

const getters = {
    loginErrors: state => {
        return state.loginErrors;
    },
    isAuthenticated: state => {
        return state.isAuthenticated;
    },
    idToken: state => {
        return state.idToken;
    },
    bruger: state => {
        return state.bruger;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}