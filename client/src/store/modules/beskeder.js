import axios from "axios";
import store from "../store";
import router from "../../router";

const state = {
    beskeder: []
}

const mutations = {
    setBeskeder(state, beskeder) {
        state.beskeder = beskeder;
    }
}

const actions = {
    sletBesked({ dispatch }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.delete("/beskeder/" + payload)
            .then(res => {
                // console.log(res.data)
                dispatch("hentBeskeder")
            })
            .catch(err => {
                console.log(err)
            })
    },
    hentBeskeder({ commit }) {
        axios.get("/beskeder")
            .then(res => {
                commit("setBeskeder", res.data)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    nyBesked({ commit }, payload) {
        axios.post("/beskeder", payload)
            .then(res => {
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const getters = {
    getBeskeder: state => {
        return state.beskeder;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}