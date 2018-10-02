<template>
    <div>
        <p class="redaktion-sti" >Forside <span>/ Redaktionen</span></p>
        <h1>REDAKTIONEN</h1>
        <div class="redaktion-br"></div>
        <div class="redaktion-indhold">
            <h2>Biler</h2>
            <div v-for="(item, index) in redaktionBil" :key="index" class="redaktion-person">
                <div class="person-img">
                    <img :src="'../../../src/assets/redaktion/' + item.billede" :alt="item.navn">
                </div>
                <div class="person-info">
                    <p class="person-navn" >{{item.navn}}</p>
                    <p class="person-email" ><font-awesome-icon class="artikel-icon" icon="envelope" />{{item.email}}</p>
                    <p class="person-tekst" >{{item.tekst}}</p>
                </div>
            </div>
            <h2>Både</h2>
            <div v-for="(item, index) in redaktionBaad" :key="index" class="redaktion-person">
                <div class="person-img">
                    <img :src="'../../../src/assets/redaktion/' + item.billede" :alt="item.navn">
                </div>
                <div class="person-info">
                    <p class="person-navn" >{{item.navn}}</p>
                    <p class="person-email" ><font-awesome-icon class="artikel-icon" icon="envelope" />{{item.email}}</p>
                    <p class="person-tekst" >{{item.tekst}}</p>
                </div>
            </div>
            <h2>Bike's</h2>
            <div v-for="(item, index) in redaktionBike" :key="index" class="redaktion-person">
                <div class="person-img">
                    <img :src="'../../../src/assets/redaktion/' + item.billede" :alt="item.navn">
                </div>
                <div class="person-info">
                    <p class="person-navn" >{{item.navn}}</p>
                    <p class="person-email" ><font-awesome-icon class="artikel-icon" icon="envelope" />{{item.email}}</p>
                    <p class="person-tekst" >{{item.tekst}}</p>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    redaktionBil() {
      const bil = [];
      this.$store.getters.getRedaktion.forEach(redaktoer => {
        const check = redaktoer.redaktion.includes("bil");
        check ? bil.push(redaktoer) : null;
      });
      return bil;
    },
    redaktionBaad() {
      const baad = [];
      this.$store.getters.getRedaktion.forEach(redaktoer => {
        const check = redaktoer.redaktion.includes("baad");
        check ? baad.push(redaktoer) : null;
      });
      return baad;
    },
    redaktionBike() {
      const bike = [];
      this.$store.getters.getRedaktion.forEach(redaktoer => {
        const check = redaktoer.redaktion.includes("bike");
        check ? bike.push(redaktoer) : null;
      });
      return bike;
    }
  },
  created() {
    this.$store.dispatch("hentRedaktion");
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

h2 {
  font-weight: 100;
  padding: 10px 0;
}

.redaktion-sti {
  color: rgb(53, 53, 53);
}

.redaktion-sti span {
  color: rgb(230, 230, 230);
}

.redaktion-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.redaktion-person {
  padding: 15px;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-gap: 2%;
}

.person-navn {
  padding-bottom: 5px;
  color: rgb(53, 53, 53);
  font-size: 18px;
}

.person-email {
  padding-bottom: 5px;
  font-size: 13px;
}

.person-tekst {
  font-size: 14px;
  line-height: 25px;
}

.artikel-icon {
  margin-right: 5px;
}

img {
  width: 100%;
  height: auto;
}
</style>
