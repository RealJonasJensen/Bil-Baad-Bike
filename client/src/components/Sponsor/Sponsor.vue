<template>
    <div>
        <p class="sponsor-sti" >Forside <span>/ Sponsor</span></p>
        <h1>SPONSOR</h1>
        <div class="sponsor-br"></div>
        <div class="sponsor-indhold">
            <p class="sponsor-tekst">{{sponsor.tekst}}</p>
            <div class="sponsor-info" >
                <div class="sponsor-info-overskrift" >
                    <h3><font-awesome-icon class="artikel-icon" icon="eye" />Visninger</h3>
                    <h3>Pris per visning</h3>
                </div>
                <div v-for="(item, index) in sponsor.priser" :key="index" class="sponsor-info-item" >
                    <div class="sponsor-visninger">
                        <p>
                            {{item.visninger}}
                        </p>
                    </div>
                    <div class="sponsor-pris">
                        <p>
                            {{item.pris}} kr.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    sponsor() {
      //   console.log();
      return this.$store.getters.getSponsor;
    }
  },
  created() {
    this.$store.dispatch("hentSponsor");
    this.$store.dispatch("mestSete");
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.artikel-icon {
  margin-right: 5px;
}

.sponsor-info-overskrift {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 3%;
  font-size: 13px;
  font-weight: bold;
  padding: 10px 0;
}

.sponsor-info-item {
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: right;
  border-top: 2px rgb(230, 230, 230) solid;
}

.sponsor-info p {
  padding: 7px 0;
  font-size: 14px;
}

.sponsor-sti {
  color: rgb(53, 53, 53);
}

.sponsor-sti span {
  color: rgb(230, 230, 230);
}

.sponsor-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.sponsor-tekst {
  font-size: 14px;
  line-height: 25px;
  margin: 10px 0;
  white-space: pre-wrap;
}
</style>

