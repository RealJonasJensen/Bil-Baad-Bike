<template>
    <div>
        <p class="kontakt-sti" >Forside <span>/ Kontakt</span></p>
        <h1>KONTAKT MAGASINET</h1>
        <div class="kontakt-br"></div>
        <div class="kontakt">
        <div class="kontakt-indhold">
            <div class="kontakt-info">
                <div class="kontakt-adresse">
                    <h2><font-awesome-icon class="artikel-icon" icon="map-marker-alt" />Adresse</h2>
                    <p>{{kontakt.adresse}}</p>
                    <p>{{kontakt.postkode}}</p>
                    <p>{{kontakt.land}}</p>
                </div>
                <div class="kontakt-oplysninger">
                    <h2>Kontaktoplysninger</h2>
                    <p><font-awesome-icon class="artikel-icon" icon="phone" />Telefon: {{kontakt.telefon}}</p>
                    <p><font-awesome-icon class="artikel-icon" icon="fax" />Fax: {{kontakt.fax}}</p>
                    <p><font-awesome-icon class="artikel-icon" icon="envelope" />E-mail: {{kontakt.email}}</p>
                </div>
            </div>
        </div>
        </div>
            <div class="br"></div>
            <div class="kontakt-form" >
                <h2 class="kontakt-h2" >Kontaktformular</h2>
                <div class="kontakt-navn-email">
                    <div>
                        <p>Dit navn</p>
                        <input :class="{invalid: $v.formData.navn.$error}" @blur="$v.formData.navn.$touch()" v-model="formData.navn" type="text">
                    </div>
                    <div>
                        <p>Din e-mailadresse</p>
                        <input :class="{invalid: $v.formData.email.$error}" @blur="$v.formData.email.$touch()" v-model="formData.email" type="text">
                    </div>
                </div>
                <div class="kontakt-emne">
                    <p>Emne</p>
                    <input :class="{invalid: $v.formData.emne.$error}" @blur="$v.formData.emne.$touch()" v-model="formData.emne" type="text">
                </div>
                <div class="kontakt-besked">
                    <p>Din besked</p>
                    <textarea :class="{invalid: $v.formData.besked.$error}" @blur="$v.formData.besked.$touch()" v-model="formData.besked" cols="30" rows="10"></textarea>
                </div>
                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onSend">SEND BESKED</button>
            </div>   
    </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        navn: "",
        email: "",
        emne: "",
        besked: ""
      }
    };
  },
  methods: {
    onSend() {
      this.$store.dispatch("nyBesked", this.formData);
      //console.log(this.formData);
    }
  },
  computed: {
    kontakt() {
      return this.$store.getters.getKontakt;
    }
  },
  validations: {
    formData: {
      navn: {
        required
      },
      email: {
        required,
        email
      },
      emne: {
        required
      },
      besked: {
        required
      }
    }
  },
  created() {
    this.$store.dispatch("mestSete");
    this.$store.dispatch("hentKontakt");
  }
};
</script>

<style scoped>
.artikel-icon {
  margin-right: 5px;
  color: rgb(53, 53, 53);
}

.kontakt-sti {
  color: rgb(53, 53, 53);
}

h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.kontakt h2 {
  font-weight: 100;
  color: rgb(53, 53, 53);
  padding-bottom: 10px;
}

.kontakt p {
  font-size: 13px;
  color: rgb(119, 119, 119);
}

.br {
  height: 1px;
  width: 100%;
  background-color: rgb(230, 230, 230);
}

.kontakt-sti {
  color: rgb(53, 53, 53);
}

.kontakt-sti span {
  color: rgb(230, 230, 230);
}

.kontakt-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.kontakt-info {
  padding: 20px 0;
  display: grid;
  grid-template-columns: 50% 50%;
}

.kontakt-h2 {
  padding: 10px 0;
}

.kontakt-navn-email {
  display: grid;
  grid-template-columns: 47.5% 47.5%;
  grid-gap: 5%;
  padding-top: 10px;
}

.kontakt-emne {
  width: 100%;
  padding-top: 10px;
}

.kontakt-besked {
  padding-top: 10px;
}

textarea,
input {
  width: 100%;
  border: 2px rgb(240, 240, 240) solid;
  outline: none;
  border-radius: 3px;
  padding: 10px;
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

.kontakt-form p {
  font-weight: bold;
  font-size: 13px;
  padding-bottom: 3px;
  color: rgb(53, 53, 53);
}
</style>
