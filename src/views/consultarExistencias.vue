<template>
  <div class="contConsultar">
    <v-snackbar v-model="snackbar.show" absolute botton right :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>

    <div class="tituloCE">
      <v-icon dark left>mdi-book-information-variant</v-icon>
      <h1>Consultar existencias</h1>
    </div>
    <div class="objetosCE">
      <div class="formularCE">
        <v-form align="center" ref="form" lazy-validation>

          <v-select
            dark
            v-model="almacen"
            :items="almacenes"
            item-text="nombre"
            item-value="_id"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Almacén"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="libro"
            :items="libros"
            item-text="titulo"
            item-value="_id"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Libro"
            outlined
            required
          ></v-select>

          <br />

          <v-btn color="white" class="mr-4" outlined @click="validate">
            <v-icon left>mdi-magnify</v-icon>
            Consultar
          </v-btn>

        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestraCE">
        <v-data-table
          :headers="titulosMo"
          :items="existencias"
          item-key="name"
          class="elevation-1"
        >
        </v-data-table>
      </div>
    </div>
  </div>
</template>


<style>
.contConsultar {
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

.tituloCE {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}

.objetosCE {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formularCE {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
}

.tablamuestraCE {
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
import { http, formatearMoneda } from "../utils";

export default {
  data() {
    return {

      almacen: '',
      almacenes: [],

      libro: '',
      libros: [],

      titulosMo: [
        { text: "Referencia", value: "referencia" },
        { text: "Libro", value: "libro" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Precio costo unitario", value: "precioCosto" },
        { text: "Precio costo total", value: "precioTotal" },
      ],
      existencias: [],

      snackbar: {
        show: false,
        message: '',
        color: 'success'
      }
    };
  },
  methods: {
    validate() {
      if (this.almacen){
        this.obtenerExistencias()
      }else{
        this.showSnackbar('Debe seleccionar un almacen', 'error')
      }
    },
    showSnackbar(message, color = 'success'){
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.show = true
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async obtenerExistencias(){
      this.existencias = []
      try{
        let url = `${SERVER_URL}/api/inventarios/almacen/${this.almacen}`

        if(this.libro){
          url += `/lib/${this.libro}`
        }
        
        const data = await http(url)

        if(data.error)
          throw data.message
        
        for(const existencia of data){
          const { cantidad, referencia } = existencia
          const { libro, precioCosto, nombre } = referencia

          this.existencias.push({
            referencia: nombre,
            libro: libro.titulo,
            cantidad,
            precioCosto: formatearMoneda(precioCosto),
            precioTotal: formatearMoneda(precioCosto * cantidad)
          })
        }
      }catch(ex){
        this.showSnackbar(ex, 'error')
      }
    },

    async obtenerAlmacenes(){
      const almacenes = await http(`${SERVER_URL}/api/almacenes`)
      this.almacenes = []
      for(const almacen of almacenes){
        this.almacenes.push({
          _id: almacen._id,
          nombre: almacen.nombre
        })
      }
    },

    async obtenerLibros(){
      const libros = await http(`${SERVER_URL}/api/libros`)
      this.libros = []
      for(const libro of libros){
        this.libros.push({
          _id: libro._id,
          titulo: libro.titulo
        })
      }
    },
  },
  beforeMount(){
    this.obtenerAlmacenes()
    this.obtenerLibros()
  }
};
</script>
