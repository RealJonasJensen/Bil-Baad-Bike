<template>
    <div>
        <h1>SENESTE ARTIKLER</h1>
        <div class="forside-br" ></div>
        <div class="forside-indhold">
            <div v-if="artiklerLoading">
                <app-spinner></app-spinner>
            </div>  
            <div v-else>
                <app-artikel-objekt v-for="(item, index) in seneste" :key="index" :objekt="item"></app-artikel-objekt>
            </div>

        </div>
    </div>
</template>

<script>
import Spinner from "../UI/Spinner";
import ArtikelObjekt from "../Artikel/ArtikelObjekt";
export default {
  components: {
    appArtikelObjekt: ArtikelObjekt,
    appSpinner: Spinner
  },
  created() {
    this.$store.dispatch("hentSeneste");
    this.$store.dispatch("mestSete");
  },
  computed: {
    seneste() {
      return this.$store.getters.seneste;
    },
    artiklerLoading() {
      return this.$store.getters.artiklerLoading;
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.forside-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

/* .forside-indhold  {
  display: grid;
  grid-template-columns: 50% 50%;
} */
</style>
