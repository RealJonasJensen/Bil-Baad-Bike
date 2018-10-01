<template>
    <header>
        <img src="../../src/assets/logo.png" alt="Bil, Båd and Bike">

        <nav>
            <ul>
                <router-link to="/" tag="li" activeClass="aktiv" exact> <span><font-awesome-icon icon="home" /></span> FORSIDE</router-link>
                <router-link to="/biler" tag="li" activeClass="aktiv">BILER</router-link>
                <router-link to="/baad" tag="li" activeClass="aktiv">BÅDE</router-link>
                <router-link to="/bike" tag="li" activeClass="aktiv">BIKE'S</router-link>
                <router-link to="/arkiv" tag="li" activeClass="aktiv">ARKIVET</router-link>
                <router-link to="/kontakt" tag="li" activeClass="aktiv">KONTAKT</router-link>
                <router-link to="/redaktionen" tag="li" activeClass="aktiv">REDAKTIONEN</router-link>
            </ul>
        </nav>
    </header>
</template>

<script>
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

li {
  padding: 15px 15px;
  color: rgb(255, 255, 255);
  font-size: 13px;
}

li:hover {
  background-color: rgb(255, 192, 0);
  cursor: pointer;
}

.aktiv {
  background-color: rgb(255, 192, 0);
}
</style>
