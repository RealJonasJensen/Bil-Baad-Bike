import axios from "axios";
import router from "../../router";
import store from "../store";

const state = {
    kontaktInfo: {},
    redaktion: [],
    enRedaktoer: {},
    infoBesked: {},
    kategorier: {}
}

const mutations = {
    setKontakt(state, kontakt) {
        state.kontaktInfo = kontakt;
    },
    setRedaktion(state, redaktion) {
        state.redaktion = redaktion;
    },
    setInfoBesked(state, besked) {
        state.infoBesked = besked;
    },
    setEnRedaktoer(state, enRedaktoer) {
        state.enRedaktoer = enRedaktoer;
    },
    setKategorier(state, kategorier) {
        state.kategorier = kategorier;
    },
    clearInfoBesked(state) {
        state.infoBesked = {};
    }
}

const actions = {
    opdaterKategorier({ }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.put("/kategorier", payload)
            .then(res => {
                router.replace("/admin")
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    hentKategorier({ commit }) {
        axios.get("/kategorier")
            .then(res => {
                // console.log(res.data)
                commit("setKategorier", res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    nyNyhedsbrev({ commit }, payload) {
        axios.post("/nyhedsbrev", payload)
            .then(res => {
                // console.log(res.data)
                commit("setInfoBesked", { email: "Du er nu tilmeldt nyhedsbrevet" })
                setTimeout(() => {
                    commit("clearInfoBesked")
                }, 3000)
            })
            .catch(err => {
                commit("setInfoBesked", err.response.data)
                setTimeout(() => {
                    commit("clearInfoBesked")
                }, 3000)
                // console.log(err.response.data)
            })
    },
    sletNyhedsbrev({ commit }, payload) {
        //console.log(payload)
        axios.post("/nyhedsbrev/slet", payload)
            .then(res => {
                // console.log(res.data)
                commit("setInfoBesked", res.data)
                setTimeout(() => {
                    commit("clearInfoBesked")
                }, 3000)
            })
            .catch(err => {
                commit("setInfoBesked", err.response.data)
                setTimeout(() => {
                    commit("clearInfoBesked")
                }, 3000)
                // console.log(err.response.data)
            })
    },
    hentKontakt({ commit }) {
        axios.get("/kontakt")
            .then(res => {
                //console.log(res.data)
                commit("setKontakt", res.data[0])
            })
            .catch(err => console.log(err))
    },
    opdaterKontakt({ commit }, payload) {
        //console.log(payload);
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.put("/kontakt", payload)
            .then(res => {
                // console.log(res.data)
                commit("setKontakt", res.data[0])
                router.replace("/kontakt")
            })
            .catch(err => {
                console.log(err)
            })
    },
    opdaterRedaktoerBillede({ }, payload) {
        // console.log(payload)
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.put("/brugere/redaktion/billede/" + payload.id, payload.data)
            .then(res => {
                console.log(res.data)
                router.replace("/admin/redigerredaktoer")
            })
            .catch(err => console.log(err))
    },
    opdaterRedaktoer({ }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.put("/brugere/redaktion/" + payload.id, payload)
            .then(res => {
                // console.log(res.data);
                router.replace("/admin/redigerredaktoer")
            })
            .catch(err => console.log(err))
    },
    sletRedaktoer({ dispatch }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.delete("/brugere/" + payload)
            .then(res => {
                // console.log(res.data)
                dispatch("hentRedaktion")
            })
            .catch(err => console.log(err))
    },
    hentEnRedaktoer({ commit }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.get("/brugere/redaktion/" + payload)
            .then(res => {
                commit("setEnRedaktoer", res.data)
            })
            .catch(err => console.log(err))
    },
    hentRedaktion({ commit }) {
        axios.get("/brugere/redaktionen")
            .then(res => {
                commit("setRedaktion", res.data)
            })
            .catch(err => console.log(err))
    }
}

const getters = {
    getKontakt: state => {
        return state.kontaktInfo;
    },
    getRedaktion: state => {
        return state.redaktion;
    },
    getInfoBesked: state => {
        return state.infoBesked;
    },
    getRedaktoer: state => {
        return state.enRedaktoer;
    },
    getKategorier: state => {
        return state.kategorier;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}