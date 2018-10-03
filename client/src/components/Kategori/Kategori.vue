<template>
    <div>
        <div v-if="!artiklerLoading" >
        <p class="kategori-sti" >Forside <span>/ {{overskrift}}</span></p>
        <h1>{{overskrift.toUpperCase()}}</h1>
        <div class="kategori-br"></div>
        <div class="kategori-indhold">
            <app-artikel-objekt v-for="(item, index) in kategori" :key="index" :objekt="item" :sti="sti"></app-artikel-objekt>
        </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
import ArtikelObjekt from "../Artikel/ArtikelObjekt";
export default {
  data() {
    return {
      sti: this.$route.path.split("/")[1]
    };
  },

  computed: {
    overskrift() {
      const sti = this.$route.path.split("/")[1];
      if (sti === "bil") {
        return "Biler";
      } else if (sti === "baad") {
        return "Både";
      } else if (sti === "bike") {
        return "Bike's";
      }
    },
    kategori() {
      return this.$store.getters.kategori;
    },
    artiklerLoading() {
      return this.$store.getters.artiklerLoading;
    }
  },
  watch: {
    $route: {
      handler: function event() {
        const sti = this.$route.path.split("/")[1];
        this.$store.dispatch("hentKategori", sti);
        this.$store.dispatch("hentSponsorBilleder", sti);
        this.$store.dispatch("mestSeteKategori", sti);
      }
    }
  },
  components: {
    appArtikelObjekt: ArtikelObjekt
  },
  created() {
    const sti = this.$route.path.split("/")[1];
    this.$store.dispatch("hentKategori", sti);
    this.$store.dispatch("hentSponsorBilleder", sti);
    this.$store.dispatch("mestSeteKategori", sti);
  }
};
</script>

<style scoped >
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.kategori-sti {
  color: rgb(53, 53, 53);
}

.kategori-sti span {
  color: rgb(230, 230, 230);
}

.kategori-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.kategori-indhold  {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
