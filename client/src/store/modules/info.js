import axios from "axios";
import router from "../../router";

const state = {
    kontaktInfo: {},
    redaktion: [],
    infoBesked: {}
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
    }
}

const actions = {
    nyNyhedsbrev({ commit }, payload) {
        axios.post("/nyhedsbrev", payload)
            .then(res => {
                console.log(res.data)
                commit("setInfoBesked", { email: "Du er nu tilmeldt nyhedsbrevet" })
            })
            .catch(err => {
                commit("setInfoBesked", err.response.data)
                console.log(err.response.data)
            })
    },
    sletNyhedsbrev({ commit }, payload) {
        //console.log(payload)
        axios.post("/nyhedsbrev/slet", payload)
            .then(res => {
                console.log(res.data)
                commit("setInfoBesked", res.data)
            })
            .catch(err => {
                commit("setInfoBesked", err.response.data)
                console.log(err.response.data)
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
        console.log(payload);
        axios.put("/kontakt", payload)
            .then(res => {
                console.log(res.data)
                commit("setKontakt", res.data[0])
                router.replace("/kontakt")
            })
            .catch(err => {
                console.log(err)
            })
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
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}