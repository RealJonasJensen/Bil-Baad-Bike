<template>
    <div>
        <p class="admin-sti" > Admin / <span>Sponsor</span></p>
        <h1>Sponsor</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
          <router-link tag="div" class="admin-btn" to="/admin/nysponsor">Ny Sponsor</router-link>
          <router-link tag="div" class="admin-btn" to="/admin/redigersponsor">Rediger Tekst</router-link>
          <div class="admin-redaktion" v-for="(item, index) in sponsor" :key="index">
                <div class="admin-img">
                    <img :src="'../../../../src/assets/reklamer/' + item.billede" :alt="item.kategori">
                </div>
                <div>
                    <p><strong>{{item.kategori | kategori}}</strong></p>
                <button @click="onSlet(item._id)" tag="button">Slet Sponsor</button>
                
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    onSlet(id) {
      console.log(id);
      if (confirm("Er du ikker på du vil slette denne sponsor?")) {
        this.$store.dispatch("sletSponsor", id);
      }
    }
  },
  computed: {
    sponsor() {
      return this.$store.getters.getSponsorBilleder;
    }
  },
  created() {
    this.$store.dispatch("hentAlleSponsorBilleder");
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

.admin-btn {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgb(53, 53, 53);
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

img {
  width: 100%;
  height: auto;
}

.admin-img {
  width: 100px;
}

.admin-redaktion {
  display: grid;
  grid-template-columns: 20% 80%;
  padding: 10px 0;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
}
</style>
