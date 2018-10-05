<template>
    <div>
        <p class="admin-sti" >Admin / <span>Rediger Redaktion</span></p>
        <h1>Rediger Redaktion</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
            <div class="admin-redaktion" v-for="(item, index) in redaktion" :key="index">
                <div class="admin-img">
                    <img :src="'../../../../src/assets/redaktion/' + item.billede" :alt="item.navn">
                </div>
                <div>
                    <p><strong>{{item.navn}}</strong></p>
                    <p>
                        {{item.type === "redaktoer" ? "Redaktør" : "Admin"}}
                    </p>
                
                <router-link :to="'/admin/redigerredaktoer/' + item._id" tag="button">Rediger Profil</router-link>
                <router-link to="/" tag="button">Rediger Billede</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    redaktion() {
      return this.$store.getters.getRedaktion;
    }
  },
  created() {
    this.$store.dispatch("hentRedaktion");
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
