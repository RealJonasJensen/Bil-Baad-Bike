<template>
    <div>
        <p class="login-sti" >Forside <span>/ Login</span></p>
        <h1>LOGIN</h1>
        <div class="login-br"></div>
        <div class="login-indhold">
                    <div>
                        <p class="login-info" >E-mail</p>
                        <input :class="{invalid: $v.email.$error}" @blur="$v.email.$touch()" v-model="email" type="text">
                        <p class="login-error">
                            {{errors.loginEmail}}
                        </p>

                    </div>
                    <div>
                        <p class="login-info">Password</p>
                        <input :class="{invalid: $v.password.$error}" @blur="$v.password.$touch()" type="password" v-model="password">
                        <p class="login-error">
                            {{errors.loginPassword}}
                        </p>
                    </div>
                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="login" >Login</button>
        </div>
    </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", data);
    }
  },
  computed: {
    errors() {
      return this.$store.getters.loginErrors;
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required
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

.login-br {
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 53);
}

.login-sti {
  color: rgb(53, 53, 53);
}

.login-sti span {
  color: rgb(230, 230, 230);
}

.login-indhold {
  padding-top: 10px;
}

.login-info {
  font-weight: bold;
  font-size: 13px;
  padding-bottom: 3px;
  color: rgb(53, 53, 53);
}

.login-error {
  color: rgb(255, 83, 83);
  padding: 10px 0;
  font-size: 13px;
}

input {
  width: 100%;
  border: 2px rgb(240, 240, 240) solid;
  outline: none;
  border-radius: 3px;
  padding: 10px;
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
