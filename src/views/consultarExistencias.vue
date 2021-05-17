<template>
  <div class="contConsultar">
    <div class="tituloCE">
      <v-icon dark left>mdi-book-information-variant</v-icon>
      <h1>Consultar existencias</h1>
    </div>
    <div class="objetosCE">
      <div class="formularCE">
        <v-form align="center" ref="form" v-model="valid" lazy-validation>

          <v-select
            dark
            v-model="almCE"
            :items="itemsCE"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Almacén"
            outlined
            required
          ></v-select>

          <v-select
            dark
            v-model="libCE"
            :items="litemsCE"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Libro"
            outlined
            required
          ></v-select>

          <br />

          <v-btn color="white" class="mr-4" outlined @click="validate">
            <v-icon left>mdi-content-save</v-icon>
            Guardar
          </v-btn>

        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestraCE">
        <v-data-table
          :headers="titulosMo"
          :items="datosMo"
          item-key="name"
          class="elevation-1"
          :search="search"
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
export default {
  data() {
    return {

      almCE: null,
      itemsCE: ["Tres pelagatos sas", "El lector"],

      libCE: null,
      litemsCE: ["La tortuguita pescuezona - YTXX74YA3M"],

      titulosMo: [
        { text: "Referencia", align: "start", value: "refConsE" },
        { text: "Título", value: "tiConsE" },
        { text: "Cantidad", value: "cantConsE" },
      ],
      datosMo: [
        {
          refConsE: 'YTXX74YA3M',
          tiConsE: 'La tortuguita pescuezona',
          cantConsE: 100,
        },
        {
          refConsE: 'YTXXDEXA3M',
          tiConsE: 'La tortuguita pescuezona (Edición Deluxe)',
          cantConsE: 15,
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
