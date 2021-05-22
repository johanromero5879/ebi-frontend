<template>
  <div class="contenedorHome">
    <v-app-bar dark height="65px" absolute src="~@/assets/img/loginbg.png">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient=" rgba(242,116,89,0.6), rgba(242,116,89,0.2)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <div>
        <v-img src="~@/assets/img/logo_obj.png" width="70px"></v-img>
      </div>
      <v-spacer></v-spacer>
      <!-- <v-btn outlined @click="logout">
        <v-icon left>mdi-exit-to-app</v-icon>
        Cerrar sesión
      </v-btn> -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon dark v-bind="attrs" v-on="on">
            mdi-arrow-down-drop-circle-outline
          </v-icon>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item>
              <v-avatar
                color="orange"
                size="36"
                style="margin-right: 16px"
              >
                <span class="white--text headline">{{ `${usuario.nombres[0]}${usuario.apellidos[0]}` }}</span>
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ `${usuario.nombres} ${usuario.apellidos}` }}</v-list-item-title>
                <v-list-item-subtitle>{{ usuario.tipo }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="logout"
                >Cerrar sesión</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/home" color="orange">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/home/crear_usuario"
            color="orange"
            v-if="usuario.tipo == 'Administrador'"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/home/crear_libro"
            color="orange"
            v-if="usuario.tipo == 'Administrador'"
          >
            <v-list-item-icon>
              <v-icon> mdi-book-open-blank-variant </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Libros</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/home/almacenes"
            color="orange"
            v-if="usuario.tipo == 'Administrador'"
          >
            <v-list-item-icon>
              <v-icon> mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Almacenes</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/home/editoriales"
            color="orange"
            v-if="usuario.tipo == 'Administrador'"
          >
            <v-list-item-icon>
              <v-icon> mdi-library</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Editoriales</v-list-item-title>
          </v-list-item>

          <v-list-item to="/home/consultar-existencias" color="orange">
            <v-list-item-icon>
              <v-icon>mdi-book-information-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Existencias de libros</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/home/movimientos"
            color="orange"
            v-if="usuario.tipo == 'Administrador' || usuario.tipo == 'Operador'"
          >
            <v-list-item-icon>
              <v-icon>mdi-text-box-search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Movimientos</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/home/kardex"
            color="orange"
            v-if="usuario.tipo == 'Administrador' || usuario.tipo == 'Contador'"
          >
            <v-list-item-icon>
              <v-icon>mdi-currency-usd</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Kardex</v-list-item-title>
          </v-list-item>
          <v-list-item to="/home/Manual_usuario" color="orange">
            <v-list-item-icon>
              <v-icon>mdi-book-open-page-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Manual de Usuario</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>
<style>
.formHome {
  border: white;
  opacity: 1 !important;
  width: 1500px;
  height: 800px;
  padding: 0px;
}

.contenedorHome {
  min-height: 100vh;
  box-sizing: border-box;
  background: url("~@/assets/img/loginbg.png");
  background-size: cover;
  font-family: sans-serif;
}

@media screen and (max-width: 500px) {
  .form {
    padding: 16px;
  }
}
</style>

<script>
import { obtenerUsuario, cerrarSesion } from "../utils";

export default {
  data: () => ({
    drawer: false,
    group: null,
    usuario: {
      _id: "",
      nombres: "",
      apellidos: "",
      n_documento: "",
      tipo: "",
    },
  }),
  methods: {
    logout() {
      cerrarSesion(this.$router);
    },
  },
  beforeMount() {
    this.usuario = obtenerUsuario();
  },
};
</script>