<template>
    <div>
        <p class="register-sti" >{{bruger.type === "admin" ? "Admin" : "Redaktør"}} / Rediger / <span>{{redaktoer.navn}}</span></p>
        <h1>Rediger {{redaktoer.navn}}</h1>
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
                <textarea :class="{invalid: $v.formData.tekst.$error}" @blur="$v.formData.tekst.$touch()" type="text" v-model="formData.tekst"></textarea>
            </div>
            <div v-if="bruger.type === 'admin'" >
            <div>
              
                <p>Rettigheder</p>
                <div class="register-type">
                    <select :class="{invalid: $v.formData.type.$error}" @blur="$v.formData.type.$touch()" v-model="formData.type" @change="formData.type === 'admin' ? formData.redaktion = [] : null" >
                        <option value="" selected disabled>--Vælg Rettigheder--</option>
                        <option value="admin">Admin</option>
                        <option value="redaktoer">Redaktør</option>
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
            </div>
            <button :class="{validKnap: !$v.$invalid}" @click="onRediger" :disabled="$v.$invalid">Rediger profil!</button>
        </div>
    </div>
</template>

<script>
import { required, email, requiredUnless } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        navn: "",
        email: "",
        type: "",
        redaktion: [],
        tekst: ""
      }
    };
  },
  methods: {
    onRediger() {
      const data = { ...this.formData, id: this.$route.path.split("/")[3] };
      this.$store.dispatch("opdaterRedaktoer", data);
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
  watch: {
    redaktoer: {
      handler: function event() {
        //console.log("Her");
        if (
          !this.formData.navn &&
          !this.formData.email &&
          !this.formData.type
        ) {
          this.formData.navn = this.redaktoer.navn;
          this.formData.email = this.redaktoer.email;
          this.formData.redaktion = this.redaktoer.redaktion;
          this.formData.type = this.redaktoer.type;
          this.formData.tekst = this.redaktoer.tekst;
        }
      }
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
  },
  created() {
    // console.log();
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
select,
textarea {
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
