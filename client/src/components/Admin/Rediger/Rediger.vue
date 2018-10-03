<template>
    <div>
    <p class="rediger-sti" >Admin / <span>Rediger </span> </p>
        <h1>Rediger</h1>
        <div class="rediger-br"></div>
        <div class="rediger-indhold">
        <div v-for="(item, index) in alle" :key="index" >
            <div class="rediger">
                <p class="rediger-overskrift">{{item.overskrift}} - {{item.kategori.toUpperCase()}}</p>
                <div class="rediger-knapper">
                    
                    <router-link :to="'/rediger/' + item._id" tag="button" class="knap-rediger">Rediger</router-link>
                    <button class="knap-slet">Slet</button>    
                </div>
            </div>
            <div class="rediger-tekst-br"></div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    alle() {
      return this.$store.getters.alle;
    }
  },
  created() {
    this.$store.dispatch("hentAlle");
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.rediger-sti {
  color: rgb(53, 53, 53);
}

.rediger-sti span {
  color: rgb(230, 230, 230);
}

.rediger-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
  margin-bottom: 8px;
}

.rediger {
  display: grid;
  grid-template-columns: 80% 20%;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 3px;
}

.rediger-tekst-br {
  width: 100%;
  height: 1px;
  background-color: rgb(230, 230, 230);
  margin: 5px 0;
}
</style>
