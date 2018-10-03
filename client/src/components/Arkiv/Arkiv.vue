<template>
    <div>
         <p class="arkiv-sti" >Forside<span> / Arkivet</span></p>
        <h1>Arkivet</h1>
        <div class="arkiv-br"></div>
        <div class="arkiv-indhold">
            <app-artikel-objekt v-for="(item, index) in alle" :key="index" :objekt="item" sti="arkiv"></app-artikel-objekt>
        </div>
    </div>
</template>

<script>
import ArtikelObjekt from "../Artikel/ArtikelObjekt";
export default {
  computed: {
    alle() {
      return this.$store.getters.alle;
    }
  },
  components: {
    appArtikelObjekt: ArtikelObjekt
  },
  created() {
    this.$store.dispatch("hentAlle");
    this.$store.dispatch("mestSete");
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.arkiv-sti {
  color: rgb(53, 53, 53);
}

.arkiv-sti span {
  color: rgb(230, 230, 230);
}

.arkiv-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.arkiv-indhold  {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
