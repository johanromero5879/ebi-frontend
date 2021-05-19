<template>
  <div class="contKardex">
    <div class="tituloKa">
      <v-icon dark left> mdi-currency-usd </v-icon>
      <h1>Registro de Kardex</h1>
    </div>
    <div class="objetosKa">
      <div class="formularKa">
        <v-form align="center" ref="form" v-model="valid" lazy-validation>
          <h1 class="selectexto">
            Seleccione un almacén para visualizar sus registros de Kardex:
          </h1>
          <br>
          <v-select
            class="seleccionarc"
            dark
            v-model="almKa"
            :items="itemsKa"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Seleccione..."
            outlined
            required
          ></v-select>

          <v-btn color="white" class="mr-4" outlined @click="validate"
          :disabled="!formIsValidKar"
          >
            <v-icon left>mdi-format-list-bulleted</v-icon>
            Listar
          </v-btn>

          <v-btn color="white" class="mr-4" outlined @click="validate"
          :disabled="!formIsValidKar"
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
        <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
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
  <v-overlay align="center" class="overlay-kardex" :value="overlka" opacity="0.7">
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

    <h1 class="espacio"> ■ </h1>

    <div class="totalKardex">
      <v-icon left> mdi-currency-usd </v-icon>
      <v-spacer></v-spacer>
      <h1>Total : {{ overlka }}</h1>
    </div>

    <br>

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
  display:flex;
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
  width: 80%
}

</style>

<script>
export default {
  data() {

    return {
      overlka: false,

      almKa: null,
      itemsKa: ["Tres pelagatos sas", "El lector"],

      titulosKa: [
        { text: "ID", align: "start", value: "idKA" },
        { text: "Fecha", value: "fechaKA" },
        { text: "Cantidad final", value: "cfKA" },
        { text: "Valor final", value: "vfKA" },
      ],

      selectedKa:[],
      buscarKa: '',
      datosKa: [
        {
          idKA: "192837465",
          fechaKA: "02-03-2021",
          cfKA: 0,
          vfKA: 0,
        },
        {
          idKA: "192837465",
          fechaKA: "02-03-2021",
          cfKA: 0,
          vfKA: 0,
        },
      ],

      titulosKardex: [
        { text: "Fecha", align: "start", value: "fechaKardex" , sortable: false},
        { text: "Detalle", value: "detalleKardex" , sortable: false, width: "25%"},

        { text: "E - Cantidad", value: "EcantidadKardex" , sortable: false},
        { text: "E - Val. unitario", value: "EvunitKardex" , sortable: false},
        { text: "E - Val. total", value: "EvtotKardex" , sortable: false},

        { text: "S - Cantidad", value: "ScantidadKardex" , sortable: false},
        { text: "S - Val. unitario", value: "SvunitKardex" , sortable: false},
        { text: "S - Val. total", value: "SvtotKardex" , sortable: false},

        { text: "Ex - Cantidad", value: "ExcantidadKardex" , sortable: false},
        { text: "Ex - Val. unitario", value: "ExvunitKardex" , sortable: false},
        { text: "Ex - Val. total", value: "ExvtotKardex" , sortable: false},
      ],

      datosKardex: [
        {
          fechaKardex: '12-05-2021',
          detalleKardex: 'Compra de mercancía',
          EcantidadKardex: 0,
          EvunitKardex: 0,
          EvtotKardex: 0,
          ScantidadKardex: 0,
          SvunitKardex: 0,
          SvtotKardex: 0,
          ExcantidadKardex: 0,
          ExvunitKardex: 0,
          ExvtotKardex: 0,
        },
        {
          fechaKardex: '13-05-2021',
          detalleKardex: 'Compra de mercancíaCompra de mercancía',
          EcantidadKardex: '0',
          EvunitKardex: '0',
          EvtotKardex: '0',
          ScantidadKardex: '0',
          SvunitKardex: '0',
          SvtotKardex: '0',
          ExcantidadKardex: '0',
          ExvunitKardex: '0',
          ExvtotKardex: '0',
        },
      ],
    };
  },
  computed: {
      
      
      formIsValidKar () {
        return (
      this.almKa 
        )
      }
    },
  methods: {
    listarKA(item) {
        // alert('Id: ' + item.idKA +' Fecha : '+ item.fechaKA );
        this.overlka = true;
    },
    validate() {
      this.$refs.form.resetValidation();
    },
    cerrarKardex() {
      this.overlka = false
    },
  },
};
</script>
