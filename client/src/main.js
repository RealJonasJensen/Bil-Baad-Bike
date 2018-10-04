import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate";
import VuePaginate from 'vue-paginate'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faClock, faComments, faEye, faTag, faMapMarkerAlt, faPhone, faFax, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faSearch, faClock, faComments, faEye, faTag, faMapMarkerAlt, faPhone, faFax, faEnvelope, faComment)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Pagination
Vue.use(VuePaginate)

// Filters
Vue.filter('striphtml', function (value) {
  var div = document.createElement("div");
  div.innerHTML = value;
  var text = div.textContent || div.innerText || "";
  return text;
});

Vue.filter("text", (tekst, path) => {
  if (tekst.length > 500 && path !== "/") {
    return tekst.substring(0, 499) + " ...";
  } else if (
    tekst.length > 200 &&
    path === "/"
  ) {
    return tekst.substring(0, 199) + " ...";
  }
  return tekst;
})

Vue.filter("overskrift", (overskrift) => {
  if (overskrift.length > 28) {
    return overskrift.substring(0, 27) + " ...";
  }
  return overskrift;
})

Vue.filter("dato", (oprettet) => {
  let dato = oprettet;
  let time = dato.split("T")[1].split(":");
  time = `${time[0]}:${time[1]}`;
  let month = dato
    .split("T")[0]
    .split("-")
    .reverse();

  switch (month[1]) {
    case "01":
      month[1] = "JANUAR";
      break;
    case "02":
      month[1] = "FEBRUAR";
      break;
    case "03":
      month[1] = "MARTS";
      break;
    case "04":
      month[1] = "APRIL";
      break;
    case "05":
      month[1] = "MAJ";
      break;
    case "06":
      month[1] = "JUNI";
      break;
    case "07":
      month[1] = "JULI";
      break;
    case "08":
      month[1] = "AUGUST";
      break;
    case "09":
      month[1] = "SEPTEMPER";
      break;
    case "10":
      month[1] = "OKTOBER";
      break;
    case "11":
      month[1] = "NOVEMBER";
      break;
    case "12":
      month[1] = "DECEMBER";
      break;
    default:
  }
  return `${month[0]}. ${month[1]} ${month[2]} KL. ${time}`;
})

Vue.filter("kommentarer", () => {
  
})

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

