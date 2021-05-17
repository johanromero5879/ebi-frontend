<template>
  <div>
    <body>
      <div class="contenedor">
        <v-form class="form"  align="center">
          <div align="center">
            <v-img src="~@/assets/img/logo_obj.png" width="200px"></v-img>
            <br>
            <br>
          </div>
          <div align="center">
            <v-text-field
              dark
              label="Número de documento"
              append-icon="mdi-account"
              color="#FFCC80"
              outlined
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
            ></v-text-field>
          </div>
          <v-btn
            color="#FFFFFF"
            outlined
          >
            Iniciar sesión
          </v-btn>
        </v-form>
      </div>
    </body>
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
export default {
  data() {
    return {
      show1: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Ingrese la contraseña",
        emailMatch: () => `El usuario o la contraeña son incorrectos`,
      },
    };
  },
};
</script>
