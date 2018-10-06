<template>
    <div>
        <p class="admin-sti" >Admin / <span>Menu</span></p>
        <h1>Rediger Menu</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
            <div >
                <p>Tryk i den rækkefølge de skal vises i menuen: <span v-for="(item, index) in this.formData.kategorier" :key="index" >{{item | menu}} - </span>  </p>
                <ul>
                    
                </ul>
                <div class="register-redaktion">
                    <input type="checkbox" id="bil" value="bil" v-model="formData.kategorier">
                    <input type="checkbox" id="baad" value="baad" v-model="formData.kategorier">
                    <input type="checkbox" id="bike" value="bike" v-model="formData.kategorier">
                    <label for="bil">Biler</label>
                    <label for="baad">Både</label>
                    <label for="bike">Bike's</label>
                </div>
            </div>
            <button class="validKnap" @click="onOpdater" >Opdater Menu!</button>

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        kategorier: []
      }
    };
  },
  methods: {
    onOpdater() {
      if (this.formData.kategorier.length !== 3) {
        alert("Du mangler at udfylde noget!");
      } else {
        // console.log(this.formData.kategorier);
        this.$store.dispatch("opdaterKategorier", this.formData);
      }
    }
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

input {
  cursor: pointer;
}
.register-redaktion {
  padding: 10px 0;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

ul {
  display: flex;
  justify-content: left;
  list-style-type: none;
}

li {
  padding: 10px 20px;
}

.validKnap {
  font-family: "Oswald", sans-serif;
  background-color: rgb(230, 230, 230);
  color: rgb(119, 119, 119);
  text-align: center;
  padding: 8px 25px;
  margin: 10px 0 50px;
  cursor: pointer;
  border: none;
  outline: none;
}

.validKnap:hover {
  background-color: rgb(128, 28, 28);
  color: rgb(240, 240, 240);
}
.invalid {
  border: solid 2px rgb(255, 83, 83);
  transition: all 0.5s;
}
</style>
