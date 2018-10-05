import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate";
import VuePaginate from 'vue-paginate'

// Services

// Filters
import "./filters.js";

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faClock, faComments, faEye, faTag, faMapMarkerAlt, faPhone, faFax, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faSearch, faClock, faComments, faEye, faTag, faMapMarkerAlt, faPhone, faFax, faEnvelope, faComment)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Pagination
Vue.use(VuePaginate)

// Vuelidate
Vue.use(Vuelidate)

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

