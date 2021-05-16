<template>
    <div class="contAlmacenes">
        <div class="titulo">
            <h1>Crear nuevo usuario</h1>
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
                    v-model="nombre"
                    :rules="nomru"
                    label="Nombre"
                    required
                    ></v-text-field>

                    <v-text-field dark
                    v-model="cedula"
                    :counter="10"
                    :rules="ccru"
                    label="Cedula"
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
                    
                    <v-text-field dark
                    v-model="nombreusu"
                    :rules="nomusuru"
                    label="Nombre de usuario"
                    required
                    ></v-text-field>

                    <v-text-field dark
                    v-model="contras"
                    :rules="contrasru"
                    label="Cree una contraseña"
                    required
                    ></v-text-field>

                    <v-select dark
                    :items="items"
                    label="Tipo de usuario"
                    aria-required=""
                    ></v-select>

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
                    outlined
                    @click="resetValidation"
                    >
                    <v-icon left>mdi-delete</v-icon>
                    Eliminar
                    </v-btn>
                </v-form>
            </div>
            <v-spacer></v-spacer>
            
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


</style>

<script>
  export default {
    data: () => ({
        items: ['Administrador', 'Contador', 'Operador', 'Bodeguero'],
        valid: true,
        cedula: '',
        ccru: [
        v => !!v || 'Este campo es obligatorio',
        v => (v && v.length <= 10) || 'El código no puede tener más de 10 caracteres',
        ],
        contras: '',
        contrasru: [
        v => !!v || 'Este campo es obligatorio',
        v => (v && v.length < 8) || 'La contraseña es debil',
        ],
        valid: true,
        nombre: '',
        nomru: [
        v => !!v || 'Este campo es obligatorio',
        ],
        nombreusu: '',
        nomusuru: [
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