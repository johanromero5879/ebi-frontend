<template>
  <div>
    <body>
      <div class="contenedor">
        <v-form class="form">
          <v-text-field
            label="Usuario"
            prepend-icon="mdi-account"
            filled
          ></v-text-field>
          <v-text-field
            filled
            prepend-icon="mdi-account-key"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
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
  background-color: white;
  opacity: 1 !important;
  width: 700px;
  height: 500px;
  padding: 48px;
}

.contenedor {
  min-height: 100vh; 
  box-sizing: border-box;
  background: url("~@/assets/img/ebi_background.png") no-repeat;
  background-size: 100% 100%;
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
        required: (value) => !!value || "Ingrese su contraseña",
        emailMatch: () => `El usuario o la contraeña son incorrectos`,
      },
    };
  }
};
</script>
