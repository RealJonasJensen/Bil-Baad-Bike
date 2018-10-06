<template>
    <div>
        <p class="register-sti" >Admin / Rediger / <span>Sponsor</span></p>
        <h1>Rediger Sponsor</h1>
        <div class="register-br"></div>
        <div class="register-indhold">

            <div>
                <p>Tekst</p>
                <textarea :class="{invalid: $v.formData.tekst.$error}" @blur="$v.formData.tekst.$touch()" rows="8" type="text" v-model="formData.tekst"></textarea>
            </div>
            <button :class="{validKnap: !$v.$invalid}" @click="onRediger" :disabled="$v.$invalid">Rediger Tekst!</button>
        </div>
    </div>
</template>

<script>
import { required, email, requiredUnless } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        tekst: ""
      }
    };
  },
  methods: {
    onRediger() {
      //console.log(this.formData.tekst);
      this.$store.dispatch("opdaterSponsorTekst", this.formData);
    }
  },
  computed: {
    sponsor() {
      return this.$store.getters.getSponsor;
    }
  },
  watch: {
    sponsor: {
      handler: function event() {
        //console.log("Her");
        if (!this.formData.tekst) {
          this.formData.tekst = this.sponsor.tekst;
        }
      }
    }
  },

  validations: {
    formData: {
      tekst: {
        required
      }
    }
  },
  created() {
    console.log();
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

.register-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.register-sti {
  color: rgb(53, 53, 53);
}

.register-sti span {
  color: rgb(230, 230, 230);
}

.register-indhold {
  padding-top: 10px;
}

.register-type {
  display: flex;
}

.register-redaktion {
  padding: 10px 0;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

p {
  margin: 10px 0;
}

input,
select,
textarea {
  width: 100%;
  border: 2px rgb(240, 240, 240) solid;
  outline: none;
  border-radius: 3px;
  padding: 10px;
}

select {
  cursor: pointer;
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
