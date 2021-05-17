<template>
  <div class="contAlmacenes">
    <div class="titulo">
      <v-icon dark left>mdi-store</v-icon>
      <h1>Registro de almacenes</h1>
    </div>
    <div class="objetos">
      <div class="formular">
        <v-form
          class="forma"
          align="center"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            dark
            v-model="codigo"
            :counter="10"
            :rules="codru"
            label="Código"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            dark
            v-model="nombre"
            :rules="nomru"
            label="Nombre"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="direccion"
            :rules="dirru"
            label="Dirección"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="telefono"
            :rules="telru"
            label="Teléfono"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="correo"
            :rules="corru"
            label="Correo electrónico"
            outlined
            required
          ></v-text-field>

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
      <div class="tablamuestra">
        <v-data-table
          :headers="titulosAl"
          :items="datosAl"
          item-key="name"
          class="elevation-1"
          :search="buscarAlm"
          v-model="selectedAlm"
          @click:row="handleClickAlm"
        >

          <template slot="items" slot-scope="props">
          <tr @click="showAlert(props.item)">
          <td>{{ props.item.codigoAlm }}</td>
          <td class="text-xs-right">{{ props.item.nombreAlm }}</td>
          <td class="text-xs-right">{{ props.item.direccionAlm }}</td>
          <td class="text-xs-right">{{ props.item.telefonoAlm }}</td>
          <td class="text-xs-right">{{ props.item.correoAlm }}</td>
            </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
          No se encontraron resultados para "{{ buscarAlm }}".
        </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarAlm"
              label="Buscar almacenes"
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
.contAlmacenes {
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

.titulo {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}

.objetos {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formular {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
}

.tablamuestra {
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
      codigo: "",
      codru: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (v && v.length <= 10) ||
          "El código no puede tener más de 10 caracteres",
      ],

      valid: true,
      nombre: "",
      nomru: [(v) => !!v || "Este campo es obligatorio"],

      valid: true,
      direccion: "",
      dirru: [(v) => !!v || "Este campo es obligatorio"],

      valid: true,
      telefono: "",
      telru: [(v) => !!v || "Este campo es obligatorio"],

      correol: "",
      corru: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "El correo debe tener un formato válido",
      ],

    selectedAlm:[],
    buscarAlm: '',

      titulosAl: [
        {
          text: "Código",
          align: "start",
          value: "codigoAlm",
        },
        { text: "Nombre", value: "nombreAlm" },
        { text: "Dirección", value: "direccionAlm" },
        { text: "Teléfono", value: "telefonoAlm" },
        { text: "Correo Electrónico", value: "correoAlm" },
      ],
      datosAl: [
        {
          codigoAlm: 1234567890,
          nombreAlm: "Tres pelagatos sas",
          direccionAlm: "Calle 30B # 2-19",
          telefonoAlm: 3048463944,
          correoAlm: "contacto@trespel.com",
        },
        {
          codigoAlm: 9987654321,
          nombreAlm: "El lector",
          direccionAlm: "Trasversal 5A # 2-14",
          telefonoAlm: 3135994633,
          correoAlm: "contacto@ellector.com",
        },
      ],
    };
  },
  methods: {

    handleClickAlm(item) {
      alert('Codigo ' + item.codigoAlm +' Nombre almacen: '+ item.nombreAlm+' Direccion: '+ item.direccionAlm+' Telefono: '+ item.telefonoAlm+
      ' E-mail: '+ item.correoAlm);
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
