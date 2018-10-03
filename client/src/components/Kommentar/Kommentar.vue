<template>
        <div class="kommentar">
            <div class="kommentar-img">
                    <font-awesome-icon class="artikel-icon-comment" icon="comment" />
                </div>
                <div class="kommentar-info">
                    <p class="kommentar-info-navn">{{kommentar.navn}}</p>
                    <p class="kommentar-info-dato" ><font-awesome-icon class="kommentar-icon" icon="clock" />{{datoKommentar}}</p>
                    <p class="kommentar-info-kommentar">{{kommentar.kommentar}}</p>
                    <div class="kommentar-br" ></div>
                </div>
        </div>
</template>

<script>
export default {
  props: ["kommentar"],
  data() {
    return {
      mutedKommentar: this.kommentar
    };
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
}
</style>
