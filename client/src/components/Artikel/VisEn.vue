<template>
    <div>
        <p class="artikel-sti" >Forside / {{overskrift}} <span>/ Vis artikel</span></p>
        <h1>{{artikel.overskrift}}</h1>
        <div class="artikel-br"></div>
        <div class="artikel-indhold">
            <div>
                <p class="artikel-dato" ><font-awesome-icon class="artikel-icon" icon="clock" />{{dato}}</p>
                <p class="artikel-kommentarer"> <font-awesome-icon class="artikel-icon" icon="comments" />{{artikel.kommentarer.length}} KOMMENTARER</p>
                <p class="artikel-visninger"><font-awesome-icon class="artikel-icon" icon="eye" />{{artikel.klik}} VISNINGER</p>
                <div class="artikel-tekst" v-html="artikel.tekst"></div>
                <div class="artikel-forfatter">
                    <div class="forfatter-img">
                        <img :src="'../../../src/assets/redaktion/' + artikel.forfatter.billede" :alt="artikel.forfatter.navn">
                    </div>
                    <div>
                        <p>af {{artikel.forfatter.navn}} <span>Redaktør</span></p>
                        <p class="forfatter-tekst" >{{artikel.forfatter.tekst}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
    dato() {
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
  created() {
    this.$store.dispatch("hentEn", this.$route.path.split("/")[2]);
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

.artikel-tekst {
  width: 100%;
  line-height: 25px;
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
</style>
