<template>
    <div>
        <p class="admin-main-sti" > <span>{{bruger.type === "admin" ? "Admin" : "Redaktør"}}</span></p>
        <h1 class="admin-main-h1" >{{bruger.type === "admin" ? "ADMIN" : "REDAKTØR"}}</h1>
        <div class="admin-main-br"></div>
        <div class="admin-main-indhold">
            <router-link v-if="bruger.type === 'admin'"  tag="div" class="admin-main-btn" to="/admin/register">Registrer Ny Redaktør/Admin</router-link>
            <router-link tag="div" class="admin-main-btn" to="/admin/redigerredaktoer">Rediger Redaktør</router-link>
            <router-link v-if="bruger.type === 'admin'" tag="div" class="admin-main-btn" to="/admin/menu">Rediger Menu</router-link>
            <router-link v-if="false" tag="div" class="admin-main-btn" to="/admin/beskeder">Administrer beskeder</router-link>
            <router-link tag="div" class="admin-main-btn" to="/admin/opret">Opret Ny Artikel</router-link>
            <router-link tag="div" class="admin-main-btn" to="/admin/rediger">Rediger Artikel</router-link>
            <router-link v-if="bruger.type === 'admin'" tag="div" class="admin-main-btn" to="/admin/sponsor">Rediger Sponsorer</router-link>
            <router-link v-if="bruger.type === 'admin'" tag="div" class="admin-main-btn" to="/admin/priser">Rediger Priser</router-link>
            <router-link v-if="bruger.type === 'admin'" tag="div" class="admin-main-btn" to="/admin/kontakt">Rediger Kontakt</router-link>
        <h1>Log</h1>
        <div class="admin-main-br"></div>

        <paginate name="logs" :per="5" :list="logs" class="paginate-list">
            <app-log v-for="(item,index) in paginated('logs')" :key="index" :objekt="item"></app-log>
        </paginate>
            <paginate-links for="logs" :limit="5" :show-step-links="true" :step-links="{next: ' ', prev: ' '}"></paginate-links>
        </div>
    </div>
</template>

<script>
import Log from "./Log";
export default {
  data() {
    return {
      paginate: ["logs"]
    };
  },
  computed: {
    logs() {
      return this.$store.getters.logs;
    },
    bruger() {
      return this.$store.getters.bruger;
    }
  },
  components: {
    appLog: Log
  },
  created() {
    this.$store.dispatch("hentLogs");
    this.$store.dispatch("hentKategorier");
  }
};
</script>

<style>
.admin-main-h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.admin-main-sti {
  color: rgb(53, 53, 53);
}

.admin-main-sti span {
  color: rgb(230, 230, 230);
}

.admin-main-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.admin-main-btn {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgb(53, 53, 53);
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

.admin-main-btn:hover {
  background-color: rgba(53, 53, 53, 0.2);
}

.paginate-links {
  padding-top: 15px;
  display: flex;
  list-style-type: none;
  width: 75%;
  justify-content: left;
}

.number {
  padding: 10px 0;
}

.number a,
.ellipses a {
  color: rgb(53, 53, 53);
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;
  padding: 7px 10px;
  background-color: rgb(230, 230, 230);
}

.active a {
  color: rgb(255, 255, 255);
  background-color: rgb(255, 192, 0);
}
</style>
