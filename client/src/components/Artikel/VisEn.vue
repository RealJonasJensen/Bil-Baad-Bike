<template>
    <div>
        <p class="artikel-sti" >Forside / {{overskrift}} <span>/ Vis artikel</span></p>
        <h1>{{artikel.overskrift}}</h1>
        <div class="artikel-br"></div>
        <div class="artikel-indhold">
            <div>
                <div class="artikel-info" >
                    <p class="artikel-dato" ><font-awesome-icon class="artikel-icon" icon="clock" />{{datoArtikel}}</p>
                    <p class="artikel-kommentarer"><font-awesome-icon class="artikel-icon" icon="comments" />{{artikel.kommentarer.length}} KOMMENTARER</p>
                    <p class="artikel-visninger"><font-awesome-icon class="artikel-icon" icon="eye" />{{artikel.klik + 1}} {{artikel.klik + 1 === 1 ? "VISNING" : "VISNINGER"}}</p>
                </div>
                <div class="artikel-tekst" v-html="artikel.tekst"></div>
                <div class="artikel-forfatter">
                    <div class="forfatter-img">
                        <img :src="'../../../src/assets/redaktion/' + artikel.forfatter.billede" :alt="artikel.forfatter.navn">
                    </div>
                    <div>
                        <p>af {{artikel.forfatter.navn}} <span>{{artikel.forfatter.type === "admin" ? "Admin" : "Redaktør"}}</span></p>
                        <p class="forfatter-tekst" >{{artikel.forfatter.tekst}}</p>
                    </div>
                </div>
            </div>
        </div>
        <h1>KOMMENTARER</h1>
        <div class="artikel-br"></div>
        <div class="kommentarer-indhold">

            <app-kommentar v-for="(item) in artikel.kommentarer" :key="item.id" :kommentar="item" ></app-kommentar>

        <h2 class="kommentar-h2" >Din kommentar</h2>
            <div class="kommentar-form" >
                <h2 class="kommentar-form-h2" ></h2>
                <div class="kommentar-form-navn-email">
                    <div>
                        <p>Dit navn</p>
                        <input :class="{invalid: $v.formData.navn.$error}" v-model="formData.navn" type="text">
                    </div>
                    <div>
                        <p>Din e-mailadresse</p>
                        <input :class="{invalid: $v.formData.email.$error}" v-model="formData.email" type="text">
                    </div>
                </div>
                <div class="kommentar-form-kommentar">
                    <p>Kommentar</p>
                    <textarea :class="{invalid: $v.formData.kommentar.$error}"  v-model="formData.kommentar" name="" id="" cols="30" rows="5"></textarea>
                </div>

                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onComment" >UDFØR</button>
            </div>

        </div>
    </div>
</template>

<script>
import Kommentar from "../Kommentar/Kommentar";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        navn: "",
        email: "",
        kommentar: ""
      }
    };
  },
  methods: {
    onComment() {
      const payload = {
        data: { ...this.formData, id: this.$route.path.split("/")[2] }
      };
      this.$store.dispatch("nyKommentar", payload);
      this.formData.navn = "";
      this.formData.email = "";
      this.formData.kommentar = "";
    }
  },
  computed: {
    overskrift() {
      const sti = this.$route.path.split("/")[1];
      if (sti === "bil") {
        return "Biler";
      } else if (sti === "baad") {
        return "Både";
      } else if (sti === "bike") {
        return "Bike's";
      }
    },
    datoArtikel() {
      let dato = this.artikel.oprettet;
      let time = dato.split("T")[1].split(":");
      time = `${time[0]}:${time[1]}`;
      let month = dato
        .split("T")[0]
        .split("-")
        .reverse();

      switch (month[1]) {
        case "01":
          month[1] = "JANUAR";
          break;
        case "02":
          month[1] = "FEBRUAR";
          break;
        case "03":
          month[1] = "MARTS";
          break;
        case "04":
          month[1] = "APRIL";
          break;
        case "05":
          month[1] = "MAJ";
          break;
        case "06":
          month[1] = "JUNI";
          break;
        case "07":
          month[1] = "JULI";
          break;
        case "08":
          month[1] = "AUGUST";
          break;
        case "09":
          month[1] = "SEPTEMPER";
          break;
        case "10":
          month[1] = "OKTOBER";
          break;
        case "11":
          month[1] = "NOVEMBER";
          break;
        case "12":
          month[1] = "DECEMBER";
          break;
        default:
      }
      return `${month[0]}. ${month[1]} ${month[2]} KL. ${time}`;
    },
    artikel() {
      return this.$store.getters.artikel;
    }
  },
  components: {
    appKommentar: Kommentar
  },
  created() {
    this.$store.dispatch("hentEn", this.$route.path.split("/")[2]);
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
      kommentar: {
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

.artikel-sti {
  color: rgb(53, 53, 53);
}

.artikel-sti span {
  color: rgb(230, 230, 230);
}

.artikel-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.artikel-indhold  {
  display: grid;
  grid-template-columns: 50% 50%;
}

.artikel-info {
  padding: 10px 0;
}

.artikel-tekst {
  width: 100%;
  line-height: 25px;
  white-space: pre-wrap;
}

.artikel-tekst >>> h2 {
  padding: 5px 0;
  font-weight: 100;
  font-size: 24px;
}

.artikel-tekst >>> ul {
  padding: 0;
  margin: 0;
  width: 75%;
  margin-left: 10%;
}

.artikel-tekst h1 {
  color: red;
}

.artikel-dato {
  font-size: 13px;
  display: inline;
  margin-right: 4px;
  font-weight: bold;
}

.artikel-kommentarer {
  font-size: 13px;
  display: inline;
  font-weight: bold;
}

.artikel-visninger {
  font-weight: bold;
  font-size: 13px;
  padding-bottom: 5px;
  display: inline;
}

.artikel-icon {
  margin-right: 5px;
  font-size: 13px;
}

.artikel-forfatter {
  padding: 20px 0;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-gap: 3%;
}

.forfatter-tekst {
  font-size: 13px;
}

.artikel-forfatter span {
  font-size: 13px;
  color: rgb(119, 119, 119);
}

img {
  width: 100%;
  height: auto;
}

/* Kommentar */

.kommentar-h2 {
  padding: 10px 0;
  font-weight: 100;
}

.kommentar-form-navn-email {
  display: grid;
  grid-template-columns: 47.5% 47.5%;
  grid-gap: 5%;
  padding-top: 10px;
}

.kommentar-form-emne {
  width: 100%;
  padding-top: 10px;
}

.kommentar-form-kommentar {
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

.kommentar-form p {
  font-weight: bold;
  font-size: 13px;
  padding-bottom: 3px;
  color: rgb(53, 53, 53);
}
</style>
