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
                    ></v-text-field>

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
    padding-top: 57px;
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
    display:block;
    align-items: center;
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
    data: () => ({
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
