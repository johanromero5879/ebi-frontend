<template>
  <div>
    <body>
      <div class="contenedor">
        <form class="form">
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
        </form>
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
  padding: 24px;
}

.contenedor {
  width: 1349px;
  height: 570px;
  border: 5px solid blue;
  box-sizing: border-box;
  background: url("/assets/night.jpg");
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
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
  },
  name: "Home",
};
</script>
