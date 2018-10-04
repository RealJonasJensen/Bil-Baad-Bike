<template>
        <div class="kommentar">
            <div class="kommentar-img">
                    <font-awesome-icon class="artikel-icon-comment" icon="comment" />
                </div>
                <div class="kommentar-info">
                    <p class="kommentar-info-navn">{{kommentar.navn}}</p>
                    <p class="kommentar-info-dato" ><font-awesome-icon class="kommentar-icon" icon="clock" />{{datoKommentar}}</p>
                    <p v-if="!redigerKommentar" class="kommentar-info-kommentar">{{kommentar.kommentar}}</p>
                    <textarea  :class="{invalid: $v.nyKommentar.$error}" @blur="$v.nyKommentar.$touch()" v-if="redigerKommentar" v-model="nyKommentar"  cols="30" rows="5"></textarea>
                    <button @click="onSend(kommentar._id)" class="kommentar-knap" :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" v-if="redigerKommentar" >Bekræft</button>
                    <button v-if="!redigerKommentar" @click="onSlet(kommentar._id)">Slet</button>
                    <button @click="onRediger">Rediger</button>
                    <div class="kommentar-br" ></div>
                </div>
        </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  props: ["kommentar", "artikelId"],
  data() {
    return {
      nyKommentar: "",
      redigerKommentar: false,
      mutedKommentar: this.kommentar
    };
  },
  methods: {
    onSlet(kommentarId) {
      if (confirm("Er du sikker på du vil slette denne kommentar?")) {
        //console.log(kommentarId, this.artikelId);
        const data = {
          kommentarId,
          artikelId: this.artikelId
        };
        this.$store.dispatch("sletKommentar", data);
      }
    },
    onRediger() {
      this.nyKommentar = this.kommentar.kommentar;
      this.redigerKommentar = !this.redigerKommentar;
    },
    onSend(kommentarId) {
      const data = {
        kommentarId,
        artikelId: this.artikelId,
        kommentar: this.nyKommentar
      };
      this.redigerKommentar = !this.redigerKommentar;
      this.$store.dispatch("retKommentar", data);
    }
  },
  validations: {
    nyKommentar: {
      required
    }
  },
  computed: {
    datoKommentar() {
      let dato = this.mutedKommentar.oprettet;
      let time = dato.split("T")[1].split(":");
      time = `${time[0]}:${time[1]}:${time[2].split(".")[0]}`;
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
    }
  }
};
</script>

<style scoped>
.kommentar-br {
  height: 1px;
  margin: 15px 0;
  background-color: rgb(230, 230, 230);
  width: 100%;
}

.artikel-icon-comment {
  margin-top: 5px;
  font-size: 24px;
}

.kommentar-icon {
  margin-right: 5px;
}

.kommentar {
  display: grid;
  grid-template-columns: 5% 94%;
  grid-gap: 1%;
}

.kommentar-info-navn {
  padding: 5px 0;
}

.kommentar-info-dato {
  font-weight: bold;
  font-size: 12px;
}

.kommentar-info-kommentar {
  font-size: 12px;
  padding: 5px 0;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
  margin: 10px 0;
}

.kommentar-knap {
  cursor: not-allowed;
  color: rgb(240, 240, 240);
}

textarea {
  width: 100%;
  border: 2px rgb(240, 240, 240) solid;
  outline: none;
  border-radius: 3px;
  padding: 10px;
}

textarea:focus {
  border: rgba(255, 192, 0, 0.5) solid 2px;
}

.validKnap {
  cursor: pointer;
  color: rgb(53, 53, 53);
}
.invalid {
  border: solid 2px rgb(255, 83, 83);
  transition: all 0.5s;
}
</style>
