<template>
        <div class="admin-log"  >
                <div>
                <p>{{dato}}</p>
                    <button @click="onSlet(objekt._id)">Slet</button>
                </div>
                    <p><span>{{objekt.brugerNavn}}</span> {{objekt.tekst}} <span>{{objekt.artikelNavn}}</span></p>
        </div>
</template>

<script>
export default {
  props: ["objekt"],
  data() {
    return {
      mutedObjekt: this.objekt
    };
  },
  methods: {
    onSlet(id) {
      if (confirm("Er du sikker på du vil slette denne log?")) {
        this.$store.dispatch("sletLog", id);
        //console.log(id);
      }
    }
  },
  computed: {
    dato() {
      let dato = this.mutedObjekt.oprettet;
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
    }
  }
};
</script>

<style scoped>
.admin-log {
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
  font-size: 13px;
  border: 1px solid rgb(53, 53, 53);
}

.admin-log span {
  font-weight: bold;
}

.admin-log div {
  display: grid;
  grid-template-columns: 90% 10%;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
}
</style>
