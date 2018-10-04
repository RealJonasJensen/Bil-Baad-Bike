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
        console.log(payload)
        axios.post("/sponsor/priser", payload)
            .then(res => {
                console.log(res.data)
                router.replace("/admin/priser")
            })
            .catch(err => console.log(err))
    },
    redigerPris({ dispatch }, payload) {
        axios.put("/sponsor/priser/" + payload.id, payload)
            .then(res => {
                console.log(res.data)
                router.replace("/admin/priser")
            })
            .catch(err => console.log(err))
    },
    sletPris({ dispatch }, payload) {
        axios.delete("/sponsor/priser/" + payload)
            .then(res => {
                console.log(res.data)
                dispatch("hentSponsor")
                router.replace("/admin/priser");
            })
            .catch(err => console.log(err))
    },
    hentEnPris({ commit }, payload) {
        console.log(payload)
        axios.get("/sponsor/priser/" + payload)
            .then(res => {
                console.log(res.data)
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
                console.log(res.data)
                commit("setSponsor", res.data[0])
            })
            .catch(err => {
                commit("setSponsorLoading");
                console.log(err)
            })
    },
    hentSponsorBilleder({ commit }, payload) {
        commit("setSponsorLoading");
        axios.get("/sponsor/kategori/" + payload)
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
        const billeder = [];
        for (let index = 0; index < 5; index++) {
            billeder.push(state.sponsorBilleder[index])
        }
        return billeder;
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