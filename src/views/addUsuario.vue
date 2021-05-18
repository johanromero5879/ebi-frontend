<template>
  <div class="contuser">

<v-snackbar
      v-model="snackbar"
      absolute
      botton
      right
      color="success"
    >
      <span>Se ha registrado correctamente!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>

    <div class="titulouser">
      <v-icon dark left> mdi-account </v-icon>
      <h1>Registro de usuarios</h1>
    </div>

    

    <div class="objetosuser">
      <div class="formulariouser">
        <v-form
          class="forma"
          align="center"
          ref="form"
          @submit.prevent="submitUser"
          
        >
          <v-text-field
            dark
            v-model="usurio.nombreap"
            :rules="rules.nomapru"
            label="Nombres y Apellidos"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="usurio.cedula"
            :counter="10"
            :rules="rules.ccru"
            label="Cédula"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="usurio.direccion"
            :rules="rules.dirru"
            label="Dirección"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="usurio.telefono"
            :rules="rules.telru"
            label="Teléfono"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="usurio.correo"
            :rules="rules.corru"
            label="Correo electrónico"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="usurio.nombreusu"
            :rules="rules.nomusuru"
            label="Nombre de usuario"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="usurio.contras"
            :rules="rules.contrasru"
            label="Cree una contraseña"
            outlined
            required
          ></v-text-field>

          <v-select
            dark
            v-model="usurio.tipo"
            :items="items"
            :rules="rules.tiporu"
            label="Tipo de usuario"
            outlined
            aria-required=""
          ></v-select>

          <v-btn color="white"
          class="mr-4"
          outlined
          
          :disabled="!formIsValid"
          type="submitUser"
          >
            <v-icon left>mdi-content-save</v-icon>
            
            Guardar
          </v-btn>

          <v-btn 
          color="white"
          class="mr-4"
          outlined
          @click="resetFormUser"
          >
            <v-icon left>mdi-window-close</v-icon>
            Cancelar
          </v-btn>

<vr></vr>

          <v-btn color="white" class="mr-4" outlined @click="resetFormUser">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn>

          <v-btn color="white" outlined @click="resetFormUser">
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>
        </v-form>
      </div>
      <div class="tablamuestralib">
        <v-data-table
          :headers="titulosUsuarios"
          :items="datosUsuarios"
          item-key="name"
          class="elevation-1"
          :search="buscarUsu"
          v-model="selectedUsu"
          @click:row="ClickUsu"
        >

           <template slot="items" slot-scope="props">
          <tr @click="showAlert(props.item)">
          <td>{{ props.item.CodigoUsuario }}</td>
          <td class="text-xs-right">{{ props.item.NomApeUsu }}</td>
          <td class="text-xs-right">{{ props.item.ccUsu }}</td>
          <td class="text-xs-right">{{ props.item.DirecUsu }}</td>
          <td class="text-xs-right">{{ props.item.TelUsu }}</td>
          <td class="text-xs-right">{{ props.item.EmailUsu }}</td>
          <td class="text-xs-right">{{ props.item.NomUsu }}</td>
          <td class="text-xs-right">{{ props.item.TipUsu }}</td>
            </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
          No se encontraron resultados para "{{ buscarUsu }}".
        </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarUsu"
              label="Buscar usuarios"
              class="mx-4"
              append-icon="mdi-magnify"
              single-line
              hide-details
            ></v-text-field>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>


<style>
.contuser {
  /* background-color: white; */
  padding-top: 80px;
  padding-left: 40px;
  padding-right: 20px;
  box-sizing: border-box;
  display: block;
  justify-content: top;
  align-items: top;
  font-family: sans-serif;
}
.titulouser {
  /* background-color: hotpink; */
  display: flex;
  color: white;
  padding: 10px;
}
.objetosuser {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}
.formulariouser {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 27%;
  display: block;
  align-items: center;
}
</style>

<script>
export default {
  
  data(){
const defaultFormUser = Object.freeze({
        nombreap: '',
        cedula: '',
        direccion: '',
        telefono: '',
        correo: '',
        nombreusu: '', 
        tipo: '',
        contras: ''
      })

return{
form: Object.assign({}, defaultFormUser),
  rules:{
  nomapru: [(v) => !!v || "Este campo es obligatorio"],
  ccru: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>(v && v.length <= 10) ||
          "El código no puede tener más de 10 caracteres",
          (v) =>(v && v.length >= 6) ||
          "El código no puede tener menos de 6 caracteres"],
  dirru: [(v) => !!v || "Este campo es obligatorio"],
  telru: [(v) => !!v || "Este campo es obligatorio"],
  corru: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "El correo debe tener un formato válido"],
  nomusuru: [(v) => !!v || "Este campo es obligatorio"],
  contrasru: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => (v && v.length < 8) || "La contraseña es debil",],
  tiporu:[(v) => !!v || 'Esta selección es obligatoria']
  },

  usurio:{
        _id: '',
        nombreap: '',
        cedula: '',
        direccion: '',
        telefono: '',
        correo: '',
        nombreusu: '', 
        contras: '',
        tipo: ''
        

        },

        snackbar:false,
        defaultFormUser,
        items: ["Administrador", "Contador", "Operador", "Bodeguero"],
        selectedUsu:[],
        buscarUsu: '',
        titulosUsuarios: [
      {
        text: "Código",
        align: "start",
        value: "CodigoUsuario",
      },
      { text: "Nombres y Apellidos", value: "NomApeUsu" },
      { text: "Cédula", value: "ccUsu" },
      { text: "Direccion", value: "DirecUsu" },
      { text: "Teléfono", value: "TelUsu" },
      { text: "Correo", value: "EmailUsu" },
      { text: "Nombre de usuario", value: "NomUsu" },
      { text: "Tipo de usuario", value: "TipUsu" },
        ],
      datosUsuarios: [
      {
        CodigoUsuario: 1234567890,
        NomApeUsu: "Juan Sebastian Vicaña Barrios",
        ccUsu: 1105693247,
        DirecUsu: "mz 19 casa 6 balkanes",
        TelUsu: "3223055188",
        EmailUsu: "junsevicabarrios@gmail.com",
        NomUsu: "Sebas117",
        TipUsu: "Administrador",
      },
      {
        CodigoUsuario: 1234567890,
        NomApeUsu: "Sebastian Pachon Morales",
        ccUsu: 1105693265,
        DirecUsu: "no se xD",
        TelUsu: "9463218946",
        EmailUsu: "spacmor@gmail.com",
        NomUsu: "SebPac",
        TipUsu: "Administrador",
      },
    ]
}

  },
  

  
  computed: {
      formIsValid () {
        return (
      this.usurio.nombreap &&
      this.usurio.cedula &&
      this.usurio.direccion &&
      this.usurio.telefono &&
      this.usurio.correo &&
      this.usurio.nombreusu &&
      this.usurio.tipo
        )
      },
    },
  methods: {

      ClickUsu(item) {
      this.usurio.nombreap=item.NomApeUsu;
      this.usurio.cedula=item.ccUsu;
      this.usurio.direccion=item.DirecUsu;
      this.usurio.telefono=item.TelUsu;
      this.usurio.correo=item.EmailUsu;
      this.usurio.nombreusu=item.NomUsu;
      this.usurio.tipo=item.TipUsu;
      
      },

      resetFormUser () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submitUser () {
        this.snackbar = true
        this.resetFormUser()
      },

  },
};
</script>