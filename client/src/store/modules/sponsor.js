import axios from "axios";
import store from "../store";
import router from "../../router";

const state = {
    sponsorBilleder: [],
    sponsor: {},
    enPris: {},
    sponsorLoading: false,
    sponsorError: {}
}

const mutations = {
    setSponsorLoading(state) {
        state.sponsorLoading = !state.sponsorLoading;
    },
    setSponsorBilleder(state, sponsor) {
        state.sponsorBilleder = sponsor;
    },
    setSponsor(state, sponsor) {
        state.sponsor = sponsor;
    },
    setEnPris(state, pris) {
        state.enPris = pris;
    }
}

const actions = {
    nyPris({ commit }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        //console.log(payload)
        axios.post("/sponsor/priser", payload)
            .then(res => {
                // console.log(res.data)
                router.replace("/admin/priser")
            })
            .catch(err => console.log(err))
    },
    redigerPris({ dispatch }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.put("/sponsor/priser/" + payload.id, payload)
            .then(res => {
                // console.log(res.data)
                router.replace("/admin/priser")
            })
            .catch(err => console.log(err))
    },
    sletPris({ dispatch }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.delete("/sponsor/priser/" + payload)
            .then(res => {
                // console.log(res.data)
                dispatch("hentSponsor")
                router.replace("/admin/priser");
            })
            .catch(err => console.log(err))
    },
    hentEnPris({ commit }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        // console.log(payload)
        axios.get("/sponsor/priser/" + payload)
            .then(res => {
                // console.log(res.data)
                commit("setEnPris", res.data[0]);
            })
            .catch(err => {
                console.log(err)
            })
    },
    hentSponsor({ commit }) {
        commit("setSponsorLoading");
        axios.get("/sponsor")
            .then(res => {
                commit("setSponsorLoading");
                // console.log(res.data)
                commit("setSponsor", res.data[0])
            })
            .catch(err => {
                commit("setSponsorLoading");
                console.log(err)
            })
    },
    hentAlleSponsorBilleder({ commit }) {
        commit("setSponsorLoading");
        axios.get("/reklamer")
            .then(res => {
                // console.log(res.data)
                commit("setSponsorBilleder", res.data)
            })
            .catch(err => {
                commit("setSponsorLoading");
                console.log(err)
            })
    },
    opdaterSponsorTekst({ }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.put("/sponsor", payload)
            .then(res => {
                // console.log(res.data)
                alert("Sponsor Tekst Rettet!")
                router.replace("/admin/sponsor")
            })
            .catch(err => {
                console.log(err)
            })
    },
    nySponsor({ }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.post("/reklamer", payload)
            .then(res => {
                // console.log(res.data)
                alert("Sponsor Oprettet!")
                router.replace("/admin/sponsor")
            })
            .catch(err => {
                console.log(err)
            })
    },
    sletSponsor({ dispatch }, payload) {
        store.getters.idToken ? axios.defaults.headers.common["Authorization"] = store.getters.idToken : null;
        axios.delete("/reklamer/" + payload)
            .then(res => {
                // console.log(res.data)
                dispatch("hentAlleSponsorBilleder")
            })
            .catch(err => {
                console.log(err)
            })
    },
    hent5SponsorBilleder({ commit }) {
        commit("setSponsorLoading");
        axios.get("/reklamer/5")
            .then(res => {
                //console.log(res.data)
                commit("setSponsorLoading");
                commit("setSponsorBilleder", res.data)
            })
            .catch(err => {
                commit("setSponsorLoading");
                console.log(err)
            })
    },
    hentSponsorBilleder({ commit }, payload) {
        commit("setSponsorLoading");
        axios.get("/reklamer/" + payload)
            .then(res => {
                commit("setSponsorLoading");
                commit("setSponsorBilleder", res.data)
            })
            .catch(err => {
                commit("setSponsorLoading");
                console.log(err)
            })

    }
}

const getters = {
    getSponsorBilleder: state => {
        return state.sponsorBilleder;
    },
    getSponsor: state => {
        return state.sponsor;
    },
    getEnPris: state => {
        return state.enPris;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}