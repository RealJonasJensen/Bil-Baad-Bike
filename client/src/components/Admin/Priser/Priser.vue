<template>
    <div>
        <p class="admin-sti" >Admin / <span>Priser</span></p>
        <h1>Rediger Priser</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
         
         <div class="sponsor-info" >
                <router-link tag="div" class="admin-btn" to="/admin/priser/opret">Ny Pris</router-link>
                <div class="sponsor-info-overskrift" >
                    <h3><font-awesome-icon class="artikel-icon" icon="eye" />Visninger</h3>
                    <h3>Pris per visning</h3>
                </div>
                <div v-for="(item, index) in sponsor.priser" :key="index" class="sponsor-info-item" >
                    <div class="sponsor-knapper">
                        <router-link tag="button" :to="'/admin/priser/' + item._id">Rediger</router-link>
                        <button @click="onSlet(item._id)">Slet</button>
                    </div>
                    <div class="sponsor-visninger">
                        <p>
                            {{item.visninger}}
                        </p>
                    </div>
                    <div class="sponsor-pris">
                        <p>
                            {{item.pris}} kr.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    onSlet(id) {
      //console.log(id);
      if (confirm("Er du sikker på du vil slette denne pris?")) {
        this.$store.dispatch("sletPris", id);
      }
    }
  },
  computed: {
    sponsor() {
      return this.$store.getters.getSponsor;
    }
  },
  created() {
    this.$store.dispatch("hentSponsor");
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.admin-sti {
  color: rgb(53, 53, 53);
}

.admin-sti span {
  color: rgb(230, 230, 230);
}

.admin-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

/* Priser */

.admin-btn {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgb(53, 53, 53);
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

.artikel-icon {
  margin-right: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
  margin: 5px;
}

.sponsor-info-overskrift {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 3%;
  font-size: 13px;
  font-weight: bold;
  padding: 10px 0;
}

.sponsor-info-item {
  display: grid;
  grid-template-columns: 25% 25% 50%;
  text-align: right;
  border-top: 2px rgb(230, 230, 230) solid;
}

.sponsor-info p {
  padding: 7px 0;
  font-size: 14px;
}
</style>
