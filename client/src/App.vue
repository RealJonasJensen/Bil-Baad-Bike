<template>
    <div class="wrapper">
        <app-header></app-header>
        <div class="container">
          <div class="main">
            <router-view></router-view>
          </div>
          <div class="side">
            <component :is="sideBarComponent"></component>
          </div>
          </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar/SideBar";

export default {
  data() {
    return {
      sideBarComponent: "app-side-bar"
    };
  },
  components: {
    appHeader: Header,
    appFooter: Footer,
    appSideBar: SideBar
  },
  created() {
    this.$store.dispatch("hentKontakt");
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

body {
  background-color: rgb(240, 240, 240);
}

.wrapper {
  width: 916px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
}

.container {
  display: grid;
  grid-template-columns: 66.6% 33.3%;
}

.main {
  padding: 10px;
}

.side {
  padding: 10px;
}
</style>
