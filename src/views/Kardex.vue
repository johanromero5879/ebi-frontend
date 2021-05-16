<template>
    <div class="contKardex">
        <div class="tituloKardex">
          <v-icon dark left> mdi-book-open </v-icon>
            <h1>Bienvenido al Kardex</h1>
        </div>
        <div class="objetosKardex">
            <div class="tablaKardex">
                <v-data-table
                    :headers="titulosKardex"
                    :items="datosKardex"
                    item-key="name"
                    class="elevation-1"
                    :search="search"
                >
                    <template v-slot:top>
                    <v-text-field
                        v-model="search"
                        label="Buscar libros"
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

.tituloKardex
{
    /* background-color: hotpink; */
    display: flex;
    color: white;
    padding: 10px;
}

.objetosKardex
{
    /* background-color: indigo; */
    display: flex;
    justify-content: top;
    align-items: top;
}

.formularioKardex
{
    background-color: rgba(0,0,0,.25);
    padding:20px;
    border-radius: 5px;
    width: 30%;
    display:block;
    align-items: center;
}

.tablaKardex
{
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
    data: () => ({
          titulosKardex: [
          {
            text: 'Codigo Almacen',
            align: 'start',
            value: 'CodigoAlm',
          },
          { text: '', value: 'Cod' },
        ],
        datosKardex: [
          {
            CodigoAlm: 1234567890,
            Cod: 1234567895,
          },
          {
            CodigoAlm: 5695426546,
            Cod: 9781234567897 
          },
          
        ],

        
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