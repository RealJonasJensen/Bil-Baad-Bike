<template>
    <div>
         <p class="arkiv-sti" >Forside<span> / Arkivet</span></p>
        <h1 class="arkiv-h1" >Arkivet</h1>
        <div class="arkiv-br"></div>
        <div class="arkiv-indhold" v-if="artiklerLoading">
            <app-spinner></app-spinner>
        </div>
        <div class="arkiv-indhold" v-else>
            <paginate name="alle" :per="5" :list="alle" class="paginate-list">
                <app-artikel-objekt v-for="(item,index) in paginated('alle')" :key="index" :objekt="item" sti="arkiv"></app-artikel-objekt>
            </paginate>
            <paginate-links for="alle" :limit="5" :show-step-links="true" :step-links="{next: ' ', prev: ' '}"></paginate-links>
        </div>
    </div>
    <!-- v-for="(item, index) in alle" -->
</template>


<script>
import ArtikelObjekt from "../Artikel/ArtikelObjekt";
import Spinner from "../UI/Spinner";
export default {
  data() {
    return {
      paginate: ["alle"]
    };
  },
  computed: {
    alle() {
      return this.$store.getters.alle;
    },
    artiklerLoading() {
      return this.$store.getters.artiklerLoading;
    }
  },
  components: {
    appArtikelObjekt: ArtikelObjekt,
    appSpinner: Spinner
  },
  created() {
    this.$store.dispatch("hentAlle");
    this.$store.dispatch("mestSete");
    this.$store.dispatch("hent5SponsorBilleder");
  }
};
</script>

<style>
.arkiv-h1 {
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
