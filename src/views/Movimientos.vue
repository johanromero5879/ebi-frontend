<template>
  <div class="contMovimientos">
    <div class="tituloMo">
      <v-icon dark left>mdi-note-text</v-icon>
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
            required
          >
          </v-text-field>

          <v-text-field
            dark
            v-model="detalleMo"
            :rules="detruMo"
            label="Detalles"
            required
          ></v-text-field>

          <v-select
            dark
            v-model="tipoMo"
            :items="itemsMo"
            :rules="[(v) => !!v || 'Ésta selección es obligatoria']"
            label="Tipo"
            required
          ></v-select>

          <v-select
            dark
            v-model="refliMo"
            :items="irefliMo"
            :rules="[(v) => !!v || 'Ésta selección es obligatoria']"
            label="Referencia del libro"
            required
          ></v-select>

          <v-select
            dark
            v-model="almorMo"
            :items="ialmorMo"
            :rules="[(v) => !!v || 'Ésta selección es obligatoria']"
            label="Almacén de origen"
            required
          ></v-select>

          <v-select
            dark
            v-model="almdeMo"
            :items="ialmdeMo"
            :rules="[(v) => !!v || 'Ésta selección es obligatoria']"
            label="Almacén de destino"
            required
          ></v-select>

          <br />
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
          :search="search"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Buscar movimientos   "
              class="mx-4"
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

      titulosMo: [
        { text: "Fecha", align: "start", value: "fechaMov" },
        { text: "Detalle", value: "detalleMov" },
        { text: "Cantidad", value: "cantidadMov" },
        { text: "Tipo", value: "tipoMov" },
        { text: "Referencia", value: "referenciaMov" },
        { text: "Almacen de origen", value: "almorigenMov" },
        { text: "Almacen de destino", value: "almdestinoMov" },
      ],
      datosMo: [
        {
          fechaMov: "15-03-2021, 8:55 a.m.",
          detalleMov: "Adquisición de libros",
          cantidadMov: 10,
          tipoMov: "Adquisición (+)",
          referenciaMov: "MD74M83YR4",
          almorigenMov: "Tres pelagatos sas",
          almdestinoMov: "Bodega",
        },
        {
          fechaMov: "10-04-2021, 11:43 a.m.",
          detalleMov: "devolución de libros",
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
