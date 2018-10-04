<template>
    <div class="sidebar">
        <div class="sidebar-search">
            <form action="">
                <input v-model="term" type="text" placeholder="Søg i arkivet..."> 
                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" class="sidebar-search-btn" @click.prevent="onSubmit" ><font-awesome-icon class="search-icon" icon="search" /></button>
            </form>
        </div>
        <h2>MEST LÆSTE</h2>
        <div class="sidebar-br"></div>
        <div>
            <ul>
                <router-link tag="li" v-for="(item, index) in mestSete" :key="index" :to="`/${item.kategori}/${item._id}`">{{item.overskrift}}</router-link>
            </ul>
        </div>
        <h2>SPONSOR</h2>
        <div class="sidebar-br">
        </div>
            <app-reklame-billede v-for="(item, index) in sponsorBilleder" :objekt="item" :key="index" ></app-reklame-billede>
            <router-link class="sidebar-link" to="/sponsor" tag="p">Din reklame her?</router-link>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import ReklameBillede from "./ReklameBillede.vue";
export default {
  data() {
    return {
      term: ""
    };
  },
  methods: {
    onSubmit() {
      //console.log(this.$route.path.split("/")[1]);
      if (this.$route.path.split("/")[1] === "soeg") {
        const data = { soeg: this.term };
        this.$router.replace("/soeg/" + data.soeg);
        this.$store.dispatch("hentSoeg", data);
        this.term = "";
      } else {
        this.$router.replace("/soeg/" + this.term);
        this.term = "";
      }
    }
  },
  computed: {
    sponsorBilleder() {
      return this.$store.getters.getSponsorBilleder;
    },
    mestSete() {
      return this.$store.getters.mestSete;
    }
  },
  components: {
    appReklameBillede: ReklameBillede
  },
  validations: {
    term: {
      required
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  background-color: rgb(240, 240, 240);
  font-family: "Oswald", sans-serif;
  padding: 25px;
}

.sidebar-link {
  text-align: center;
  color: rgb(119, 119, 119);
  cursor: pointer;
}

input {
  padding: 8px;
  outline: none;
}

.sidebar-search-btn {
  padding: 10px 20px;
  margin-left: 20px;
  background-color: rgb(230, 230, 230);

  border: none;
  outline: none;
}

.validKnap {
  cursor: pointer;
}

.search-icon {
  font-size: 12px;
}

h2 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 24px;
  padding: 10px 0;
}

.sidebar-br {
  height: 3px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

ul {
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
}

ul li {
  font-size: 11px;
  cursor: pointer;
}
</style>
