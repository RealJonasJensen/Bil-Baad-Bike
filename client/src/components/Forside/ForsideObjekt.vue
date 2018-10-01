<template>
    <div class="forside-objekt" >
        <h2>{{objekt.overskrift}}</h2>
        <div class="forside-info" >
            <p class="forside-dato" ><font-awesome-icon class="forside-icon" icon="clock" />{{dato}}</p>
            <p class="forside-kommentarer"> <font-awesome-icon class="forside-icon" icon="comments" />{{kommentarer}} KOMMENTARER</p>
        </div>
        <p class="forside-visninger"><font-awesome-icon class="forside-icon" icon="eye" />{{objekt.klik}} VISNINGER</p>
        <p class="forside-tekst" >{{objekt.tekst}}</p>
        <p class="forside-kategori" ><font-awesome-icon class="forside-icon" icon="tag" />{{objekt.kategori.toUpperCase()}}</p>

        <div class="forside-btn">LÆS MERE</div>
    </div>
</template>

<script>
export default {
  props: ["objekt"],
  data() {
    return {
      mutedobjekt: this.objekt
    };
  },
  computed: {
    dato() {
      let dato = this.mutedobjekt.oprettet;
      let time = dato.split("T")[1].split(":");
      time = `${time[0]}:${time[1]}`;
      let month = dato
        .split("T")[0]
        .split("-")
        .reverse();

      switch (month[1]) {
        case "01":
          month[1] = "JANUAR";
        case "02":
          month[1] = "FEBRUAR";
        case "03":
          month[1] = "MARTS";
        case "04":
          month[1] = "APRIL";
        case "05":
          month[1] = "MAJ";
        case "06":
          month[1] = "JUNI";
        case "07":
          month[1] = "JULI";
        case "08":
          month[1] = "AUGUST";
        case "09":
          month[1] = "SEPTEMPER";
        case "10":
          month[1] = "OKTOBER";
        case "11":
          month[1] = "NOVEMBER";
        case "12":
          month[1] = "DECEMBER";
        default:
      }
      return `${month[0]}. ${month[1]} ${month[2]} KL. ${time}`;
    },
    kommentarer() {
      let kommentarer = this.mutedobjekt.kommentarer;
      return kommentarer.length;
    }
  }
};
</script>

<style scoped>
.forside-objekt {
  width: 50%;
  display: inline-block;
}

h2 {
  font-size: 24px;
  font-weight: 100;
  color: rgb(53, 53, 53);
  padding: 10px 0;
}

.forside-info {
  display: flex;
  justify-content: space-between;
}

p {
  font-weight: 100;
  font-size: 13px;
  color: rgb(53, 53, 53);
  font-family: "Oswald", sans-serif;
}
.forside-dato {
  font-size: 13px;
  width: 56%;
  margin-right: 4px;
}

.forside-btn {
  font-family: "Oswald", sans-serif;
  background-color: rgb(230, 230, 230);
  color: rgb(119, 119, 119);
  width: 40%;
  text-align: center;
  padding: 8px 25px;
  margin: 10px 0;
  cursor: pointer;
}

.forside-tekst,
.forside-kategori {
  font-family: "Open Sans", sans-serif;
}

.forside-kommentarer {
  font-size: 13px;
  width: 44%;
}

.forside-visninger {
  font-size: 13px;
  padding-bottom: 5px;
}

.forside-tekst {
  padding-bottom: 5px;
}

.forside-icon {
  margin-right: 5px;
  font-size: 13px;
}
</style>
