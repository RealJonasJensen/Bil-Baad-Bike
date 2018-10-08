<template>
    <div>
        <p class="opret-sti" >Admin / Sponsor / <span>Ny</span></p>
        <h1>Ny Sponsor</h1>
        <div class="opret-br"></div>
        <div class="opret-indhold">
            <div class="opret-form" >
                <div class="opret-overskrift">

                    <div>
                 <p>Max 5mb. Kun jpeg, jpg, png, gif filtyper.</p>
            <input name="billede" class="form-file" type="file" @change="onBillede" >
            </div>

                <p>Kategori: </p>

                <div class="register-type"> 
                    <select :class="{invalid: $v.formData.kategori.$error}" @blur="$v.formData.kategori.$touch()" v-model="formData.kategori" >
                        <option disabled value=""> -- Vælg Kategori --</option>
                        <option value="bil">Bil</option>
                        <option value="baad">Båd</option>
                        <option value="bike">Bike</option>
                    </select>
                </div>

                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onOpret" >Opret ny artikel!</button>
                <!-- <button @click="onOpret">OPRET NY</button> -->
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        kategori: "",
        billede: ""
      }
    };
  },
  methods: {
    onBillede(event) {
      // console.log(event.target.files[0]);
      this.formData.billede = event.target.files[0];
    },
    onOpret() {
      if (this.formData.billede) {
        // console.log("Der er billede");
        const fd = new FormData();
        fd.append("billede", this.formData.billede);
        fd.append("kategori", this.formData.kategori);
        // console.log(fd);
        this.$store.dispatch("nySponsor", fd);
      } else {
        alert("Intet billede er valgt");
      }
    }
  },
  validations: {
    formData: {
      kategori: {
        required
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: "Oswald", sans-serif;
  color: rgb(53, 53, 53);
  font-size: 36px;
}

.opret-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.opret-sti {
  color: rgb(53, 53, 53);
}

.opret-sti span {
  color: rgb(230, 230, 230);
}

.opret-indhold {
  padding-top: 10px;
}

.opret-kategori input {
  cursor: pointer;
}

textarea,
input,
select {
  width: 100%;
  border: 2px rgb(240, 240, 240) solid;
  outline: none;
  border-radius: 3px;
  padding: 10px;
}

select {
  cursor: pointer;
}

textarea:focus,
input:focus {
  border: rgba(255, 192, 0, 0.5) solid 2px;
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
