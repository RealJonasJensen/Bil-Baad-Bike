import axios from "axios";
import store from "../store";

const state = {
    sponsorBilleder: [],
    sponsorLoading: false,
    sponsorError: {}
}

const mutations = {
    setSponsorLoading(state) {
        state.sponsorLoading = !state.sponsorLoading;
    },
    setSponsorBilleder(state, sponsor) {
        state.sponsorBilleder = sponsor;
    }
}

const actions = {
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
    sponsorBilleder: state => {
        return state.sponsorBilleder
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}