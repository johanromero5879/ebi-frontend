<template>
  <div class="contMovimientos">
    <div class="tituloMo">
      <v-icon dark left> mdi-text-box-search </v-icon>
      <h1>Registro de movimientos</h1>
    </div>

    <v-snackbar
      v-model="emergenteMov"
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

    <div class="objetosMo">
      <div class="formularMo">
        <v-form
        align="center"
        ref="formMov"
        @submit.prevent="submitMov"
        >
          <v-text-field
            dark
            v-model="movimiento.cantidadMo"
            :rules="rules.canruMo"
            label="Cantidad"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            dark
            v-model="movimiento.detalleMo"
            :rules="rules.detruMo"
            label="Detalles"
            outlined
            required
          ></v-text-field>

          <v-select
            dark
            v-model="movimiento.tipoMo"
            :items="itemsMo"
            :rules="rules.tipoMoru"
            label="Tipo"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="movimiento.refliMo"
            :items="irefliMo"
            :rules="rules.refliMoru"
            label="Referencia del libro"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="movimiento.almorMo"
            :items="ialmorMo"
            :rules="rules.almorMoru"
            label="Almacén de origen"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="movimiento.almdeMo"
            :items="ialmdeMo"
            :rules="rules.almdeMoru"
            label="Almacén de destino"
            outlined
            required
          ></v-select>

          <br />

          <v-btn 
          color="white"
          class="mr-4"
          outlined 
          :disabled="!formIsValid"
          type="submitMov"
          >
            <v-icon left>mdi-content-save</v-icon>
            Guardar
          </v-btn>

          <v-btn color="white" class="mr-4" outlined @click="resetFormMov">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn>

          <v-btn 
          color="white"
          class="mr-4"
          outlined
          @click="resetFormMov"
          >
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
    
    const defaultFormMov = Object.freeze({
        cantidadMo: '',
        detalleMo: '',
        tipoMo: '',
        refliMo: '',
        almorMo: '',
        almdeMo: '',
      })

    return {
      usuario: {
        tipo: "xd",
      },
      formMov:Object.assign({}, defaultFormMov),
      rules: {
      canruMo: [(v) => !!v || "Este campo es obligatorio"],
      detruMo: [(v) => !!v || "Este campo es obligatorio"],
      tipoMoru: [(v) => !!v || 'Esta selección es obligatoria'],
      refliMoru:[(v) => !!v || 'Esta selección es obligatoria'],
      almorMoru:[(v) => !!v || 'Esta selección es obligatoria'],
      almdeMoru:[(v) => !!v || 'Esta selección es obligatoria'],
      },
      itemsMo: [
        "Adquisición (+)",
        "Devolución de adquisición (-)",
        "Distribución (-)",
        "Devolución de distribución (+)",
      ],
      irefliMo: ["La tortuguita pescuezona - YTXX74YA3M"],
      ialmorMo: ["Bodega", "Tres pelagatos sas", "El lector"],
      ialmdeMo: ["Bodega", "Tres pelagatos sas", "El lector"],

      movimiento:{
      _id: '',
      cantidadMo: '',
      detalleMo: '',
      tipoMo: '',
      refliMo: '',
      almorMo: '',
      almdeMo: ''
      },

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


/*...................................*/
computed: {
      formIsValid () {
        return (
          this.movimiento.cantidadMo &&
          this.movimiento.detalleMo &&
          this.movimiento.tipoMo &&
          this.movimiento.refliMo &&
          this.movimiento.almorMo &&
          this.movimiento.almdeMo
        )
      },
    },

  /*...................................*/
  


  methods: {

    handleClickMov(item) {
          this.movimiento.cantidadMo=item.cantidadMov;
          this.movimiento.detalleMo =item.detalleMov;
          this.movimiento.tipoMo =item.tipoMov;
          this.movimiento.refliMo =item.referenciaMov;
          this.movimiento.almorMo =item.almorigenMov;
          this.movimiento.almdeMo =item.almdestinoMov;
        },
     resetFormMov () {
        this.formMov = Object.assign({}, this.defaultForm)
        this.$refs.formMov.reset()
      },
      submitMov () {
        this.emergenteMov = true
        this.resetFormMov()
      },
    
  },
};
</script>
