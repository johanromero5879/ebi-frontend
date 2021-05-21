<template>
  <div class="contAlmacenes">
    <div class="titulo">
      <v-icon dark left>mdi-store</v-icon>
      <h1>Registro de almacenes</h1>
    </div>
    <v-snackbar v-model="snackbar" absolute botton right color="success">
      <span>Se ha registrado correctamente!</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>
    <div class="objetos">
      <div class="formular">
        <v-form
          class="forma"
          align="center"
          ref="formAlm"
          @submit.prevent="submitAlm"
        >
          <v-text-field
            dark
            v-model="almacen.nombre"
            :rules="rules.nomru"
            label="Nombre"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="almacen.direccion"
            :rules="rules.dirru"
            label="Dirección"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="almacen.telefono"
            :rules="rules.telru"
            label="Teléfono"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="almacen.correo"
            :rules="rules.corru"
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
            type="submitAlm"
          >
            <template v-if="!almacen_id">
              <v-icon left>mdi-content-save</v-icon>
              Guardar
            </template>
            <template v-else>
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </template>
          </v-btn>

          <v-btn color="white" class="mr-4" outlined @click="resetFormAlm">
            <v-icon left>mdi-window-close</v-icon>
            Cancelar
          </v-btn>

          <!-- <v-btn color="white" class="mr-4" outlined @click="resetFormAlm">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn> -->

          <v-btn
            v-if="usuario.tipo == 'admin'"
            color="white"
            outlined
            @click="resetFormAlm"
          >
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestra">
        <v-data-table
          :headers="titulosAl"
          :items="datosAl"
          item-key="name"
          class="elevation-1"
          :search="buscarAlm"
          v-model="selectedAlm"
          @click:row="ClickAlm"
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
            No se encontraron resultados para "{{ buscarAlm }}".
          </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarAlm"
              label="Buscar almacenes"
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
.contAlmacenes {
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

.titulo {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}

.objetos {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formular {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
}

.tablamuestra {
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
    const defaultFormAlm = Object.freeze({
      nombre: "",
      direccion: "",
      telefono: "",
      correo: "",
    });

    return {
      formAlm: Object.assign({}, defaultFormAlm),
      rules: {
        nomru: [(v) => !!v || "Este campo es obligatorio"],
        dirru: [(v) => !!v || "Este campo es obligatorio"],
        telru: [(v) => !!v || "Este campo es obligatorio"],
        corru: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            /.+@.+\..+/.test(v) || "El correo debe tener un formato válido",
        ],
      },

      almacen_id: "",
      almacen: {
        nombre: "",
        direccion: "",
        telefono: "",
        correo: "",
      },

      snackbar: false,
      defaultFormAlm,
      usuario: {
        tipo: "xd",
      },
      selectedAlm: [],
      buscarAlm: "",

      titulosAl: [
        { text: "Código", value: "_id" },
        { text: "Nombre", value: "nombre" },
        { text: "Dirección", value: "direccion" },
        { text: "Teléfono", value: "telefono" },
        { text: "Correo Electrónico", value: "correo" },
      ],
      datosAl: [],
    };
  },

  computed: {
    formIsValid() {
      return (
        this.almacen.nombre &&
        this.almacen.direccion &&
        this.almacen.telefono &&
        this.almacen.correo
      );
    },
  },

  methods: {
    ClickAlm(item) {
      this.almacen_id = item._id
      this.almacen.nombre = item.nombre;
      this.almacen.direccion = item.direccion;
      this.almacen.telefono = item.telefono;
      this.almacen.correo = item.correo;
    },

    resetFormAlm() {
      this.almacen_id = ''
      this.formAlm = Object.assign({}, this.defaultForm);
      this.$refs.formAlm.reset();
    },
    async submitAlm() {
      if(this.$refs.formAlm.validate()){
        let url = `${ SERVER_URL }/api/almacenes`
        let metodo = 'POST'

        if(this.almacen_id){
          url += `/${this.almacen_id}`
          metodo = 'PUT'
        }

        try{
          const data = await http(url, metodo, this.almacen)
          if(data.error)
            throw data.message

          this.resetFormAlm();
          this.obtenerAlmacenes()
          this.snackbar = true;
        }catch(ex){
          console.log(ex)
        }
        
      }
    },
    async obtenerAlmacenes(){
      const almacenes = await http(`${SERVER_URL}/api/almacenes`)
      this.datosAl = []
      for(const almacen of almacenes){
        this.datosAl.push(almacen)
      }
    }
  },

  beforeMount(){
    this.obtenerAlmacenes()
  }
};
</script>
