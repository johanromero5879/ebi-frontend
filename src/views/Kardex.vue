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

          <v-btn color="white" class="mr-4" outlined @click="validate">
            <v-icon left>mdi-format-list-bulleted</v-icon>
            Listar
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestraKa" align="center">

        <v-alert
          class="almuesKardex"
          v-if="muestraitem.va == 'si'"
          v-model="alert"
          close-text="Close Alert"
          color="black"
          text
        >
          <v-data-table
            item-key="name"
            class="elevation-1"
          >
          </v-data-table>

          <br>

          <v-btn color="white" class="mr-4" @click="cerrarKardex">
            <v-icon>mdi-close</v-icon>
          </v-btn>

        </v-alert>

        <v-data-table
          :headers="titulosMo"
          :items="datosMo"
          item-key="name"
          class="elevation-1"
          @click:row="listarKA"
          :search="search"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Buscar registro"
              class="mx-4"
            ></v-text-field>
          </template>
        </v-data-table>

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
</style>

<script>
export default {
  data() {
    return {
      muestraitem: {
        va: "no",
      },
      almKa: null,
      itemsKa: ["Tres pelagatos sas", "El lector"],

      titulosMo: [
        { text: "ID", align: "start", value: "idKA" },
        { text: "Fecha", value: "fechaKA" },
      ],
      datosMo: [
        {
          idKA: "192837465",
          fechaKA: "02-03-2021",
        },
        {
          idKA: "546372819",
          fechaKA: "12-01-2020",
        },
      ],
    };
  },
  methods: {
    listarKA(item) {
      // alert('Diste clic a ' + item.detalleMov);
      this.muestraitem.va = 'si'
    },
    validate() {
      this.$refs.form.resetValidation();
    },
    cerrarKardex() {
      this.muestraitem.va = 'no'
    },
  },
};
</script>
