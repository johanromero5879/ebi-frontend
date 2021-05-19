<template>
  <div class="contuser">
    <v-snackbar v-model="snackbar" absolute botton right color="success">
      <span>Se ha registrado correctamente!</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
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
            v-model="datos.persona.nombres"
            :rules="rules.nomapru"
            label="Nombres"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="datos.persona.apellidos"
            :rules="rules.nomapru"
            label="Apellidos"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="datos.persona.n_documento"
            :counter="10"
            :rules="rules.ccru"
            label="Cédula"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="datos.persona.telefono"
            :rules="rules.telru"
            label="Teléfono"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="datos.persona.correo"
            :rules="rules.corru"
            label="Correo electrónico"
            outlined
            required
          ></v-text-field>

          <!-- <v-text-field
            dark
            v-model="datos.usuario.contrasena"
            :rules="rules.contrasru"
            label="Cree una contraseña"
            outlined
            required
          ></v-text-field> -->

          <v-select
            dark
            v-model="datos.usuario.tipo"
            :items="items"
            :rules="rules.tiporu"
            label="Tipo de usuario"
            outlined
            aria-required=""
          ></v-select>

          <v-btn
            color="white"
            class="mr-4"
            outlined
            :disabled="!formIsValid"
            type="submitUser"
          >
            <template v-if="usuario_id == ''">
              <v-icon left>mdi-content-save</v-icon>
              Guardar
            </template>

            <template v-else>
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </template>
            
          </v-btn>

          <v-btn color="white" class="mr-4" outlined @click="resetFormUser">
            <v-icon left>mdi-window-close</v-icon>
            Cancelar
          </v-btn>

          <br>

          <!-- <v-btn color="white" class="mr-4" outlined @click="resetFormUser">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn> -->

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
              <td class="text-xs-right">{{ props.item.nombres }}</td>
              <td class="text-xs-right">{{ props.item.apellidos }}</td>
              <td class="text-xs-right">{{ props.item.n_documento }}</td>
              <td class="text-xs-right">{{ props.item.telefono }}</td>
              <td class="text-xs-right">{{ props.item.correo }}</td>
              <td class="text-xs-right">{{ props.item.tipo }}</td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >
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
import { SERVER_URL } from "../config.json";

export default {
  data() {
    const defaultFormUser = Object.freeze({
      nombres: "",
      apellidos: "",
      n_documento: "",
      telefono: "",
      correo: "",
      tipo: "",
      contrasena: "",
    });

    return {
      form: Object.assign({}, defaultFormUser),
      rules: {
        nomapru: [(v) => !!v || "Este campo es obligatorio"],
        ccru: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            (v && v.length <= 10) ||
            "El código no puede tener más de 10 caracteres",
          (v) =>
            (v && v.length >= 6) ||
            "El código no puede tener menos de 6 caracteres",
        ],
        dirru: [(v) => !!v || "Este campo es obligatorio"],
        telru: [(v) => !!v || "Este campo es obligatorio"],
        corru: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            /.+@.+\..+/.test(v) || "El correo debe tener un formato válido",
        ],
        nomusuru: [(v) => !!v || "Este campo es obligatorio"],
        // contrasru: [
        //   (v) =>  !!v || "Este campo es obligatorio",
        //   (v) =>  v && v.length < 8 || "La contraseña es debil",
        // ],
        tiporu: [(v) => !!v || "Esta selección es obligatoria"],
      },

      usuario_id: "",
      datos: {
        usuario: {
          tipo: ""
        },
        persona: {
          nombres: "",
          apellidos: "",
          n_documento: "",
          telefono: "",
          correo: ""
        }
      },

      snackbar: false,
      defaultFormUser,
      items: ["Administrador", "Contador", "Operador", "Bodeguero"],
      selectedUsu: [],
      buscarUsu: "",
      titulosUsuarios: [

        { text: "Nombres", value: "nombres"},
        { text: "Apellidos", value: "apellidos" },
        { text: "Cédula", value: "n_documento" },
        { text: "Teléfono", value: "telefono" },
        { text: "Correo", value: "correo" },
        { text: "Tipo de usuario", value: "tipo" },
      ],
      datosUsuarios: [],
    };
  },

  computed: {
    formIsValid() {
      return (
        this.datos.persona.nombres &&
        this.datos.persona.apellidos &&
        this.datos.persona.n_documento &&
        this.datos.persona.telefono &&
        this.datos.persona.correo &&
        this.datos.usuario.tipo
      );
    },
  },
  methods: {
    ClickUsu(item) {
      this.usuario_id = item._id
      this.datos.persona.nombres = item.nombres;
      this.datos.persona.apellidos = item.apellidos;
      this.datos.persona.n_documento = item.n_documento;
      this.datos.persona.telefono = item.telefono;
      this.datos.persona.correo = item.correo;
      this.datos.usuario.tipo = item.tipo;
    },

    resetFormUser() {
      this.usuario_id = ""
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    async submitUser() {
      if(this.$refs.form.validate()){
        
        try{
          let url = `${ SERVER_URL }/api/usuarios`
          let metodo = 'POST'

          if(this.usuario_id){
            url = `${url}/${this.usuario_id}`
            metodo = 'PUT'
          }

          console.log(JSON.parse(JSON.stringify(this.datos)))
          const response = await fetch(url, {
            method: metodo,
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(this.datos)
          })

          const data = await response.json()

          if(data.error)
            throw data.error.message

          this.resetFormUser()
          this.obtenerUsuarios()
          this.snackbar = true;
          
        }catch(ex){
          console.log(ex)
        }
        
       
      }
    },
    async obtenerUsuarios(){
      
      const response = await fetch(`${SERVER_URL}/api/usuarios`)
      const usuarios = await response.json()
      this.datosUsuarios = []
      for(const usuario of usuarios){
        const { persona } = usuario
        this.datosUsuarios.push({
          _id: usuario._id,
          nombres: persona.nombres,
          apellidos: persona.apellidos,
          n_documento: persona.n_documento,
          telefono: persona.telefono,
          correo: persona.correo,
          tipo: usuario.tipo,
        })
      }

    }
  },
  beforeMount(){
    this.obtenerUsuarios()
  }
};
</script>