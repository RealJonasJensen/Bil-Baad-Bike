<template>
    <div>
        <p class="admin-sti" >Admin / <span>Beskeder</span></p>
        <h1>Beskeder</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
            <div class="admin" v-for="(item, index) in beskeder" :key="index">
                    <p class="admin-navn"> <span>Navn:</span> {{item.navn}}</p>
                    <p class="admin-email"><span>Email:</span> {{item.email}}</p>
                <p class="admin-emne"><span>Emne:</span> {{item.emne}}</p>
                <p class="admin-besked"><span>Besked:</span> {{item.besked}}</p>
                <button @click="onSlet(item._id, item.navn)" class="admin-btn">Slet</button>
                <button @click="onSvar" class="admin-btn">Svar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    onSlet(id, navn) {
      console.log(id, navn);
      if (
        confirm("Er du sikker på du vil slette denne besked fra " + navn + "?")
      )
        this.$store.dispatch("sletBesked", id);
    },
    onSvar() {
      alert("Videre til email ....");
    }
  },
  computed: {
    beskeder() {
      return this.$store.getters.getBeskeder;
    }
  },
  created() {
    this.$store.dispatch("hentBeskeder");
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

.admin {
  padding: 5% 3%;
  margin: 10px 0;
  border: 1px solid rgb(53, 53, 53);
  border-radius: 5px;
}

.admin span {
  font-weight: bold;
}

.admin-besked {
  margin-bottom: 15px;
}

.admin-btn {
  width: 25%;
  padding: 5px 10px;
  border: 1px solid rgb(53, 53, 53);
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}
</style>
