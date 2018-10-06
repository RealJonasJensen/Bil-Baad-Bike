<template>
    <div>
        <div>
        <p class="soeg-sti" ><span>Søg</span></p>
        <h1 class="soeg-h1" >Søg</h1>
        <div class="soeg-br"></div>
        <div class="soeg-indhold">
            <div v-if="loading" >
                <app-spinner></app-spinner>
            </div>
            <div v-else-if="!loading">
                <p class="soeg-tekst" > Din søgning på <span>{{this.$route.path.split("/")[2]}}</span> returnerede <span>{{soeg.length}}</span> artikler </p>

                <div v-if="soeg.length > 5">
                    <paginate name="soeg" :per="5" :list="soeg" class="paginate-list">
                        <app-artikel-objekt v-for="(item,index) in paginated('soeg')" :key="index" :objekt="item" sti="soeg"></app-artikel-objekt>
                    </paginate>
                <paginate-links for="soeg" :limit="5" :show-step-links="true" :step-links="{next: ' ', prev: ' '}"></paginate-links>
                </div>
                <div v-else>
                    <app-artikel-objekt v-for="(item, index) in soeg" :objekt="item" :sti="'soeg'" :key="index"></app-artikel-objekt>
                </div>

            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Spinner from "../UI/Spinner";
import ArtikelObjekt from "../Artikel/ArtikelObjekt";
export default {
  data() {
    return {
      paginate: ["soeg"]
    };
  },
  components: {
    appArtikelObjekt: ArtikelObjekt,
    appSpinner: Spinner
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

<style >
.soeg-h1 {
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
