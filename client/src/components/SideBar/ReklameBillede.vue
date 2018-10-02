<template>
<div>
    <img :src="'../../../src/assets/reklamer/' + objekt.billede" :alt="objekt.billede">
</div>
</template>

<script>
export default {
  props: ["objekt"]
};
</script>

<style scoped>
div {
  height: auto;
  width: 50%;
  margin: 0 auto;
  padding: 5px 0;
}

img {
  width: 100%;
  height: auto;
}
</style>
