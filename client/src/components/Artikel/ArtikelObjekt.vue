<template>
    <div v-if="objekt" :style="artikelObjektStyle" class="artikel-objekt" >
        <h2>{{objekt.overskrift | overskrift(objekt.overskrift) }}</h2>
        <p class="artikel-dato" ><font-awesome-icon class="artikel-icon" icon="clock" />{{objekt.oprettet | dato(objekt.oprettet)}}</p>
        <p class="artikel-kommentarer"> <font-awesome-icon class="artikel-icon" icon="comments" />{{objekt.kommentarer.length}} KOMMENTARER</p>
        <p class="artikel-visninger"><font-awesome-icon class="artikel-icon" icon="eye" />{{objekt.klik}} {{objekt.klik === 1 ? "VISNING" : "VISNINGER"}}</p>
        <p class="artikel-tekst">{{objekt.tekst | text(objekt.tekst, this.$route.path) | striphtml}}</p>

        <p v-if="!sti || sti === 'arkiv'" class="artikel-kategori" ><font-awesome-icon class="artikel-icon" icon="tag" />{{objekt.kategori === "baad" ? "BÅD" : objekt.kategori.toUpperCase()}}</p>

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
      }
    };
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
