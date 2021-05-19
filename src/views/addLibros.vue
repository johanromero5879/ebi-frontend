<template>
  <div class="contLibros">
    <div class="titulolib">
      <v-icon dark left> mdi-book-open-blank-variant </v-icon>
      <h1>Registro de libros</h1>
    </div>
    <div class="objetoslib">
      <div class="formulariolib">
        <v-form
          class="forma"
          align="center"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            dark
            v-model="codigoisbn"
            :counter="13"
            :rules="codisbru"
            label="Código ISBN"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="titulo"
            :rules="tituloru"
            label="Titulo del Libro"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="autor"
            :rules="autoru"
            label="Autor"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="categoria"
            :rules="cateru"
            label="Categoria"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="tema"
            :rules="temru"
            label="Tema"
            outlined
            required
          ></v-text-field>

          <v-text-field
            dark
            v-model="anu"
            :rules="anuru"
            label="Año"
            outlined
            required
          ></v-text-field>
          
          <v-text-field
            dark
            v-model="costo"
            :rules="costoru"
            label="Costo del Libro"
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

          <v-btn color="white" outlined @click="resetValidation">
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>

          <br>
          <br>

          <v-btn color="white" outlined @click="mostrarRef">
            <v-icon left>mdi-file-eye</v-icon>
            Ver referencias
          </v-btn>
        </v-form>
      </div>
      <v-spacer></v-spacer>
      <div class="tablamuestralib">
        <v-data-table
          :headers="tituloslib"
          :items="datoslib"
          item-key="name"
          class="elevation-1"
          @click:row="handleClickLib"
          :search="search"
          v-model="selectedLib"
        >

        <template slot="items" slot-scope="props">
          <tr @click="showAlert(props.item)">
            <td>{{ props.item.CodigoLib }}</td>
            <td class="text-xs-right">{{ props.item.CodIsbn }}</td>
            <td class="text-xs-right">{{ props.item.TituloLib }}</td>
            <td class="text-xs-right">{{ props.item.AutorLib }}</td>
            <td class="text-xs-right">{{ props.item.CategoriaLib }}</td>
            <td class="text-xs-right">{{ props.item.TemaLib }}</td>
            <td class="text-xs-right">{{ props.item.AnuLib }}</td>
            <td class="text-xs-right">{{ props.item.CostoLib }}</td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
          No se encontraron resultados para "{{ search }}".
        </v-alert>

          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Buscar libros"
              class="mx-4"
              append-icon="mdi-magnify"
              single-line
              color="orange"
              hide-details
            ></v-text-field>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-overlay align="center" class="overlref" :value="overlayferen" opacity="0.7">

      <div class="formulariorefer">
        <v-form
          class="forma"
          align="center"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            light
            v-model="nombredLibr"
            :rules="nombredLibru"
            label="Nombre del libro"
            outlined
            required
          ></v-text-field>

          <v-text-field
            light
            v-model="precioCoLib"
            :rules="precioCoLibru"
            label="Costo"
            outlined
            required
          ></v-text-field>

          <v-btn color="black" class="mr-4" outlined @click="validate">
            <v-icon left>mdi-content-save</v-icon>
            Guardar
          </v-btn>

          <v-btn color="black" class="mr-4" outlined @click="reset">
            <v-icon left>mdi-pencil</v-icon>
            Editar
          </v-btn>

          <v-btn color="black" outlined @click="resetValidation">
            <v-icon left>mdi-delete</v-icon>
            Eliminar
          </v-btn>
        </v-form>
      </div>

      <br>

      <div class="tablamuestraref">
        <v-data-table
          light
          :hide-default-footer="true"
          disable-pagination
          height="240px"
          :headers="titulosref"
          :items="datosref"
          item-key="name"
          class="elevation-1"
          @click:row="clickRef"
          v-model="selectedLib"
        >
        </v-data-table>
      </div>
      <br>
      <v-btn color="white" light @click="ocultarRef">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </div>
</template>


