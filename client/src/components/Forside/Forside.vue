<template>
    <div>
        <h1>SENESTE ARTIKLER</h1>
        <div class="forside-br" ></div>
        <div class="forside-indhold">
            <app-forside-objekt v-for="(item, index) in seneste" :key="index" :objekt="item"  ></app-forside-objekt>
        </div>
    </div>
</template>

<script>
import ForsideObjekt from "./ForsideObjekt";
export default {
  components: {
    appForsideObjekt: ForsideObjekt
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
