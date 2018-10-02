<template>
    <div class="sidebar">
        <div class="sidebar-search">
            <input type="text" placeholder="Søg i arkivet..."> 
            <div class="sidebar-search-btn" ><font-awesome-icon class="search-icon" icon="search" /></div>
        </div>
        <h2>MEST LÆSTE</h2>
        <div class="sidebar-br"></div>
        <div></div>
        <h2>SPONSOR</h2>
        <div class="sidebar-br">
        </div>
            <app-reklame-billede v-for="(item, index) in sponsorBilleder" :objekt="item" :key="index" ></app-reklame-billede>
            <router-link class="sidebar-link" to="/kontakt" tag="p">Din reklame her?</router-link>
    </div>
</template>

<script>
import ReklameBillede from "./ReklameBillede.vue";
export default {
  computed: {
    sponsorBilleder() {
      return this.$store.getters.sponsorBilleder;
    }
  },
  components: {
    appReklameBillede: ReklameBillede
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

.sidebar-search {
  display: grid;
  grid-template-columns: 60% 30%;
  grid-gap: 10%;
}

input {
  padding: 3%;
  outline: none;
}

.sidebar-search-btn {
  padding: 10px 5%;
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}

.search-icon {
  font-size: 12px;
  margin-left: 25px;
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
</style>
