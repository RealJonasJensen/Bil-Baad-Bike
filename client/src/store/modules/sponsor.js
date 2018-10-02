import axios from "axios";
import store from "../store";

const state = {
    sponsorBilleder: [],
    sponsor: {},
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
    }
}

const actions = {
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
        return state.sponsorBilleder;
    },
    getSponsor: state => {
        return state.sponsor;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}