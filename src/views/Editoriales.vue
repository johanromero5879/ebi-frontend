<template>
  <div class="contEditoriales">
    <div class="tituloEd">
      <v-icon dark left>mdi-library</v-icon>
      <h1>Registro de editoriales</h1>
    </div>

    <v-snackbar v-model="snackbar" absolute botton right color="success">
      <span>Se ha registrado correctamente!</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>

    <div class="objetosEd">
      <div class="formularEd">
        <v-form
          class="forma"
          align="center"
          ref="formeditoriales"
          @submit.prevent="submitEd"
        >
          <v-text-field
            dark
            v-model="editorial.nombre"
            :rules="rules.nomruEd"
            label="Nombre"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="editorial.direccion"
            :rules="rules.dirruEd"
            label="Dirección"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="editorial.telefono"
            :rules="rules.telruEd"
            label="Teléfono"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="editorial.correo"
            :rules="rules.corruEd"
            label="Correo electrónico"
            outlined
            required
          ></v-text-field>

          <br />

          <v-btn
            color="white"
            class="mr-4"
            outlined
            :disabled="!formIsValid"
            type="submitEd"
          >
            <template v-if="!this.editorial_id">
              <v-icon left>mdi-content-save</v-icon>
              Guardar
            </template>
            <template v-else>
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </template>
          </v-btn>

          <!-- <v-btn color="white" class="mr-4" outlined @click="resetFormEd">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn> -->

          <v-btn color="white" class="mr-4" outlined @click="resetFormEd">
            <v-icon left>mdi-window-close</v-icon>
            Cancelar
          </v-btn>

          <v-btn
            v-if="usuario.tipo == 'admin'"
            color="white"
            outlined
            @click="resetFormEd"
          >
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestraEd">
        <v-data-table
          :headers="titulosEd"
          :items="datosEd"
          item-key="name"
          class="elevation-1"
          :search="buscarEd"
          v-model="selectedEd"
          @click:row="handleClickEd"
        >
          <template slot="items" slot-scope="props">
            <tr @click="showAlert(props.item)">
              <td class="text-xs-right">{{ props.item._id }}</td>
              <td class="text-xs-right">{{ props.item.nombre }}</td>
              <td class="text-xs-right">{{ props.item.direccion }}</td>
              <td class="text-xs-right">{{ props.item.telefono }}</td>
              <td class="text-xs-right">{{ props.item.correo }}</td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >
            No se encontraron resultados para "{{ buscarEd }}".
          </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarEd"
              label="Buscar editoriales"
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
.contEditoriales {
  /* background-color: white; */
  padding-top: 80px;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  display: block;
  justify-content: top;
  align-items: top;
  font-family: sans-serif;
}
.tituloEd {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}
.objetosEd {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}
.formularEd {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
}
.tablamuestraEd {
  /* background-color: green; */
  padding-top: 0px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 70%;
}
</style>

<script>
import { SERVER_URL } from "../config.json";
import { http } from "../utils";

export default {
  data() {
    const defaultFormEd = Object.freeze({
      nombre: "",
      direccion: "",
      telefono: "",
      correo: "",
    });

    return {
      usuario: {
        tipo: "xd",
      },
      formeditoriales: Object.assign({}, defaultFormEd),
      rules: {
        nomruEd: [(v) => !!v || "Este campo es obligatorio"],
        dirruEd: [(v) => !!v || "Este campo es obligatorio"],
        telruEd: [(v) => !!v || "Este campo es obligatorio"],
        corruEd: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            /.+@.+\..+/.test(v) || "El correo debe tener un formato válido",
        ],
      },
      snackbar: false,
      defaultFormEd,
      selectedEd: [],
      buscarEd: "",
      titulosEd: [
        { text: "Código", value: "_id" },
        { text: "Nombre", value: "nombre" },
        { text: "Dirección", value: "direccion" },
        { text: "Teléfono", value: "telefono" },
        { text: "Correo Electrónico", value: "correo" },
      ],
      datosEd: [],
      editorial_id: '',
      editorial: {
        nombre: '',
        direccion: '',
        telefono: '',
        correo: ''
      }
    };
  },

  /*...................................*/
  computed: {
    formIsValid() {
      return (
        this.editorial.nombre &&
        this.editorial.direccion &&
        this.editorial.telefono &&
        this.editorial.correo
      );
    },
  },

  /*...................................*/
  methods: {
    handleClickEd(item) {
      this.editorial_id = item._id;
      this.editorial.nombre = item.nombre;
      this.editorial.direccion = item.direccion;
      this.editorial.telefono = item.telefono;
      this.editorial.correo = item.correo;
    },
    resetFormEd() {
      this.editorial_id = ''
      this.formeditoriales = Object.assign({}, this.defaultForm);
      this.$refs.formeditoriales.reset();
    },
    async submitEd() {
      if(this.$refs.formeditoriales.validate()){
        try{
          let url = `${ SERVER_URL }/api/editoriales`
          let metodo = 'POST'

          if(this.editorial_id){
            url += `/${this.editorial_id}`
            metodo = 'PUT'
          }

          const data = await http(url, metodo, this.editorial)

          if(data.error)
            throw data.error.message

          
          this.resetFormEd();
          this.obtenerEditoriales()
          this.snackbar = true;
          
        }catch(ex){
          console.log(ex)
        }
      }
      
    },
    async obtenerEditoriales(){
      const editoriales = await http(`${SERVER_URL}/api/editoriales`)

      this.datosEd = []
      for(const editorial of editoriales){
        this.datosEd.push(editorial)
      }
    }
  },
  beforeMount(){
    this.obtenerEditoriales()
  }
};
</script>