<template>
    <div :style="artikelObjektStyle" class="artikel-objekt" >
        <h2>{{overskrift}}</h2>
        <p class="artikel-dato" ><font-awesome-icon class="artikel-icon" icon="clock" />{{dato}}</p>
        <p class="artikel-kommentarer"> <font-awesome-icon class="artikel-icon" icon="comments" />{{kommentarer}} KOMMENTARER</p>
        <p class="artikel-visninger"><font-awesome-icon class="artikel-icon" icon="eye" />{{objekt.klik}} {{objekt.klik === 1 ? "VISNING" : "VISNINGER"}}</p>
        <p class="artikel-tekst">{{tekst}}</p>

        <p v-if="!sti || sti === 'arkiv'" class="artikel-kategori" ><font-awesome-icon class="artikel-icon" icon="tag" />{{objekt.kategori.toUpperCase()}}</p>

        <router-link :to="`/${objekt.kategori}/${objekt._id}`" tag="div" class="artikel-btn">LÆS MERE</router-link>
    </div>
</template>

<script>
export default {
  props: ["objekt", "sti"],
  data() {
    return {
      artikelObjektStyle: {
        width: this.sti ? "100%" : "50%"
      },
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
    kommentarer() {
      let kommentarer = this.mutedobjekt.kommentarer;
      return kommentarer.length;
    },
    tekst() {
      //console.log(this.$route.path);
      if (this.mutedobjekt.tekst.length > 500 && this.$route.path !== "/") {
        return this.mutedobjekt.tekst.substring(0, 499) + " ...";
      } else if (
        this.mutedobjekt.tekst.length > 200 &&
        this.$route.path === "/"
      ) {
        // const text = this.mutedobjekt.tekst.split(" ");
        // console.log(text);
        return this.mutedobjekt.tekst.substring(0, 199) + " ...";
      }
      return this.mutedobjekt.tekst;
    },
    overskrift() {
      if (this.mutedobjekt.overskrift.length > 28) {
        return this.mutedobjekt.overskrift.substring(0, 27) + " ...";
      }
      return this.mutedobjekt.overskrift;
    }
  }
};
</script>

<style scoped>
.artikel-objekt {
  display: inline-block;
}

h2 {
  font-size: 24px;
  font-weight: 100;
  color: rgb(53, 53, 53);
  padding: 10px 0;
}

.artikel-info {
  display: flex;
  justify-content: space-between;
}

p {
  font-weight: 100;
  font-size: 14px;
  color: rgb(53, 53, 53);
  font-family: "Oswald", sans-serif;
}
.artikel-dato {
  font-size: 13px;
  display: inline;
  margin-right: 4px;
}

.artikel-btn {
  font-family: "Oswald", sans-serif;
  background-color: rgb(230, 230, 230);
  color: rgb(119, 119, 119);
  width: 40%;
  text-align: center;
  padding: 8px 25px;
  margin: 10px 0;
  cursor: pointer;
}

.artikel-btn:hover {
  background-color: rgb(128, 28, 28);
  color: rgb(240, 240, 240);
}

.artikel-tekst,
.artikel-kategori {
  font-family: "Open Sans", sans-serif;
}

.artikel-kommentarer {
  font-size: 13px;
  display: inline;
}

.artikel-visninger {
  font-size: 13px;
  padding-bottom: 5px;
  display: inline;
}

.artikel-tekst {
  padding-bottom: 5px;
}

.artikel-icon {
  margin-right: 5px;
  font-size: 13px;
}
</style>
