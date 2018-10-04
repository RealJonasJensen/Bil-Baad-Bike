<template>
    <div>
        <p class="register-sti" >Admin <span>/ Registrer</span></p>
        <h1>Registrer</h1>
        <div class="register-br"></div>
        <div class="register-indhold">
            <div>
                <p>Navn</p>
                <input :class="{invalid: $v.formData.navn.$error}" @blur="$v.formData.navn.$touch()"  type="text" v-model="formData.navn">
            </div>
            <div>
                <p>E-mail</p>
                <input :class="{invalid: $v.formData.email.$error}" @blur="$v.formData.email.$touch()"  type="text" v-model="formData.email">
            </div>
            <div>
                <p>Tekst</p>
                <input :class="{invalid: $v.formData.tekst.$error}" @blur="$v.formData.tekst.$touch()" type="text" v-model="formData.tekst">
            </div>
            <div>
                <p>Password (Minimum 6 karakterer)</p>
                <input :class="{invalid: $v.formData.password.$error}" @blur="$v.formData.password.$touch()" type="password" v-model="formData.password">
            </div>
            <div>
                <p>Gentag Password</p>
                <input :class="{invalid: $v.formData.password2.$error}" @blur="$v.formData.password2.$touch()" type="password" v-model="formData.password2">
            </div>
            <div>
                <p>Admin eller Redaktør rettigheder</p>
                <div class="register-type">
                    <select :class="{invalid: $v.formData.type.$error}" @blur="$v.formData.type.$touch()" v-model="formData.type" @change="formData.redaktion = []" >
                        <option disabled value=""> -- Vælg rettigheder --</option>
                        <option value="redaktoer">Redaktør</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
            <div v-if="formData.type == 'redaktoer'" >
                <p>Redaktør for:</p>
                <div class="register-redaktion">
                    <input type="checkbox" id="bil" value="bil" v-model="formData.redaktion">
                    <input type="checkbox" id="baad" value="baad" v-model="formData.redaktion">
                    <input type="checkbox" id="bike" value="bike" v-model="formData.redaktion">
                    <label for="bil">Biler</label>
                    <label for="baad">Både</label>
                    <label for="bike">Bike's</label>
                </div>
            </div>
            <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onRegister" >Registrer ny profil!</button>
        </div>
    </div>
</template>

<script>
import {
  required,
  email,
  sameAs,
  requiredUnless,
  minLength
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        navn: "",
        email: "",
        password: "",
        password2: "",
        type: "",
        redaktion: [],
        tekst: ""
      }
    };
  },
  methods: {
    onRegister() {
      console.log(this.formData);
      this.$store.dispatch("register", this.formData);
    }
  },
  validations: {
    formData: {
      navn: {
        required
      },
      email: {
        email,
        required
      },
      password: {
        required,
        minLen: minLength(6)
      },
      password2: {
        required,
        sameAs: sameAs("password")
      },
      redaktion: {
        required: requiredUnless(vm => {
          return vm.type === "admin";
        })
      },
      type: {
        required
      },
      tekst: {
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

.register-type {
  display: flex;
}

.register-redaktion {
  padding: 10px 0;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

p {
  margin: 10px 0;
}

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
