<template>
    <div>
        <p class="admin-sti" >Admin </p>
        <h1>Admin</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
            <router-link to="/register">Register</router-link>
            <router-link to="/opret">Opret Ny</router-link>
            <router-link to="/rediger">Rediger</router-link>
        </div>
    </div>
</template>

<script>
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

.admin-indhold  {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
