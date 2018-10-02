import axios from "axios";

const state = {
    kontaktInfo: {}
}

const mutations = {
    setKontakt(state, kontakt) {
        state.kontaktInfo = kontakt;
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
    }
}

const getters = {
    getKontakt: state => {
        return state.kontaktInfo;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}