import axios from "axios";
import store from "../store";
import router from "../../router.js";

const state = {
    seneste: [],
    kategori: [],
    alle: [],
    artiklerLoading: false,
    artikel: {},
    mestSete: [],
    soeg: [],
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
    },
    setEn(state, artikel) {
        state.artikel = artikel;
    },
    setMestSete(state, artikler) {
        state.mestSete = artikler;
    },
    setSoeg(state, artikler) {
        state.soeg = artikler;
    },
    setKommentar(state, artikel) {
        state.artikel = {
            ...artikel,
            kommentarer: [
                ...artikel.kommentarer
            ]
        }
    }
}

const actions = {
    hentSoeg({ commit }, payload) {
        commit("setArtiklerLoading")
        axios.post("/artikler/soeg", payload)
            .then(res => {
                commit("setArtiklerLoading")
                commit("setSoeg", res.data)
                console.log(res.data)
            })
            .catch(err => {
                commit("setArtiklerLoading")
                console.log(err)
            })
    },
    mestSete({ commit }) {
        axios.get("/artikler/klik")
            .then(res => {
                commit("setMestSete", res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    mestSeteKategori({ commit }, payload) {
        axios.get("/artikler/klik/" + payload)
            .then(res => {
                commit("setMestSete", res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    opretNy({ commit }, payload) {
        commit("setArtiklerLoading")
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.post("/artikler", payload)
            .then(res => {
                commit("setArtiklerLoading")
                router.replace("/")
                console.log(res.data)
            })
            .catch(err => {
                commit("setArtiklerLoading")
                console.log(err)
            })
    },
    sletEn({ commit }, payload) {
        console.log(payload)
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.delete("/artikler/" + payload)
            .then(res => {
                router.replace("/admin");
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },
    redigerEn({ commit }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.put("/artikler/" + payload.id, payload)
            .then(res => {
                router.replace("/admin/rediger")
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    nyKommentar({ commit }, payload) {
        //console.log(payload)
        axios.post("/artikler/" + payload.data.id + "/kommentar", payload.data)
            .then(res => {
                console.log(res.data);
                commit("setKommentar", res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    opdaterKlik({ commit }) {
        const id = this.state.artikler.artikel._id;
        const data = {
            klik: this.state.artikler.artikel.klik + 1,
        }
        axios.put("/artikler/klik/" + id, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    },
    hentEn({ commit, dispatch }, payload) {
        commit("setArtiklerLoading")
        axios.get("/artikler/" + payload)
            .then(res => {
                commit("setArtiklerLoading")
                commit("setEn", res.data)
                dispatch("opdaterKlik")
            })
            .catch(err => {
                commit("setArtiklerLoading")
                console.log(err)
            })
    },
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
    },
    artikel: state => {
        return state.artikel;
    },
    artiklerLoading: state => {
        return state.artiklerLoading;
    },
    mestSete: state => {
        return state.mestSete;
    },
    soeg: state => {
        return state.soeg;
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}