<style>
.contLibros {
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

.titulolib {
  /* background-color: hotpink; */
  display: flex;
  color: white;
  padding: 10px;
}

.objetoslib {
  /* background-color: indigo; */
  display: flex;
  justify-content: top;
  align-items: top;
}

.formulariolib {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
  width: 30%;
  display: block;
  align-items: center;
}

.formulariorefer {
  background-color: rgba(255, 255, 255);
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  display: block;
  align-items: center;
}

.tablamuestraref {
  width: 100%;
}

.tablamuestralib {
  /* background-color: green; */
  padding-top: 0px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 70%;
}

.overlref {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlref .v-overlay__content {
  width: 50%;
  display: block;
}

</style>

<script>
export default {
  
  data: () => ({

    overlayferen: false,

    valid: true,
    codigoisbn: "",
    codisbru: [
      (v) => !!v || "Este campo es obligatorio",
      (v) => (v && v.length > 9) || "ISBN no puede tener menos de 10 digitos",
      (v) => (v && v.length < 14) || "ISBN no puede tener mas de 13 digitos",
    ],

    titulo: "",
    tituloru: [(v) => !!v || "Este campo es obligatorio"],
    
    autor: "",
    autoru: [(v) => !!v || "Este campo es obligatorio"],

    categoria: "",
    cateru: [(v) => !!v || "Este campo es obligatorio"],

    tema: "",
    temru: [(v) => !!v || "Este campo es obligatorio"],

    anu: "",
    anuru: [
      (v) => !!v || "Este campo es obligatorio",
      (v) => (v && v.length <= 4) || "El dato del año no es valido",
    ],
    costo: "",
    costoru: [
      (v) => !!v || "Este campo es obligatorio",
      (v) => (v && v.length <= 4) || "El dato del año no es valido",
    ],

    nombredLibr: "",
    nombredLibru: [(v) => !!v || "Este campo es obligatorio"],

    precioCoLib: "",
    precioCoLibru: [(v) => !!v || "Este campo es obligatorio"],
    
      selected:[],
      search: '',
  tituloslib: [
      {
        text: "Código",
        align: "start",
        value: "CodigoLib",
      },
      { text: "ISBN", value: "CodIsbn" },
      { text: "Titulo", value: "TituloLib" },
      { text: "Autor", value: "AutorLib" },
      { text: "Categoria", value: "CategoriaLib" },
      { text: "Tema", value: "TemaLib" },
      { text: "Año", value: "AnuLib" },
      { text: "Editorial", value: "editLib" },
    ],
    datoslib: [
      {
        CodigoLib: 1234567890,
        CodIsbn: 1234567895,
        TituloLib: "El resplandor",
        AutorLib: "Stephen King",
        CategoriaLib: "Terror",
        TemaLib: "Adultos",
        AnuLib: 1977,
        editLib: "Debolsillo",
      },
      {
        CodigoLib: 5695426546,
        CodIsbn: 9781234567897,
        TituloLib: "Luna de Plutón",
        AutorLib: "Dross Rotzank",
        CategoriaLib: "Entretenimiento",
        TemaLib: "Infantil",
        AnuLib: 2015,
        editLib: "Grupo planeta",
      },
    ],
    titulosref: [
      { text: "Referencia", align: "start", value: "reflibr", },
      { text: "Nombre", value: "nomref" },
      { text: "Costo", value: "costref" },
    ],
    datosref: [
      {
        reflibr: 'C3GTNC1NMI',
        nomref: 'Luna de Plutón',
        costref: '78500',
      },
      {
        reflibr: 'H9U0WQ0N1T',
        nomref: 'Luna de Plutón (Edición especial)',
        costref: '97000',
      },
    ]
  }),

  methods: {
    handleClickLib(item) {
      alert('Codigo ' + item.CodigoLib +' ISBN: '+ item.CodIsbn+' Titulo: '+ item.TituloLib+' Autor: '+ item.AutorLib+
      ' Categoria: '+ item.CategoriaLib+' Tema: '+ item.TemaLib+' Año: '+ item.AnuLib+' Costo: '+ item.CostoLib+' ');
    },
    clickRef(item) {
      alert('Referencia: ' + item.reflibr + '\nNombre: ' + item.nomref + '\nCosto: ' + item.costref);
    },
    mostrarRef(){
      this.overlayferen = true;
    },
    ocultarRef(){
      this.overlayferen = false;
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
