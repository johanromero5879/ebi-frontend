<template>
  
  <div>
 <body>  
<div class='contenedor'>
  
  
<div class="grid-item">
    <v-container fluid>
      <v-row>
        
        <v-col
          cols="12"
          sm="6"
          md="5"
        >
          <v-text-field
            label="Usuario"
            prepend-icon="mdi-account"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
  <div class="grid-item2">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="20"
          md="5"
        >
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
        </v-col>

         </v-row>
    </v-container>
    </div>
 </div>
 </body>
 </div>
  
</template>




<style>
body{

}
.contenedor { 
width: 1349px;
height: 570px;
border: 5px solid blue;
box-sizing: border-box;
background:greenyellow ;
}

.grid-item {
  padding-top: 300px;
  padding-right: 1px;
  padding-bottom: 0px;
  padding-left: 500px;
  background: transparent ;
}
.grid-item2 {
  
  padding-top: 1px;
  padding-right: 1px;
  padding-bottom: 50px;
  padding-left: 500px;
  background:transparent ;
}
</style>

<script>

  export default {
    
     data () {
      return {
        show1: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Ingrese su contraseña',
          emailMatch: () => (`El usuario o la contraeña son incorrectos`),
        },
      }
    },
    name: 'Home'
  }
</script>
