<template>
    <div>
        <h1>SENESTE ARTIKLER</h1>
        <div class="forside-br" ></div>
        <div class="forside-indhold">
            <app-artikel-objekt v-for="(item, index) in seneste" :key="index" :objekt="item"  ></app-artikel-objekt>
        </div>
    </div>
</template>

<script>
import ArtikelObjekt from "../Artikel/ArtikelObjekt";
export default {
  components: {
    appArtikelObjekt: ArtikelObjekt
  },
  created() {
    this.$store.dispatch("hentSeneste");
  },
  computed: {
    seneste() {
      return this.$store.getters.seneste;
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

.forside-indhold  {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
