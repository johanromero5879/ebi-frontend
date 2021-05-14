<template>
  <div>
    <body>
      <div class="contenedor">
        <v-form class="form">
          <v-text-field
            label="Número de documento"
            placeholder="Número de documento"
            prepend-icon="mdi-account"
            color=#FFFFFF
            solo
          ></v-text-field>
          <v-text-field
            solo
            prepend-icon="mdi-account-key"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            placeholder="Contraseña"
            color=#FFFFFF
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn color="primary">Click me</v-btn>
        </v-form>
      </div>
    </body>
  </div>
</template>
<style>
.form {
  /* background-color: white; */
  opacity: 1 !important;
  width: 700px;
  height: 500px;
  padding: 48px;
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
  .form{
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
  }
};
</script>
