<template>
    <footer>
        <div class="footer-adresse">
            <h4>Adresse</h4>
            <p>{{kontakt.navn}}</p>
            <p>{{kontakt.adresse}}</p>
            <p>{{kontakt.postkode}}</p>
            <p>{{kontakt.land}}</p>
        </div>
        <div class="footer-kontakt">
            <h4>Kontakt</h4>
            <p>Telefon: {{kontakt.telefon}}</p>
            <p>Fax: {{kontakt.fax}}</p>
            <p>E-mail: {{kontakt.email}}</p>
            <router-link class="footer-login" to="/login">LOGIN</router-link>
        </div>
        <div class="footer-nyhedsbrev">
            <h4>Nyhedsbrev</h4>
            <input v-model="email" type="text" placeholder="E-mailadresse" >
            <p>
                {{infoBesked.email}}
            </p>
            <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" class="footer-btn" @click="onTilmeld" >TILMELD</button>
            <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" class="footer-btn" @click="onAfmeld" >AFMELD</button>
        </div>
    </footer>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    onTilmeld() {
      const data = { email: this.email };
      this.$store.dispatch("nyNyhedsbrev", data);
      this.email = "";
    },
    onAfmeld() {
      const data = { email: this.email };
      this.$store.dispatch("sletNyhedsbrev", data);
      this.email = "";
    }
  },
  computed: {
    infoBesked() {
      return this.$store.getters.getInfoBesked;
    },
    kontakt() {
      return this.$store.getters.getKontakt;
    }
  },
  validations: {
    email: {
      email,
      required
    }
  }
};
</script>

<style scoped>
footer {
  background-color: rgb(53, 53, 53);
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  padding: 10px;
  font-family: "Open Sans", sans-serif;
}

h4 {
  color: rgb(255, 255, 255);
  padding: 10px 0;
  font-size: 18px;
  font-weight: 100;
}

input {
  width: 100%;
  padding: 4% 2%;
  border: none;
  outline: none;
  border-radius: 2px;
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

.footer-btn p {
  color: rgb(119, 119, 119);
}

.footer-login {
  color: rgb(119, 119, 119);
}

p {
  color: rgb(255, 255, 255);
  font-size: 13px;
  padding: 3px 0;
}
</style>
