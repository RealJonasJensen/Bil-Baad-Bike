<template>
    <div>
        <p class="rediger-sti" >{{bruger.type === "admin" ? "Admin" : "Redaktør"}} / <span>Rediger </span> </p>
        <h1>{{artikel.overskrift}}</h1>
        <div class="rediger-br"></div>
        <div class="rediger-indhold">
            <div class="rediger-form" >
                <div class="rediger-overskrift">
                    <p>Overskrift</p>
                    <input :class="{invalid: $v.formData.overskrift.$error}" @blur="$v.formData.overskrift.$touch()" type="text" v-model="formData.overskrift" >
                </div>
                <div class="rediger-tekst">
                    <p>Tekst</p>
                    <textarea :class="{invalid: $v.formData.tekst.$error}" @blur="$v.formData.tekst.$touch()" v-model="formData.tekst" cols="30" rows="20"></textarea>
                </div>
                <p>Kategori: </p>

                <div class="rediger-type"> 
                    <select :class="{invalid: $v.formData.kategori.$error}" @blur="$v.formData.kategori.$touch()" v-model="formData.kategori" >
                        <option disabled value=""> -- Vælg Kategori --</option>
                        <option v-if="bruger.redaktion.includes('bil') || bruger.type === 'admin'" value="bil">Bil</option>
                        <option v-if="bruger.redaktion.includes('baad') || bruger.type === 'admin'" value="baad">Båd</option>
                        <option v-if="bruger.redaktion.includes('bike') || bruger.type === 'admin'" value="bike">Bike</option>
                    </select>
                </div>

                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onRediger" >Rediger</button>
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
  methods: {
    onRediger() {
      const data = {
        ...this.formData,
        id: this.$route.path.split("/")[3]
      };
      console.log(data);
      this.$store.dispatch("redigerEn", data);
    }
  },
  computed: {
    artikel() {
      return this.$store.getters.artikel;
    },
    bruger() {
      return this.$store.getters.bruger;
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
  },
  beforeUpdate() {
    if (
      !this.formData.overskrift &&
      !this.formData.kategori &&
      !this.formData.tekst
    ) {
      this.formData.overskrift = this.artikel.overskrift;
      this.formData.kategori = this.artikel.kategori;
      this.formData.tekst = this.artikel.tekst;
    }
  },
  created() {
    // console.log();
    this.$store.dispatch("hentEn", this.$route.path.split("/")[3]);
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

.rediger-form p {
  font-weight: bold;
  font-size: 13px;
  padding-bottom: 3px;
  color: rgb(53, 53, 53);
}
</style>
