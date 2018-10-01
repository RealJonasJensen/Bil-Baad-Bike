import Vue from 'vue'
import App from './App.vue'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faClock, faComments, faEye, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faSearch, faClock, faComments, faEye, faTag)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Axios
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000/api"

// Router
import router from "./router";

// Store
import store from "./store/store";

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

