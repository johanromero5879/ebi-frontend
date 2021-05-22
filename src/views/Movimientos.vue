<template>
  <div class="contMovimientos">
    <div class="tituloMo">
      <v-icon dark left> mdi-text-box-search </v-icon>
      <h1>Registro de movimientos</h1>
    </div>

    <v-snackbar v-model="snackbar.show" absolute botton right :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>

    <div class="objetosMo">
      <div class="formularMo">
        <v-form align="center" ref="formMov" @submit.prevent="submitMov">
          
          <v-select
            dark
            v-model="movimiento.almacen"
            :items="almacenes"
            item-text="nombre"
            item-value="_id"
            :rules="rules.almorMoru"
            label="Almacén"
            outlined
            required
          ></v-select>


          <p class="text-left text-white">Origen/Destino:</p>
          <v-radio-group v-model="row1" row>
            <v-radio label="Almacen" value="almacen" dark @click="() => resetDestino('almacen')"></v-radio>
            <v-radio label="Editorial" value="editorial" dark  @click="() => resetDestino('editorial')"></v-radio>
          </v-radio-group>

          <v-select
            v-if="row1 == 'almacen'"
            dark
            v-model="destino.almacen"
            :items="almacenes"
            item-text="nombre"
            item-value="_id"
            :rules="rules.almdeMoru"
            label="Almacén"
            outlined
            required
          ></v-select>
          <v-select
            v-else
            dark
            v-model="destino.editorial"
            :items="editoriales"
            item-text="nombre"
            item-value="_id"
            :rules="rules.almdeMoru"
            label="Editorial"
            outlined
            required
          ></v-select>

          <v-divider dark></v-divider><br />

          <v-select
            dark
            v-model="movimiento.tipo"
            :items="itemsMo"
            item-text="nombre"
            item-value="valor"
            :rules="rules.tipoMoru"
            label="Tipo"
            outlined
            required
          ></v-select>

          <v-textarea
            dark
            v-model="movimiento.detalle"
            :rules="rules.detruMo"
            label="Detalles"
            outlined
            required
          ></v-textarea>

          <v-select
            dark
            v-model="movimiento.referencia"
            :items="referencias"
            :rules="rules.refliMoru"
            item-text="nombre"
            item-value="_id"
            label="Referencia del libro"
            outlined
            required
          ></v-select>

          <v-text-field
            dark
            v-model="movimiento.cantidad"
            :rules="rules.canruMo"
            label="Cantidad"
            outlined
            required
          >
          </v-text-field>


          

          <br />

          <v-btn
            color="white"
            class="mr-4"
            outlined
            :disabled="!formIsValid"
            type="submitMov"
          >
            <template v-if="!movimiento_id">
              <v-icon left>mdi-content-save</v-icon>
              Guardar
            </template>

            <template v-else>
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </template>
          </v-btn>

          <!-- <v-btn color="white" class="mr-4" outlined @click="resetFormMov">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn> -->

          <v-btn color="white" class="mr-4" outlined @click="resetFormMov">
            <v-icon left>mdi-window-close</v-icon>
            Cancelar
          </v-btn>

          <v-btn
            v-if="usuario.tipo == 'admin'"
            color="white"
            outlined
            @click="resetFormMov"
          >
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestraMo">
        <v-data-table
          :headers="titulosMo"
          :items="datosMo"
          item-key="name"
          class="elevation-1"
          :search="buscarMov"
          v-model="selectedMov"
          @click:row="handleClickMov"
        >
          <template slot="items" slot-scope="props">
            <tr @click="showAlert(props.item)">
              <td class="text-xs-right">{{ props.item.fecha }}</td>
              <td class="text-xs-right">{{ props.item.detalle }}</td>
              <td class="text-xs-right">{{ props.item.cantidad }}</td>
              <td class="text-xs-right">{{ props.item.tipo }}</td>
              <td class="text-xs-right">{{ props.item.referencia}}</td>
              <td class="text-xs-right">{{ props.item.almacen}}</td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >
            No se encontraron resultados para "{{ buscarMov }}".
          </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarMov"
              label="Buscar movimientos"
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
.text-white {
  color: white;
}
.contMovimientos {
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

.tituloMo {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}

.objetosMo {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formularMo {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
}

.tablamuestraMo {
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
import { http, formatearFecha } from "../utils";


export default {
  data() {
    const defaultFormMov = Object.freeze({
      cantidadMo: "",
      detalleMo: "",
      tipoMo: "",
      refliMo: "",
      almorMo: "",
      almdeMo: "",
    });

    return {
      row1: "almacen",
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      },
      usuario: {
        tipo: "xd",
      },
      formMov: Object.assign({}, defaultFormMov),
      rules: {
        canruMo: [(v) => !!v || "Este campo es obligatorio"],
        detruMo: [(v) => !!v || "Este campo es obligatorio"],
        tipoMoru: [(v) => !!v || "Esta selección es obligatoria"],
        refliMoru: [(v) => !!v || "Esta selección es obligatoria"],
        almorMoru: [(v) => !!v || "Esta selección es obligatoria"],
        almdeMoru: [(v) => !!v || "Esta selección es obligatoria"],
      },
      itemsMo: [
        { nombre:"Adquisición (+)", valor:"adquisicion" },
        { nombre: "Devolución de adquisición (-)", valor: "dev_adquisicion" },
        { nombre: "Distribución (-)", valor: "distribucion" },
        { nombre: "Devolución de distribución (+)", valor: "dev_distribucion" }
      ],
      referencias: [],
      almacenes: [],
      editoriales: [],

      movimiento_id: "",
      movimiento: {
        cantidad: "",
        detalle: "",
        tipo: "",
        referencia: "",
        almacen: ""
      },
      destino: {
        almacen: "",
        editorial: "",
      },
      selectedMov: [],
      buscarMov: "",

      titulosMo: [
        { text: "Fecha", value: "fecha" },
        { text: "Detalle", value: "detalle" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Tipo", value: "tipo" },
        { text: "Referencia", value: "referencia" },
        { text: "Almacen", value: "almacen" },
      ],
      datosMo: [],
    };
  },

  /*...................................*/
  computed: {
    formIsValid() {
      return (
        // this.movimiento.cantidadMo &&
        // this.movimiento.detalleMo &&
        // this.movimiento.tipoMo &&
        // this.movimiento.refliMo &&
        // this.movimiento.almorMo &&
        // this.movimiento.almdeMo
        true
      );
    },
  },

  /*...................................*/

  methods: {
    handleClickMov(item) {
      // this.movimiento.cantidadMo = item.cantidadMov;
      // this.movimiento.detalleMo = item.detalleMov;
      // this.movimiento.tipoMo = item.tipoMov;
      // this.movimiento.refliMo = item.referenciaMov;
      // this.movimiento.almorMo = item.almorigenMov;
      // this.movimiento.almdeMo = item.almdestinoMov;
    },
    resetFormMov() {
      this.formMov = Object.assign({}, this.defaultForm);
      this.$refs.formMov.reset();
      this.row1 = 'almacen'
    },
    extraerMovimientos(){

      let movimientos = [
        {...this.movimiento}
      ]

      if(!this.destino.editorial){
        const nuevoMovimiento = {...this.movimiento}
        nuevoMovimiento.almacen = this.destino.almacen
        movimientos.push(nuevoMovimiento)

        switch(movimientos[0].tipo){
          case "adquisicion":
            movimientos[1].tipo = "distribucion"
            break

          case "dev_adquisicion":
            movimientos[1].tipo = "dev_distribucion"
            break

          case "distribucion":
            movimientos[1].tipo = "adquisicion"
            break

          case "dev_distribucion":
            movimientos[1].tipo = "dev_adquisicion"
            break
        }
      }

      const movsResta = movimientos.filter(mov => mov.tipo == 'distribucion' || mov.tipo == 'dev_adquisicion')
      const movsSuma = movimientos.filter(mov => mov.tipo == 'adquisicion' || mov.tipo == 'dev_distribucion')

      return [...movsResta, ...movsSuma]
    },
    async submitMov() {

      if(this.$refs.formMov.validate()){
        if(this.movimiento.almacen != this.destino.almacen){
          const movimientos = this.extraerMovimientos()

          try{
            const data = await http(`${SERVER_URL}/api/movimientos`, 'POST', {movimientos})
            if(data.error)
              throw data.message

            this.resetFormMov();
            this.obtenerMovimientos()
            this.showSnackbar('Se ha registrado correctamente')
              
          }catch(ex){
            this.showSnackbar(ex, 'error')
          }
        }else{
          this.showSnackbar('Los almacenes no deben ser los mismos', 'error')
        }
      }
      
    },
    showSnackbar(message, color = 'success'){
      this.snackbar.color = color;
      this.snackbar.message = message;
      this.snackbar.show = true;
    },
    resetDestino(radio){
      if(radio == 'almacen'){
        this.destino.editorial = ''
      }else{
        this.destino.almacen = ''
      }
    },
    
    async obtenerReferencias(){
      
      const refs = await http(`${SERVER_URL}/api/referencias`)
      this.referencias = []

      for(const referencia of refs){
        this.referencias.push({
          _id: referencia._id,
          nombre: `${referencia.libro.titulo} - ${referencia.nombre}`
        })
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

    async obtenerMovimientos(){
      
      const movimientos = await http(`${SERVER_URL}/api/movimientos`)
      this.datosMo = []

      for(const movimiento of movimientos){
        this.datosMo.push({
          _id: movimiento._id,
          fecha: formatearFecha(movimiento.fecha),
          detalle: movimiento.detalle,
          cantidad: movimiento.cantidad,
          tipo: movimiento.tipo,
          referencia: movimiento.referencia.nombre,
          almacen: movimiento.almacen.nombre
        })
      }
    }
  },
  beforeMount(){
    this.obtenerMovimientos()
    this.obtenerAlmacenes()
    this.obtenerReferencias()
    this.obtenerEditoriales()
  }
};
</script>
