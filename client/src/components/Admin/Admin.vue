<template>
    <div>
        <p class="admin-sti" > <span>Admin</span></p>
        <h1>Admin</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
            <router-link tag="div" class="admin-btn" to="/admin/register">Registrer Ny Redaktør/Admin</router-link>
            <router-link tag="div" class="admin-btn" to="/">Rediger Redaktør</router-link>
            <router-link tag="div" class="admin-btn" to="/admin/beskeder">Administrer beskeder</router-link>
            <router-link tag="div" class="admin-btn" to="/admin/opret">Opret Ny Artikel</router-link>
            <router-link tag="div" class="admin-btn" to="/admin/rediger">Rediger Artikel</router-link>
            <router-link tag="div" class="admin-btn" to="/">Rediger Sponsorer</router-link>
            <router-link tag="div" class="admin-btn" to="/admin/priser">Rediger Priser</router-link>
            <router-link tag="div" class="admin-btn" to="/admin/kontakt">Rediger Kontakt</router-link>
        <h1>Log</h1>
        <div class="admin-br"></div>
            <app-log v-for="(item, index) in logs" :objekt="item" :key="index" ></app-log>
        </div>
    </div>
</template>

<script>
import Log from "./Log";
export default {
  computed: {
    logs() {
      return this.$store.getters.logs;
    }
  },
  components: {
    appLog: Log
  },
  created() {
    this.$store.dispatch("hentLogs");
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.admin-sti {
  color: rgb(53, 53, 53);
}

.admin-sti span {
  color: rgb(230, 230, 230);
}

.admin-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.admin-btn {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgb(53, 53, 53);
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}
</style>
