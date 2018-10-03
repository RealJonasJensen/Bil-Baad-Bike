<template>
    <div>
        <div>
        <p class="soeg-sti" ><span>Søg</span></p>
        <h1>Søg</h1>
        <div class="soeg-br"></div>
        <div class="soeg-indhold">
            <div v-if="loading" >Loading..</div>
            <div v-else-if="!loading">
                <p class="soeg-tekst" > Din søgning på <span>{{this.$route.path.split("/")[2]}}</span> returnerede <span>{{soeg.length}}</span> artikler </p>
                <app-artikel-objekt v-for="(item, index) in soeg" :objekt="item" :sti="'soeg'" :key="index"></app-artikel-objekt>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import ArtikelObjekt from "../Artikel/ArtikelObjekt";
export default {
  components: {
    appArtikelObjekt: ArtikelObjekt
  },
  computed: {
    soeg() {
      return this.$store.getters.soeg;
    },
    loading() {
      return this.$store.getters.artiklerLoading;
    }
  },
  created() {
    const data = {
      soeg: this.$route.path.split("/")[2]
    };
    this.$store.dispatch("hentSoeg", data);
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.soeg-tekst {
  text-align: center;
  padding: 10px 0;
}

.soeg-tekst span {
  font-weight: bold;
  font-size: 25px;
  color: rgb(53, 53, 53);
}

.soeg-sti {
  color: rgb(53, 53, 53);
}

.soeg-sti span {
  color: rgb(230, 230, 230);
}

.soeg-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.soeg-indhold {
  width: 100%;
}
</style>
