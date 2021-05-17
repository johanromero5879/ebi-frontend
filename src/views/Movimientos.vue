<template>
  <div class="contMovimientos">
    <div class="tituloMo">
      <v-icon dark left> mdi-text-box-search </v-icon>
      <h1>Registro de movimientos</h1>
    </div>
    <div class="objetosMo">
      <div class="formularMo">
        <v-form align="center" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            dark
            v-model="cantidadMo"
            :rules="canruMo"
            label="Cantidad"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            dark
            v-model="detalleMo"
            :rules="detruMo"
            label="Detalles"
            outlined
            required
          ></v-text-field>

          <v-select
            dark
            v-model="tipoMo"
            :items="itemsMo"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Tipo"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="refliMo"
            :items="irefliMo"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Referencia del libro"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="almorMo"
            :items="ialmorMo"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Almacén de origen"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="almdeMo"
            :items="ialmdeMo"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Almacén de destino"
            outlined
            required
          ></v-select>

          <br />

          <v-btn color="white" class="mr-4" outlined @click="validate">
            <v-icon left>mdi-content-save</v-icon>
            Guardar
          </v-btn>

          <v-btn color="white" class="mr-4" outlined @click="reset">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn>

          <v-btn
            v-if="usuario.tipo == 'admin'"
            color="white"
            outlined
            @click="resetValidation"
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
          <td>{{ props.item.idMov }}</td>
          <td class="text-xs-right">{{ props.item.fechaMov }}</td>
          <td class="text-xs-right">{{ props.item.detalleMov }}</td>
          <td class="text-xs-right">{{ props.item.cantidadMov }}</td>
          <td class="text-xs-right">{{ props.item.tipoMov }}</td>
          <td class="text-xs-right">{{ props.item.referenciaMov }}</td>
          <td class="text-xs-right">{{ props.item.almorigenMov }}</td>
          <td class="text-xs-right">{{ props.item.almdestinoMov }}</td>
            </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
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
export default {
  data() {
    return {
      usuario: {
        tipo: "xd",
      },

      valid: true,
      cantidadMo: "",
      canruMo: [(v) => !!v || "Este campo es obligatorio"],

      valid: true,
      detalleMo: "",
      detruMo: [(v) => !!v || "Este campo es obligatorio"],

      tipoMo: null,
      itemsMo: [
        "Adquisición (+)",
        "Devolución de adquisición (-)",
        "Distribución (-)",
        "Devolución de distribución (+)",
      ],

      refliMo: null,
      irefliMo: ["La tortuguita pescuezona - YTXX74YA3M"],

      almorMo: null,
      ialmorMo: ["Bodega", "Tres pelagatos sas", "El lector"],

      almdeMo: null,
      ialmdeMo: ["Bodega", "Tres pelagatos sas", "El lector"],

      selectedMov:[],
      buscarMov: '',

      titulosMo: [
        { text: "ID", align: "start", value: "idMov" },
        { text: "Fecha", value: "fechaMov" },
        { text: "Detalle", value: "detalleMov" },
        { text: "Cantidad", value: "cantidadMov" },
        { text: "Tipo", value: "tipoMov" },
        { text: "Referencia", value: "referenciaMov" },
        { text: "Almacen de origen", value: "almorigenMov" },
        { text: "Almacen de destino", value: "almdestinoMov" },
      ],
      datosMo: [
        {
          idMov: 123456789,
          fechaMov: "15-03-2021, 8:55 a.m.",
          detalleMov: "Adquisición de nuevas existencias de la tortuguita pescuezona.",
          cantidadMov: 10,
          tipoMov: "Adquisición (+)",
          referenciaMov: "MD74M83YR4",
          almorigenMov: "Tres pelagatos sas",
          almdestinoMov: "Bodega",
        },
        {
          idMov: 987654321,
          fechaMov: "10-04-2021, 11:43 a.m.",
          detalleMov: "Devolución de existencias sobrantes de la tortuguita pescuezona.",
          cantidadMov: 2,
          tipoMov: "Devolución de adquisición (-)",
          referenciaMov: "MD74M83YR4",
          almorigenMov: "Bodega",
          almdestinoMov: "Tres pelagatos sas",
        },
      ],
    };
  },
  methods: {

    handleClickMov(item) {
      alert('Id Movimiento: ' + item.idMov +' Fecha Movimiento: '+ item.fechaMov+' Detalles: '+ item.detalleMov+' Cantidad de movimientos: '+ item.cantidadMov+
      ' Tipo de movimiento: '+ item.tipoMov +' Referencia: '+ item.referenciaMov +' Origen: '+ item.almorigenMov + ' Destino: '+ item.almdestinoMov );
      },

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
