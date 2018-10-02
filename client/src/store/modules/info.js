import axios from "axios";

const state = {
    kontaktInfo: {},
    redaktion: []
}

const mutations = {
    setKontakt(state, kontakt) {
        state.kontaktInfo = kontakt;
    },
    setRedaktion(state, redaktion) {
        state.redaktion = redaktion;
    }
}

const actions = {
    hentKontakt({ commit }) {
        axios.get("/kontakt")
            .then(res => {
                //console.log(res.data)
                commit("setKontakt", res.data[0])
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
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}