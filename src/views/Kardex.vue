<template>
  <div class="contKardex">
    <div class="tituloKa">
      <v-icon dark left>mdi-book-multiple</v-icon>
      <h1>Registro de Kardex</h1>
    </div>
    <div class="objetosKa">
      <div class="formularKa">
        <v-form align="center" ref="form" v-model="valid" lazy-validation>
          <h1 class="selectexto">
            Seleccione un almacén para visualizar sus registros de Kardex:
          </h1>
          <br />
          <v-select
            class="seleccionarc"
            dark
            v-model="almKa"
            :items="itemsKa"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Seleccione..."
            required
          ></v-select>

          <v-btn color="white" class="mr-4" outlined @click="validate">
            <v-icon left>mdi-format-list-bulleted</v-icon>
            Listar
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestraKa" align="center">
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

        <br />

        <v-col cols="auto">
          <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="white" v-bind="attrs" v-on="on"
                >From the bottom
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="primary" dark
                  >Opening from the bottom</v-toolbar
                >
                <v-card-text>
                  <div class="text-h2 pa-12">Hello world!</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </div>
    </div>
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

.objetosKa {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formularKa {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
}

.selectexto {
  color: white;
  font-size: 16.5px;
  display: flex;
}

.seleccionarc {
  padding-bottom: 10px;
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
</style>

<script>
export default {
  data() {
    return {
      valid: true,
      cantidadMo: "",
      canruMo: [(v) => !!v || "Este campo es obligatorio"],

      valid: true,
      detalleMo: "",
      detruMo: [(v) => !!v || "Este campo es obligatorio"],

      almKa: null,
      itemsKa: ["Tres pelagatos sas", "El lector"],

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
      this.$refs.form.resetValidation();
    },
  },
};
</script>
