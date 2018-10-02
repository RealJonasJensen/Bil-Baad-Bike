<template>
    <div>
        <p class="login-sti" >Forside <span>/ Login</span></p>
        <h1>LOGIN</h1>
        <div class="login-br"></div>
        <div class="login-indhold">
                    <div>
                        <p>E-mail</p>
                        <input v-model="email" type="text">
                        {{errors.loginEmail}}

                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" v-model="password">
                        {{errors.loginPassword}}
                    </div>
                <button @click="login" >Login</button>
        </div>
    </div>
</template>

<script>
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

.login-indhold p {
  font-weight: bold;
  font-size: 13px;
  padding-bottom: 3px;
  color: rgb(53, 53, 53);
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
  color: rgb(119, 119, 119);
  text-align: center;
  padding: 8px 25px;
  margin: 10px 0 50px;
  cursor: pointer;
  border: none;
  outline: none;
}

button:hover {
  background-color: rgb(128, 28, 28);
  color: rgb(240, 240, 240);
}
</style>
