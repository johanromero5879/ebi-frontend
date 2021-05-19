<template>
  <div class="contenedor">
    <v-snackbar
      v-model="snack.show"
      absolute
      botton
      right
      color="error"
    >
      <span>{{ snack.message }}</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form class="form" align="center">
      <div align="center">
        <v-img src="~@/assets/img/logo_obj.png" width="200px"></v-img>
        <br />
        <br />
      </div>
      <div align="center">
        <v-text-field
          dark
          label="Número de documento"
          append-icon="mdi-account"
          color="#FFCC80"
          outlined
          v-model="usuario.n_documento"
        ></v-text-field>
      </div>
      <div align="center">
        <v-text-field
          dark
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Contraseña"
          placeholder="Contraseña"
          color="#FFCC80"
          outlined
          @click:append="show1 = !show1"
          v-model="usuario.contrasena"
        ></v-text-field>
      </div>
      <v-btn color="#FFFFFF" outlined @click="login"> Iniciar sesión </v-btn>
    </v-form>
  </div>
</template>
<style>
.form {
  /* background-color: white; */
  opacity: 1 !important;
  width: 500px;
  height: 463px;
  padding: 30px;
}

.contenedor {
  min-height: 100vh;
  box-sizing: border-box;
  background: url("~@/assets/img/loginbg.png");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 500px) {
  .form {
    padding: 16px;
  }
}
</style>

<script>
import { SERVER_URL } from "../config.json";

export default {
  data() {
    return {
      usuario: {
        n_documento: "",
        contrasena: "",
      },
      show1: false,
      rules: {
        required: (value) => !!value || "Ingrese la contraseña",
        emailMatch: () => `El usuario o la contraeña son incorrectos`,
      },
      snack: {
        show: false,
        message: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch(`${SERVER_URL}/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.usuario),
        });

        
        const data = await response.json();
        
        if(data.error)
          throw data.message
        
        localStorage.setItem("usuario", JSON.stringify(data));
        this.$router.push({ path: "/home" });
      } catch (ex) {
        this.snack.message = ex
        this.snack.show = true
      }
    },
  },
};
</script>
