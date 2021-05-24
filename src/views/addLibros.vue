<template>
  <div class="contLibros">
    <div class="titulolib">
      <v-snackbar v-model="snackbar" absolute botton right color="success">
        <span>Se ha registrado correctamente!</span>
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
      </v-snackbar>

      <v-icon dark left> mdi-book-open-blank-variant </v-icon>
      <h1>Registro de libros</h1>
    </div>
    <div class="objetoslib">
      <div class="formulariolib">
        <v-form
          class="forma"
          align="center"
          ref="formLib"
          @submit.prevent="submitLib"
        >
          <v-text-field
            dark
            v-model="libro.isbn"
            :counter="15"
            :rules="rules.codisbru"
            label="Código ISBN"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="libro.titulo"
            :rules="rules.tituloru"
            label="Titulo del Libro"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="libro.autor"
            :rules="rules.autoru"
            label="Autor"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="libro.categoria"
            :rules="rules.cateru"
            label="Categoria"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="libro.tema"
            :rules="rules.temru"
            label="Tema"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="libro.anio"
            :rules="rules.anuru"
            label="Año"
            outlined
            required
          ></v-text-field>
          <v-select
            dark
            v-model="libro.editorial"
            :items="editoriales"
            item-text="nombre"
            item-value="_id"
            :rules="rules.editorialru"
            label="Editorial"
            outlined
            aria-required=""
          ></v-select>

          <br />

          <v-btn
            color="white"
            class="mr-4"
            outlined
            :disabled="!formIsValid"
            type="submitLib"
          >
            <template v-if="!libro_id">
              <v-icon left>mdi-content-save</v-icon>
              Guardar
            </template>
            <template v-else>
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </template>
          </v-btn>

          <v-btn color="white" class="mr-4" outlined @click="resetFormLib">
            <v-icon left>mdi-window-close</v-icon>
            Cancelar
          </v-btn>

          <!-- <v-btn color="white" class="mr-4" outlined @click="resetFormLib">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn> -->

          <v-btn color="white" outlined @click="resetFormLib">
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>

          <br />
          <br />

          <v-btn color="white" outlined v-if="libro_id" @click="mostrarRef">
            <v-icon left>mdi-file-eye</v-icon>
            Ver referencias
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestralib">
        <v-data-table
          :headers="tituloslib"
          :items="datoslib"
          item-key="name"
          class="elevation-1"
          @click:row="handleClickLib"
          :search="buscarlibro"
          sort-by="titulo"
          v-model="selectedLib"
        >
          <template slot="items" slot-scope="props">
            <tr @click="showAlert(props.item)">
              <td class="text-xs-right">{{ props.item.isbn }}</td>
              <td class="text-xs-right">{{ props.item.titulo }}</td>
              <td class="text-xs-right">{{ props.item.autor }}</td>
              <td class="text-xs-right">{{ props.item.categoria }}</td>
              <td class="text-xs-right">{{ props.item.tema }}</td>
              <td class="text-xs-right">{{ props.item.anio }}</td>
              <td class="text-xs-right">{{ props.item.editorial.nombre }}</td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >
            No se encontraron resultados para "{{ buscarlibro }}".
          </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarlibro"
              label="Buscar libros"
              class="mx-4"
              append-icon="mdi-magnify"
              single-line
              color="orange"
              hide-details
            ></v-text-field>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-overlay
      align="center"
      class="overlref"
      :value="overlayferen"
      opacity="0.7"
    >
      <v-snackbar v-model="snackbarRef" absolute top right color="success">
        <span>Se ha registrado correctamente!</span>
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
      </v-snackbar>

      <div class="formulariorefer">
        <v-form
          class="forma"
          align="center"
          ref="formRef"
          @submit.prevent="submitRef"
        >
          <v-text-field
            light
            v-model="referencia.nombre"
            :rules="rules.tituloref"
            label="Nombre referencia"
            outlined
            required
          ></v-text-field>

          <v-text-field
            light
            v-model="referencia.precioCosto"
            :rules="rules.costoru"
            label="Costo"
            outlined
            required
          ></v-text-field>

          <v-btn
            color="black"
            class="mr-4"
            outlined
            type="submitRef"
          >
            <template v-if="!ref_id">
              <v-icon left>mdi-content-save</v-icon>
              Guardar
            </template>
            <template v-else>
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </template>
          </v-btn>

          <v-btn color="black" outlined @click="resetFormRef">
            <v-icon left>mdi-delete</v-icon>
            Cancelar
          </v-btn>
        </v-form>
      </div>

      <br />

      <div class="tablamuestraref">
        <v-data-table
          light
          :hide-default-footer="true"
          disable-pagination
          height="240px"
          :headers="titulosref"
          :items="datosref"
          item-key="name"
          class="elevation-1"
          @click:row="clickRef"
          :search="buscarRefe"
          sort-by="nombre"
          v-model="selectedRef"
        >
          <template slot="items" slot-scope="props">
            <tr @click="showAlert(props.item)">
              <td class="text-xs-right">{{ props.item._id }}</td>
              <td class="text-xs-right">{{ props.item.nombre }}</td>
              <td class="text-xs-right">{{ props.item.precioCosto }}</td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >
            No se encontraron resultados para "{{ buscarRefe }}".
          </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarRefe"
              label="Buscar en Referencias"
              class="mx-4"
              append-icon="mdi-magnify"
              single-line
              color="orange"
              hide-details
            ></v-text-field>
          </template>
        </v-data-table>
      </div>
      <br />
      <v-btn color="white" light @click="ocultarRef">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>


