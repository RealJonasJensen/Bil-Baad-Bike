<template>
    <div>
        <p class="redaktion-sti" >Forside <span>/ Redaktionen</span></p>
        <h1>REDAKTIONEN</h1>
        <div class="redaktion-br"></div>
        <div class="redaktion-indhold">
           
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

.redaktion-indhold  {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
