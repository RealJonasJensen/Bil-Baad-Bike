<template>
    <div>
        <p class="register-sti" >{{bruger.type === "admin" ? "Admin" : "Redaktør"}} / Rediger / Billede / <span>{{redaktoer.navn}}</span></p>
        <h1>Billede {{redaktoer.navn}}</h1>
        <div class="register-br"></div>
        <div class="register-indhold">
            <div>
                 <p>Max 5mb. Kun jpeg, jpg, png, gif filtyper.</p>
            <input name="billede" class="form-file" type="file" @change="onBillede" >
            </div>
            <button class="validKnap" @click="onSubmit">Nyt billede</button>
        </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      billede: ""
    };
  },
  methods: {
    onBillede(event) {
      // console.log(event.target.files[0]);
      this.billede = event.target.files[0];
    },
    onSubmit() {
      if (this.billede) {
        // console.log("Der er billede");
        const fd = new FormData();
        fd.append("billede", this.billede);
        fd.append("id", this.redaktoer._id);
        console.log(fd);
        const data = {
          data: fd,
          id: this.redaktoer._id
        };
        this.$store.dispatch("opdaterRedaktoerBillede", data);
      } else {
        alert("Intet billede er valgt");
      }
    }
  },
  computed: {
    redaktoer() {
      return this.$store.getters.getRedaktoer;
    },
    bruger() {
      return this.$store.getters.bruger;
    }
  },
  created() {
    console.log();
    this.$store.dispatch("hentEnRedaktoer", this.$route.path.split("/")[3]);
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.register-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.register-sti {
  color: rgb(53, 53, 53);
}

.register-sti span {
  color: rgb(230, 230, 230);
}

.register-indhold {
  padding-top: 10px;
}

button {
  font-family: "Oswald", sans-serif;
  background-color: rgb(230, 230, 230);
  color: rgb(206, 206, 206);
  text-align: center;
  padding: 8px 25px;
  margin: 10px 0 50px;
  border: none;
  outline: none;
}

.validKnap {
  font-family: "Oswald", sans-serif;
  background-color: rgb(230, 230, 230);
  color: rgb(119, 119, 119);
  text-align: center;
  padding: 8px 25px;
  margin: 10px 0 50px;
  cursor: pointer;
  border: none;
  outline: none;
}

.validKnap:hover {
  background-color: rgb(128, 28, 28);
  color: rgb(240, 240, 240);
}
.invalid {
  border: solid 2px rgb(255, 83, 83);
  transition: all 0.5s;
}
</style>
