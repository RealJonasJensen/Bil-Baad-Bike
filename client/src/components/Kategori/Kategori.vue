<template>
    <div>
        <div v-if="!artiklerLoading" >
        <p class="kategori-sti" >Forside <span>/ {{overskrift}}</span></p>
        <h1 class="kategori-h1" >{{overskrift.toUpperCase()}}</h1>
        <div class="kategori-br"></div>
        <div class="kategori-indhold">
            <div v-if="kategori.length > 5">
                <paginate name="kategori" :per="3" :list="kategori" class="paginate-list">
                    <app-artikel-objekt v-for="(item,index) in paginated('kategori')" :key="index" :objekt="item" sti="arkiv"></app-artikel-objekt>
                </paginate>
                <paginate-links for="kategori" :limit="3" :show-step-links="true" :step-links="{next: ' ', prev: ' '}"></paginate-links>
            </div>
            <div v-else>
                <app-artikel-objekt v-for="(item, index) in kategori" :key="index" :objekt="item" :sti="sti"></app-artikel-objekt>
            </div>
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
      sti: this.$route.path.split("/")[1],
      paginate: ["kategori"]
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

<style>
.kategori-h1 {
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

.paginate-links {
  display: flex;
  list-style-type: none;
  width: 75%;
  justify-content: left;
}

.number {
  padding: 10px 0;
}

.number a,
.ellipses a {
  color: rgb(53, 53, 53);
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;
  padding: 7px 10px;
  background-color: rgb(230, 230, 230);
}

.active a {
  color: rgb(255, 255, 255);
  background-color: rgb(255, 192, 0);
}
</style>
