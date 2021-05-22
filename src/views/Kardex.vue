<template>
  <div class="contKardex">
    <v-snackbar v-model="snackbar.show" absolute botton right :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>
    
    <div class="tituloKa">
      <v-icon dark left> mdi-currency-usd </v-icon>
      <h1>Registro de Kardex</h1>
    </div>
    <div class="objetosKa">
      <div class="formularKa">
        <v-form align="center" ref="form" lazy-validation>
          <h1 class="selectexto">
            Seleccione un almacén para visualizar sus registros de Kardex:
          </h1>
          <br />
          <v-select
            class="seleccionarc"
            dark
            v-model="almacen"
            :items="almacenes"
            item-text="nombre"
            item-value="_id"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Seleccione..."
            outlined
            required
            @change="listarKardex"
          ></v-select>

          <v-btn
            color="white"
            class="mr-4"
            outlined
            :disabled="!almacen"
            @click="generarKardex"
          >
            <v-icon left>mdi-file-chart</v-icon>
            Generar Kardex
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestraKa" align="center">
        <v-data-table
          :headers="titulosKa"
          :items="datosKa"
          item-key="name"
          class="elevation-1"
          @click:row="listarKA"
          :search="buscarKa"
          v-model="selectedKa"
        >
          <template slot="items" slot-scope="props">
            <tr @click="showAlert(props.item)">
              <td>{{ props.item.idMov }}</td>
              <td class="text-xs-right">{{ props.item.idKa }}</td>
              <td class="text-xs-right">{{ props.item.fechaKA }}</td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >
            No se encontraron resultados para "{{ buscarKa }}".
          </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarKa"
              label="Buscar registro"
              class="mx-4"
              append-icon="mdi-magnify"
              single-line
              hide-details
            ></v-text-field>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-overlay
      align="center"
      class="overlay-kardex"
      :value="overlka"
      opacity="0.7"
    >
      <v-data-table
        :hide-default-footer="true"
        disable-pagination
        height="300px"
        light
        :headers="titulosKardex"
        :items="datosKardex"
        item-key="name"
        class="tablaKardexm"
      >
      </v-data-table>

      <h1 class="espacio">■</h1>
      
      <div class="totalKardex">
        <v-icon left> mdi-currency-usd </v-icon>
        <v-spacer></v-spacer>
        <h1>
          <span style="margin-right: 50px;">Cantidad: {{ detalles_kardex.cantidad }}</span>
          <span>Total: {{ detalles_kardex.total }}</span>
        </h1>
      </div>

      <br />

      <v-btn color="white" light class="mr-4" @click="cerrarKardex">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>


<style>
.contKardex {
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

.tituloKa {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}

.espacio {
  font-size: 4px;
}

.totalKardex {
  background-color: white;
  border-radius: 5px;
  color: rgb(114, 114, 114);
  padding-right: 18px;
  height: 30px;
  display: flex;
  font-size: 10px;
}

.objetosKa {
  /* background-color: indigo; */
  display: flex;
}

.formularKa {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
  /* height: 220px; */
}

.selectexto {
  color: white;
  font-size: 16.5px;
  display: flex;
}

.seleccionarc {
  padding-bottom: 10px;
}

.almuesKardex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tablamuestraKa {
  /* background-color: green; */
  padding-top: 0px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 70%;
  display: block;
}

.tablaKardexm {
  padding: 10px;
}

.overlay-kardex .v-overlay__content {
  width: 80%;
}
</style>

<script>
import { SERVER_URL } from '../config.json'
import { http, formatearMoneda, formatearFecha } from '../utils'

export default {
  data() {
    return {
      overlka: false,
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      },
      almacen: '',
      almacenes: [],

      titulosKa: [
        { text: "Codigo", value: "_id" },
        { text: "Fecha", value: "fecha"},
        { text: "Cantidad final", value: "cantidadFinal"},
        { text: "Valor final", value: "valorFinal" },
      ],

      selectedKa: [],
      buscarKa: "",
      datosKa: [],

      titulosKardex: [
        { text: "Fecha", value: "fecha", sortable: false },
        { text: "Tipo", value: "tipo", sortable: false },
        { text: "Detalle", value: "detalle", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Val. unitario", value: "valorUnitario", sortable: false },
        { text: "Val. total", value: "valorTotal", sortable: false },
        { text: "Cant. total", value: "cantidadTotal", sortable: false },
        { text: "Saldo total", value: "saldoTotal", sortable: false }
      ],

      datosKardex: [],

      detalles_kardex: {
        cantidad: '',
        total: ''
      }
    };
  },
  computed: {
    formIsValidKar() {
      return this.almKa;
    },
  },
  methods: {
    async listarKA(item) {
      this.datosKardex = []
      try{
        const detalle = await http(`${SERVER_URL}/api/kardex/${item._id}`)

        if(detalle.error)
          throw detalle.message

        for(const mov of detalle.movimientos){
          const { fecha, tipo, detalle, cantidad, valorUnitario, valorTotal, cantidadTotal, saldoTotal } = mov
          this.datosKardex.push({
            fecha: formatearFecha(fecha),
            tipo: this.obtenerLabelTipo(tipo),
            detalle,
            cantidad,
            valorUnitario: !isNaN(valorUnitario) ? formatearMoneda(valorUnitario): '-',
            valorTotal: formatearMoneda(valorTotal),
            cantidadTotal,
            saldoTotal: formatearMoneda(saldoTotal)
          })
        }

        this.detalles_kardex.cantidad = detalle.cantidadFinal
        this.detalles_kardex.total = formatearMoneda(detalle.valorFinal)
        this.overlka = true;
      }catch(ex){
        this.listarKardex()
        this.showSnackbar(ex, 'color')
      }
      
    },
    async listarKardex() {
      this.datosKa = []
      if(this.almacen){
        const kardex = await http(`${SERVER_URL}/api/kardex/almacen/${this.almacen}`)

        for(const registro of kardex){
          const { _id, fecha, valorFinal, cantidadFinal } = registro
          this.datosKa.push({ 
            _id, 
            fecha: formatearFecha(fecha), 
            cantidadFinal, 
            valorFinal: formatearMoneda(valorFinal) 
          })
        }

        
      }
    },
    async generarKardex(){
      if(this.almacen){
        try{
          const data = await http(`${SERVER_URL}/api/kardex`, 'POST', { almacen: this.almacen })
          if(data.error)
            throw data.message

          this.listarKardex()
          this.showSnackbar('Se registro en kardex correctamente', 'success')
        }catch(ex){
          this.showSnackbar(ex, 'error')
        }
      }
    },
    obtenerLabelTipo(tipo){
      let label = ''
      switch(tipo){
        case 'adquisicion':
          label = 'Adquisición (+)'
          break
        case 'distribucion':
          label = 'Distribución (-)'
          break
        case 'dev_adquisicion':
          label = 'Devolución adquisición (-)'
          break
        case 'dev_distribucion':
          label = 'Devolución distribución (+)'
          break
        default:
          label = tipo
          break
      }

      return label
    },
    cerrarKardex() {
      this.overlka = false;
      this.detalles_kardex.cantidad = ''
      this.detalles_kardex.total = ''
    },
    showSnackbar(message, color = 'success'){
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.show = true
    },
    async obtenerAlmacenes() {
      const almacenes = await http(`${SERVER_URL}/api/almacenes`);
      this.almacenes = [];
      for (const almacen of almacenes) {
        this.almacenes.push({
          _id: almacen._id,
          nombre: almacen.nombre,
        });
      }
    },
  },

  beforeMount() {
    this.obtenerAlmacenes();
  },
};
</script>
