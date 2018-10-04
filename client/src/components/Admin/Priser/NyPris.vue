<template>
    <div>
        <p class="admin-sti" >Admin / Priser / <span>Opret</span></p>
        <h1>Opret Pris</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
            <div>
                <p>Visninger</p>
                <input  v-model="formData.visninger" type="number">
            </div>
            <div>
                <p>Pris</p>
                <input v-model="formData.pris" type="number">
            </div>
                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onOpret">Opret Ny</button>
                <!--  -->
        </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        visninger: null,
        pris: null
      }
    };
  },
  methods: {
    onOpret() {
      this.$store.dispatch("nyPris", this.formData);
    }
  },
  validations: {
    formData: {
      visninger: {
        required
      },
      pris: {
        required
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
.admin-indhold {
  padding: 15px 0;
}

/* Input */

input {
  width: 100%;
  border: 2px rgb(240, 240, 240) solid;
  outline: none;
  border-radius: 3px;
  padding: 10px;
}

input:focus {
  border: rgba(255, 192, 0, 0.5) solid 2px;
}

button {
  font-family: "Oswald", sans-serif;
  background-color: rgb(230, 230, 230);
  color: rgb(206, 206, 206);
  text-align: center;
  padding: 8px 25px;
  margin: 10px 0 50px;
  border: none;
  outline: none;
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
