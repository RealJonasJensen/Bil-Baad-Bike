<template>
    <footer>
        <div class="footer-adresse">
            <h4>Adresse</h4>
        </div>
        <div class="footer-kontakt">
            <h4>Kontakt</h4>
        </div>
        <div class="footer-nyhedsbrev">
            <h4>Nyhedsbrev</h4>
            <input type="text" placeholder="E-mailadresse" >
            <div class="footer-btn">TILMELD</div>
            <div class="footer-btn">AFMELD</div>
        </div>
    </footer>
</template>

<script>
</script>

<style scoped>
footer {
  background-color: rgb(53, 53, 53);
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  padding: 10px;
  font-family: "Open Sans", sans-serif;
}

h4 {
  color: rgb(255, 255, 255);
  padding: 10px 0;
  font-size: 18px;
  font-weight: 100;
}

input {
  width: 100%;
  padding: 4% 2%;
  border: none;
  outline: none;
  border-radius: 2px;
}

.footer-btn {
  display: inline-block;
  font-family: "Oswald", sans-serif;
  background-color: rgb(230, 230, 230);
  color: rgb(53, 53, 53);
  padding: 5px 20px;
  margin: 10px 0;
  margin-right: 10px;
  cursor: pointer;
}

.footer-btn p {
  color: rgb(119, 119, 119);
}

p {
  color: rgb(255, 255, 255);
}
</style>
