<template>
    <div class="contAlmacenes">
        <div class="titulo">
            <h1>Información de los almacenes</h1>
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
                    <v-text-field dark
                    v-model="codigo"
                    :counter="10"
                    :rules="codru"
                    label="Código"
                    required
                    >
                    </v-text-field>

                    <v-text-field dark
                    v-model="nombre"
                    :rules="nomru"
                    label="Nombre"
                    required
                    ></v-text-field>

                    <v-text-field dark
                    v-model="direccion"
                    :rules="dirru"
                    label="Dirección"
                    required
                    ></v-text-field>

                    <v-text-field dark
                    v-model="telefono"
                    :rules="telru"
                    label="Teléfono"
                    required
                    ></v-text-field>

                    <v-text-field dark
                    v-model="correo"
                    :rules="corru"
                    label="Correo electrónico"
                    required
                    ></v-text-field>

                    <br>
                    <br>

                    <v-btn
                    color="white"
                    class="mr-4"
                    outlined
                    @click="validate"
                    >
                    <v-icon left>mdi-content-save</v-icon>
                    Guardar
                    </v-btn>

                    <v-btn
                    color="white"
                    class="mr-4"
                    outlined
                    @click="reset"
                    >
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
                    :headers="headers"
                    :items="desserts"
                    item-key="name"
                    class="elevation-1"
                    :search="search"
                >
                    <template v-slot:top>
                    <v-text-field
                        v-model="search"
                        label="Buscar almacenes"
                        class="mx-4"
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

.titulo
{
    /* background-color: hotpink; */
    font-family: sans-serif;
    color: white;
    padding: 10px;
}

.objetos
{
    /* background-color: indigo; */
    display: flex;
    justify-content: top;
    align-items: top;
    font-family: sans-serif;
}

.formular
{
    background-color: rgba(0,0,0,.25);
    padding:20px;
    border-radius: 5px;
    width: 30%;
    display: block;
    align-items: top;
    font-family: sans-serif;
}

.tablamuestra
{
    /* background-color: green; */
    padding-top: 0px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    width: 70%;
    font-family: sans-serif;
}
</style>

<script>
  export default {
    data () {
      return {

        usuario: {
            tipo: "xd"
        },
        valid: true,
        codigo: '',
        codru: [
        v => !!v || 'Este campo es obligatorio',
        v => (v && v.length <= 10) || 'El código no puede tener más de 10 caracteres',
        ],

        valid: true,
        nombre: '',
        nomru: [
        v => !!v || 'Este campo es obligatorio',
        ],

        valid: true,
        direccion: '',
        dirru: [
        v => !!v || 'Este campo es obligatorio',
        ],

        valid: true,
        telefono: '',
        telru: [
        v => !!v || 'Este campo es obligatorio',
        ],

        correol: '',
        corru: [
        v => !!v || 'Este campo es obligatorio',
        v => /.+@.+\..+/.test(v) || 'El correo debe tener un formato válido',
        ],

        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>