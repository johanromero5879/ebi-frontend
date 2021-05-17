<template>
  <div class="contEditoriales">
    <div class="tituloEd">
      <v-icon dark left>mdi-library</v-icon>
      <h1>Registro de editoriales</h1>
    </div>
    <div class="objetosEd">
      <div class="formularEd">
        <v-form
          class="forma"
          align="center"
          ref="form"
          v-model="valid"
          lazy-validation
        >


          <v-text-field
            dark
            v-model="nombreEd"
            :rules="nomruEd"
            label="Nombre"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="direccionEd"
            :rules="dirruEd"
            label="Dirección"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="telefonoEd"
            :rules="telruEd"
            label="Teléfono"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="correoEd"
            :rules="corruEd"
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
      <div class="tablamuestraEd">
        <v-data-table
          :headers="titulosEd"
          :items="datosEd"
          item-key="name"
          class="elevation-1"
          :search="buscarEd"
          v-model="selectedEd"
          @click:row="handleClickEd"
        >

          <template slot="items" slot-scope="props">
          <tr @click="showAlert(props.item)">
          <td>{{ props.item.codigoAlm }}</td>
          <td class="text-xs-right">{{ props.item.nombreEdi }}</td>
          <td class="text-xs-right">{{ props.item.direccionEdi }}</td>
          <td class="text-xs-right">{{ props.item.telefonoEdi }}</td>
          <td class="text-xs-right">{{ props.item.correoEdi }}</td>
            </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
          No se encontraron resultados para "{{ buscarEd }}".
        </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarEd"
              label="Buscar editoriales"
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
.contEditoriales {
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

.tituloEd {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}

.objetosEd {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formularEd {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: top;
}

.tablamuestraEd {
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
      nombreEd: "",
      nomruEd: [(v) => !!v || "Este campo es obligatorio"],

      valid: true,
      direccionEd: "",
      dirruEd: [(v) => !!v || "Este campo es obligatorio"],

      valid: true,
      telefonoEd: "",
      telruEd: [(v) => !!v || "Este campo es obligatorio"],

      correoEd: "",
      corruEd: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "El correo debe tener un formato válido",
      ],
    selectedEd:[],
    buscarEd: '',
      titulosEd: [
        {
          text: "Código",
          align: "start",
          value: "codigoEdi",
        },
        { text: "Nombre", value: "nombreEdi" },
        { text: "Dirección", value: "direccionEdi" },
        { text: "Teléfono", value: "telefonoEdi" },
        { text: "Correo Electrónico", value: "correoEdi" },
      ],
      datosEd: [
        {
          codigoEdi: 1234567890,
          nombreEdi: "Santillana",
          direccionEdi: "Calle 50A # 6-19",
          telefonoEdi: 3025846359,
          correoEdi: "contacto@satillana.com",
        },
        {
          codigoEdi: 9987654321,
          nombreEdi: "Grupo planeta",
          direccionEdi: "Trasversar 16B # 3-18",
          telefonoEdi: 3125946800,
          correoEdi: "contacto@grupoplaneta.com",
        },
      ],
    };
  },
  methods: {

      handleClickEd(item) {
      alert('Codigo ' + item.codigoEdi +' Nombre Editorial: '+ item.nombreEdi+' Direccion: '+ item.direccionEdi+' Telefono: '+ item.telefonoEdi+
      ' E-mail: '+ item.correoEdi);
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
