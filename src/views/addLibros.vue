<template>
    <div class="contLibros">
        <div class="titulolib">
            <h1>Crear Nuevo Libro</h1>
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
                    <v-text-field dark
                    v-model="codigoisbn"
                    :counter="13"
                    :rules="codisbnru"
                    label="Código ISBN"
                    required
                    ></v-text-field>

                    <v-text-field dark
                    v-model="titulo"
                    :rules="tituloru"
                    label="Titulo del Libro"
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
            <div class="tablamuestralib">
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

.contLibros {
    /* background-color: white; */
    padding-top: 57px;
    box-sizing: border-box;
    display: block;
    justify-content: top;
    align-items: top;
    font-family: sans-serif;
}

.titulolib
{
    /* background-color: hotpink; */
    font-family: sans-serif;
    color: white;
    padding: 10px;
}

.objetoslib
{
    /* background-color: indigo; */
    display: flex;
    justify-content: top;
    align-items: top;
    font-family: sans-serif;
}

.formulariolib
{
    background-color: rgba(0,0,0,.25);
    padding:20px;
    border-radius: 5px;
    width: 30%;
    display:block;
    align-items: center;
    font-family: sans-serif;
}

.tablamuestralib
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
    data: () => ({
        valid: true,
        codigo: '',
        codru: [
        v => !!v || 'Este campo es obligatorio',
        v => (v && v.length <= 13) || 'El código ISBN no puede tener más de 13 caracteres',
        ],
        codigoisbn: '',
        codisbru: [
        v => !!v || 'Este campo es obligatorio',
        v => (v && v.length <= 10) || 'El código no puede tener más de 10 caracteres',
        ],
        valid: true,
        titulo: '',
        tituloru: [
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
        ]
    }),

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