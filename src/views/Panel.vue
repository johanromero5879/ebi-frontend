<template>
  
</template>




<template>
  <div class="contenedorPanel">
    
        <div align="center">
            <v-text-field
            v-model="nombresyapellidos"
            :rules="Reglasnya"
            label="Nombres y Apellidos"
            required
            color=#FFCC80
          ></v-text-field>

            <br>
          
            <v-text-field
            v-model="cedula"
            :rules="Reglascc"
            label="Cedula"
            :counter="10"
            required
          ></v-text-field>

          <br>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <br>
          
        <v-select
          :items="items"
          label="Tipo de usuario"
        ></v-select>
        <br>
        <v-btn color="#FFFFFF" outlined
            >
              Guardar
            </v-btn>

            <v-btn color="#FFFFFF" outlined
            >
              Editar
            </v-btn>

            <v-btn color="#FFFFFF" outlined
            >
              Borrar
            </v-btn>
          </div>
          
      
  </div>
</template>


<style>
.formPanel {
  background-color: white;
  opacity: 1 !important;
  width: 500px;
  height: 400px;
  padding: 30px;
}
.contenedorPanel {
  min-height: 100vh; 
  box-sizing: border-box;
  background: transparent;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: top;
  align-items: top;
}

@media screen and (max-width: 500px) {
  .form {
    padding: 16px;
  }
}
</style>

<script>
  export default {
    data: () => ({
      items: ['Administrador', 'Contador', 'Regular', 'Buzz'],
       valid: false,
      nombresyapellidos: '',
      Reglasnya: [
        v => !!v || 'Campo Obligatorio',
      ],
      cedula: '',
      Reglascc: [
        v => !!v || 'Campo Obligatorio',
        v => v.length <= 10 || 'Cedula no valida',
      ],
      
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
  }
</script>