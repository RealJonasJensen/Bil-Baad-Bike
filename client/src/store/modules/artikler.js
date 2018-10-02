import axios from "axios";
import store from "../store";

const state = {
    seneste: [],
    kategori: [],
    alle: [],
    artiklerLoading: false,
    artiklerError: {}
}

const mutations = {
    setNylige(state, seneste) {
        state.seneste = seneste;
    },
    setArtiklerLoading(state) {
        state.artiklerLoading = !state.artiklerLoading;
    },
    setKategori(state, kategori) {
        state.kategori = kategori;
    },
    setAlle(state, alle) {
        state.alle = alle;
    },
    setError(state, error) {
        state.error = error;
    }
}

const actions = {
    hentAlle({ commit }) {
        commit("setArtiklerLoading")
        axios.get("/artikler")
            .then(res => {
                commit("setArtiklerLoading")
                commit("setAlle", res.data)
            })
            .catch(err => {
                commit("setArtiklerLoading")
                console.log(err)
            })
    },
    hentKategori({ commit }, payload) {
        commit("setArtiklerLoading")
        console.log(payload)
        axios.get("/artikler/kategori/" + payload)
            .then(res => {
                commit("setArtiklerLoading")
                commit("setKategori", res.data)
            })
            .catch(err => {
                commit("setArtiklerLoading")
                //commit("setError", err.response.data)
            })
    },
    hentSeneste({ commit }) {
        commit("setArtiklerLoading")
        axios.get("/artikler/nylige")
            .then(res => {
                commit("setArtiklerLoading")
                commit("setNylige", res.data)
            })
            .catch(err => {
                commit("setArtiklerLoading")
                //commit("setError", err.response.data)
                console.log(err)
            }
            )
    }
}

const getters = {
    seneste: state => {
        return state.seneste;
    },
    kategori: state => {
        return state.kategori;
    },
    alle: state => {
        return state.alle;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}