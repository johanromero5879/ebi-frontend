<template>
  <div class="contuser">
    <div class="titulouser">
      <v-icon dark left> mdi-account </v-icon>
      <h1>Registro de usuarios</h1>
    </div>
    <div class="objetosuser">
      <div class="formulariouser">
        <v-form
          class="forma"
          align="center"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            dark
            v-model="nombreap"
            :rules="nomapru"
            label="Nombres y Apellidos"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="cedula"
            :counter="10"
            :rules="ccru"
            label="Cédula"
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

          <v-text-field
            dark
            v-model="nombreusu"
            :rules="nomusuru"
            label="Nombre de usuario"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="contras"
            :rules="contrasru"
            label="Cree una contraseña"
            outlined
            required
          ></v-text-field>

          <v-select
            dark
            :items="items"
            :rules="[(v) => !!v || 'Esta selección es obligatoria']"
            label="Tipo de usuario"
            outlined
            aria-required=""
          ></v-select>

          <v-btn color="white" class="mr-4" outlined @click="validate">
            <v-icon left>mdi-content-save</v-icon>
            Guardar
          </v-btn>

          <v-btn color="white" outlined @click="resetValidation">
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>
        </v-form>
      </div>
      <div class="tablamuestralib">
        <v-data-table
          :headers="titulosUsuarios"
          :items="datosUsuarios"
          item-key="name"
          class="elevation-1"
          :search="buscarUsu"
          v-model="selectedUsu"
          @click:row="handleClickUsu"
        >

           <template slot="items" slot-scope="props">
          <tr @click="showAlert(props.item)">
          <td>{{ props.item.CodigoUsuario }}</td>
          <td class="text-xs-right">{{ props.item.NomApeUsu }}</td>
          <td class="text-xs-right">{{ props.item.ccUsu }}</td>
          <td class="text-xs-right">{{ props.item.DirecUsu }}</td>
          <td class="text-xs-right">{{ props.item.TelUsu }}</td>
          <td class="text-xs-right">{{ props.item.EmailUsu }}</td>
          <td class="text-xs-right">{{ props.item.NomUsu }}</td>
          <td class="text-xs-right">{{ props.item.TipUsu }}</td>
            </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          su busqueda de "{{ buscarUsu }}" no se encuentran resultados.
        </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="buscarUsu"
              label="Buscar usuarios"
              class="mx-4"
              append-icon="search"
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
.contuser {
  /* background-color: white; */
  padding-top: 80px;
  padding-left: 40px;
  padding-right: 20px;
  box-sizing: border-box;
  display: block;
  justify-content: top;
  align-items: top;
  font-family: sans-serif;
}

.titulouser {
  /* background-color: hotpink; */
  display: flex;
  color: white;
  padding: 10px;
}

.objetosuser {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formulariouser {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 27%;
  display: block;
  align-items: center;
}
</style>

<script>
export default {
  data: () => ({
    items: ["Administrador", "Contador", "Operador", "Bodeguero"],
    valid: true,
    cedula: "",
    ccru: [
      (v) => !!v || "Este campo es obligatorio",
      (v) =>
        (v && v.length <= 10) ||
        "El código no puede tener más de 10 caracteres",
    ],
    contras: "",
    contrasru: [
      (v) => !!v || "Este campo es obligatorio",
      (v) => (v && v.length < 8) || "La contraseña es debil",
    ],
    valid: true,
    nombreap: "",
    nomapru: [(v) => !!v || "Este campo es obligatorio"],
    nombreusu: "",
    nomusuru: [(v) => !!v || "Este campo es obligatorio"],
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

    selectedUsu:[],
    buscarUsu: '',

    titulosUsuarios: [
      {
        text: "Código",
        align: "start",
        value: "CodigoUsuario",
      },
      { text: "Nombres y Apellidos", value: "NomApeUsu" },
      { text: "Cédula", value: "ccUsu" },
      { text: "Direccion", value: "DirecUsu" },
      { text: "Teléfono", value: "TelUsu" },
      { text: "Correo", value: "EmailUsu" },
      { text: "Nombre de usuario", value: "NomUsu" },
      { text: "Tipo de usuario", value: "TipUsu" },
    ],
    datosUsuarios: [
      {
        CodigoUsuario: 1234567890,
        NomApeUsu: "Juan Sebastian Vicaña Barrios",
        ccUsu: 1105693247,
        DirecUsu: "mz 19 casa 6 balkanes",
        TelUsu: "3223055188",
        EmailUsu: "junsevicabarrios@gmail.com",
        NomUsu: "Sebas117",
        TipUsu: "Administrador",
      },
      {
        CodigoUsuario: 1234567890,
        NomApeUsu: "Sebastian Pachon Morales",
        ccUsu: 1105693265,
        DirecUsu: "no se xD",
        TelUsu: "9463218946",
        EmailUsu: "spacmor@gmail.com",
        NomUsu: "SebPac",
        TipUsu: "Administrador",
      },
    ],
  }),

  methods: {

      handleClickUsu(item) {
      alert('Codigo ' + item.CodigoUsuario +' Nombre completo: '+ item.NomApeUsu+' Cedula: '+ item.ccUsu+' Direccion: '+ item.DirecUsu+
      ' Telefono: '+ item.TelUsu+' E-mail: '+ item.EmailUsu+' Nombre de usuario: '+ item.NomUsu+' Tipo de usuario: '+ item.TipUsu+' ');
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