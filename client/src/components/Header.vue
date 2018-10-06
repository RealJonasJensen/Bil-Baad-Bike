<template>
    <header>
        <img src="../../src/assets/logo.png" alt="Bil, Båd and Bike">

        <nav>
            <ul>
                <router-link to="/" tag="li" activeClass="aktiv" exact> <span><font-awesome-icon icon="home" /></span> FORSIDE</router-link>
                <router-link tag="li" activeClass="aktiv" v-for="(item, index) in kategorier" :key="index" :to="'/' + item" >{{item | menu}}</router-link>
                <!-- <router-link to="/bil" tag="li" activeClass="aktiv">BILER</router-link>
                <router-link to="/baad" tag="li" activeClass="aktiv">BÅDE</router-link>
                <router-link to="/bike" tag="li" activeClass="aktiv">BIKE'S</router-link> -->
                <router-link to="/arkiv" tag="li" activeClass="aktiv">ARKIVET</router-link>
                <router-link to="/kontakt" tag="li" activeClass="aktiv">KONTAKT</router-link>
                <router-link to="/redaktionen" tag="li" activeClass="aktiv">REDAKTIONEN</router-link>
                <router-link v-if="login" to="/admin" tag="li" activeClass="aktiv">ADMIN</router-link>
                <p v-if="login">{{bruger.navn.split(" ")[0].toUpperCase()}}</p>
                <a v-if="login" @click="onLogout">LOG UD</a>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    kategorier() {
      return this.$store.getters.getKategorier.kategorier;
      // .replace(/[|]/, "j");
    },
    login() {
      return this.$store.getters.isAuthenticated;
    },
    bruger() {
      return this.$store.getters.bruger;
    }
  }
};
</script>

<style scoped>
header {
  font-family: "Oswald", sans-serif;
}

img {
  padding: 30px 10px;
}

ul {
  list-style-type: none;
  display: flex;
  margin: 10px;
  background-color: rgb(53, 53, 53);
  border-bottom: rgb(255, 192, 0) 5px solid;
}

li,
a,
p {
  padding: 15px 15px;
  color: rgb(255, 255, 255);
  font-size: 13px;
}
p {
  text-align: right;
}

li:hover,
a:hover {
  background-color: rgb(255, 192, 0);
  cursor: pointer;
}

.aktiv {
  background-color: rgb(255, 192, 0);
}
</style>