<style>
.contLibros {
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

.titulolib {
  /* background-color: hotpink; */
  display: flex;
  color: white;
  padding: 10px;
}

.objetoslib {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formulariolib {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: center;
}

.formulariorefer {
  background-color: rgba(255, 255, 255);
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  display: block;
  align-items: center;
}

.tablamuestraref {
  width: 100%;
}

.tablamuestralib {
  /* background-color: green; */
  padding-top: 0px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 70%;
}

.overlref {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlref .v-overlay__content {
  width: 50%;
  display: block;
}
</style>

<script>
import { SERVER_URL } from "../config.json";
import { http } from "../utils";

export default {
  data() {
    const defaultFormLib = Object.freeze({
      isbn: "",
      titulo: "",
      autor: "",
      categoria: "",
      tema: "",
      anio: "",
      editorial: ""
    });

    const defaultFormRef = Object.freeze({
      nombre: "",
      precioCosto: "",
    });

    return {
      formLib: Object.assign({}, defaultFormLib),
      formRef: Object.assign({}, defaultFormRef),

      rules: {
        codisbru: [
          (v) => !!v || "Este campo es obligatorio",
          (v) =>
            (v && v.length > 9) || "ISBN no puede tener menos de 10 digitos",
          (v) =>
            (v && v.length < 16) || "ISBN no puede tener mas de 13 digitos",
        ],
        tituloru: [(v) => !!v || "Este campo es obligatorio"],
        autoru: [(v) => !!v || "Este campo es obligatorio"],
        cateru: [(v) => !!v || "Este campo es obligatorio"],
        temru: [(v) => !!v || "Este campo es obligatorio"],
        anuru: [
          (v) => !!v || "Este campo es obligatorio",
          (v) => (v && !isNaN(v)) || "El dato del año no es valido",
        ],
        editorialru: [(v) => !!v || "Este campo es obligatorio"],
        tituloref: [(v) => !!v || "Este campo es obligatorio"],
        costoru: [
          (v) => !!v || "Este campo es obligatorio",
          (v) => (v && !isNaN(v)) || "El precio no es valido",
        ],
      },
      libro_id: '',
      ref_id: '',
      libro: {
        isbn: "",
        titulo: "",
        autor: "",
        categoria: "",
        tema: "",
        anio: "",
        editorial: ""
      },
      referencia: {
        nombre: '',
        precioCosto: ''
      },
      editoriales: [],
      overlayferen: false,
      snackbar: false,
      snackbarRef: false,
      defaultFormLib,
      selectedLib: [],
      selectedRef: [],
      buscarlibro: "",
      buscarRefe: "",

      tituloslib: [
        { text: "ISBN", value: "isbn" },
        { text: "Titulo", value: "titulo" },
        { text: "Autor", value: "autor" },
        { text: "Categoria", value: "categoria" },
        { text: "Tema", value: "tema" },
        { text: "Año", value: "anio" },
        { text: "Editorial", value: "editorial.nombre" }
      ],
      datoslib: [],

      titulosref: [
        { text: "Referencia", value: "_id" },
        { text: "Nombre", value: "nombre" },
        { text: "Costo", value: "precioCosto" },
      ],
      datosref: [],
    };
  },

  computed: {
    formIsValid() {
      return (
        this.libro.isbn &&
        this.libro.titulo &&
        this.libro.autor &&
        this.libro.categoria &&
        this.libro.tema &&
        this.libro.anio &&
        this.libro.editorial
      );
    },

    formIsValidRef() {
      return this.referencia.nombre && this.referencia.precioCosto;
    },
  },

  methods: {
    handleClickLib(item) {
      this.libro_id = item._id
      this.libro.isbn = item.isbn;
      this.libro.titulo = item.titulo;
      this.libro.autor = item.autor;
      this.libro.categoria = item.categoria;
      this.libro.tema = item.tema;
      this.libro.anio = item.anio;
      this.libro.editorial = item.editorial._id;
    },
    resetFormLib() {
      this.libro_id = ""
      this.formLib = Object.assign({}, this.defaultForm);
      this.$refs.formLib.reset();
    },
    async submitLib() {
      if(this.$refs.formLib.validate()){

        try{
          let url = `${ SERVER_URL }/api/libros`
          let metodo = 'POST'

          if(this.libro_id){
            url += `/${this.libro_id}`
            metodo = 'PUT'
          }

          const data = await http(url, metodo, this.libro)
          
          if(data.error)
            throw data.error.message

          this.resetFormLib();
          this.obtenerLibros()
          this.snackbar = true;
          
        }catch(ex){
          console.log(ex)
        }
        
      }
    },
    clickRef(item) {
      this.ref_id = item._id;
      this.referencia.nombre = item.nombre
      this.referencia.precioCosto = item.precioCosto;
    },
    mostrarRef() {
      this.obtenerReferencias()
      this.overlayferen = true;
    },
    ocultarRef() {
      this.overlayferen = false;
    },
    resetFormRef() {
      this.ref_id = ""
      this.formRef = Object.assign({}, this.defaultForm);
      this.$refs.formRef.reset();
    },
    async submitRef() {
      if(this.$refs.formRef.validate()){

        let url = `${ SERVER_URL }/api/referencias`
        
        let metodo = 'POST'

        if(this.ref_id){
          url += `/${this.ref_id}`
          metodo = 'PUT'
        }

        try{
          const data = await http(url, metodo, {
            nombre: this.referencia.nombre,
            precioCosto: this.referencia.precioCosto,
            libro: this.libro_id
          })

          if(data.error)
            throw data.error
          
          this.resetFormRef();
          this.obtenerReferencias()
          this.snackbarRef = true;
          
        }catch(ex){
          console.log(ex)
        }

        
      }
    },
    async obtenerEditoriales(){
      const editoriales = await http(`${SERVER_URL}/api/editoriales`)
      this.editoriales = []
      for(const editorial of editoriales){
        this.editoriales.push({
          _id: editorial._id,
          nombre: editorial.nombre
        })
      }
    },

    async obtenerLibros(){
      const libros = await http(`${SERVER_URL}/api/libros`)
      this.datoslib = []
      for(const libro of libros){
        this.datoslib.push(libro)
      }
    },

    async obtenerReferencias(){
      this.datosref = []
      if(this.libro_id){
        const referencias = await http(`${SERVER_URL}/api/referencias/lib/${this.libro_id}`)
      
        for(const referencia of referencias){
          this.datosref.push(referencia)
        }
      }
    }
  },

  beforeMount(){
    this.obtenerEditoriales()
    this.obtenerLibros()
  }
};
</script>
