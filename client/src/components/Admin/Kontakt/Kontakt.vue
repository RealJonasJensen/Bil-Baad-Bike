<template>
    <div>
        <p class="admin-sti" >Admin / <span>Kontakt</span></p>
        <h1>Rediger Kontakt</h1>
        <div class="admin-br"></div>
        <div class="admin-indhold">
            <div>
                <p>Adresse</p>
                <input :class="{invalid: $v.formData.adresse.$error}" @blur="$v.formData.adresse.$touch()" v-model="formData.adresse" type="text">
            </div>
            <div>
                <p>Postkode</p>
                <input :class="{invalid: $v.formData.postkode.$error}" @blur="$v.formData.postkode.$touch()" v-model="formData.postkode" type="text" >
            </div>
            <div>
                <p>Land</p>
                <input :class="{invalid: $v.formData.land.$error}" @blur="$v.formData.land.$touch()" v-model="formData.land" type="text" >
            </div>
            <div>
                <p>Telefon</p>
                <input :class="{invalid: $v.formData.telefon.$error}" @blur="$v.formData.telefon.$touch()" v-model="formData.telefon" type="text" >
            </div>
            <div>
                <p>Fax</p>
                <input :class="{invalid: $v.formData.fax.$error}" @blur="$v.formData.fax.$touch()" v-model="formData.fax" type="text" >
            </div>
            <div>
                <p>E-mail</p>
                <input :class="{invalid: $v.formData.email.$error}" @blur="$v.formData.email.$touch()" v-model="formData.email" type="text" >
            </div>
            <!-- <button>Rediger</button> -->
                <button :class="{validKnap: !$v.$invalid}" :disabled="$v.$invalid" @click="onRediger" >Rediger</button>
        </div>
    </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        adresse: "",
        postkode: "",
        land: "",
        telefon: "",
        fax: "",
        email: ""
      }
    };
  },
  methods: {
    onRediger() {
      this.$store.dispatch("opdaterKontakt", this.formData);
    },
    setData() {
      if (
        !this.formData.adresse &&
        !this.formData.postkode &&
        !this.formData.land &&
        !this.formData.telefon &&
        !this.formData.fax &&
        !this.formData.email
      ) {
        this.formData.adresse = this.kontakt.adresse;
        this.formData.postkode = this.kontakt.postkode;
        this.formData.land = this.kontakt.land;
        this.formData.telefon = this.kontakt.telefon;
        this.formData.fax = this.kontakt.fax;
        this.formData.email = this.kontakt.email;
      }
    }
  },
  computed: {
    kontakt() {
      return this.$store.getters.getKontakt;
    }
  },
  validations: {
    formData: {
      adresse: {
        required
      },
      postkode: {
        required
      },
      land: {
        required
      },
      telefon: {
        required
      },
      fax: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  beforeUpdate() {
    this.setData();
  },
  created() {
    this.$store.dispatch("hentKontakt");
    this.setData();
    console.log("update");
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

.admin-indhold {
  padding: 10px 0;
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
