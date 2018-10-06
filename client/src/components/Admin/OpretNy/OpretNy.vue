<template>
    <div>
        <p class="opret-sti" >{{bruger.type === "admin" ? "Admin" : "Redaktør"}} <span>/ Opret</span></p>
        <h1>Opret</h1>
        <div class="opret-br"></div>
        <div class="opret-indhold">
            <div class="opret-form" >
                <div class="opret-overskrift">
                    <p>Overskrift</p>
                    <input :class="{invalid: $v.formData.overskrift.$error}" @blur="$v.formData.overskrift.$touch()" type="text" v-model="formData.overskrift" >
                </div>
                <div class="opret-tekst">
                    <p>Tekst</p>
                    <textarea :class="{invalid: $v.formData.tekst.$error}" @blur="$v.formData.tekst.$touch()" v-model="formData.tekst" name="" id="" cols="30" rows="20"></textarea>
                </div>
                <p>Kategori: </p>

                <div class="register-type"> 
                    <select :class="{invalid: $v.formData.kategori.$error}" @blur="$v.formData.kategori.$touch()" v-model="formData.kategori" >
                        <option disabled value=""> -- Vælg Kategori --</option>
                        <option v-if="bruger.redaktion.includes('bil') || bruger.type === 'admin'" value="bil">Bil</option>
                        <option v-if="bruger.redaktion.includes('baad') || bruger.type === 'admin'" value="baad">Båd</option>
                        <option v-if="bruger.redaktion.includes('bike') || bruger.type === 'admin'" value="bike">Bike</option>
                    </select>
                </div>

                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onOpret" >Opret ny artikel!</button>
                <!-- <button @click="onOpret">OPRET NY</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        overskrift: "",
        tekst: "",
        kategori: ""
      }
    };
  },
  computed: {
    bruger() {
      return this.$store.getters.bruger;
    }
  },
  methods: {
    onOpret() {
      const data = {
        ...this.formData,
        forfatter: this.bruger.id,
        forfatterNavn: this.bruger.navn
      };
      this.$store.dispatch("opretNy", data);
      console.log(data);
    }
  },
  validations: {
    formData: {
      overskrift: {
        required
      },
      kategori: {
        required
      },
      tekst: {
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

.opret-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.opret-sti {
  color: rgb(53, 53, 53);
}

.opret-sti span {
  color: rgb(230, 230, 230);
}

.opret-indhold {
  padding-top: 10px;
}

.opret-overskrift {
  width: 100%;
  padding-top: 10px;
}

.opret-tekst {
  padding-top: 10px;
}

.register-type {
  display: flex;
}

.opret-kategori {
  padding: 10px 0;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

.opret-kategori div {
  padding-left: 25%;
}

.opret-kategori input {
  cursor: pointer;
}

textarea,
input,
select {
  width: 100%;
  border: 2px rgb(240, 240, 240) solid;
  outline: none;
  border-radius: 3px;
  padding: 10px;
}

select {
  cursor: pointer;
}

textarea:focus,
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

.opret-form p {
  font-weight: bold;
  font-size: 13px;
  padding-bottom: 3px;
  color: rgb(53, 53, 53);
}
</style>
