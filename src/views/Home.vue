<template>
  <div class="contenedorHome">
    <v-app-bar color="#f27459" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>East Book Inventory</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
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
}

@media screen and (max-width: 500px) {
  .form {
    padding: 16px;
  }
}
</style>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>