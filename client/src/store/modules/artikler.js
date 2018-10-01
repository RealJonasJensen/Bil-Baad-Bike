import axios from "axios";
import store from "../store";

const state = {
    seneste: [],
    loading: false
}

const mutations = {
    setNylige(state, seneste) {
        state.seneste = seneste;
    },
    setLoading(state) {
        state.loading = !state.loading;
    }
}

const actions = {
    hentSeneste({ commit }) {
        commit("setLoading")
        axios.get("/artikler/nylige")
            .then(res => {
                commit("setLoading")
                commit("setNylige", res.data)
            })
            .catch(err => {
                commit("setLoading")
                console.log(err)
            }
            )
    }
}

const getters = {
    seneste: state => {
        return state.seneste;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}