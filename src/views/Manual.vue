<template>
  <div class="contManual">

    <div class="tituloMan">
      <v-icon dark left>mdi-book-open-page-variant</v-icon>
      <h1>Manual de Usuario</h1>
    </div>
 <iframe src="https://www.docdroid.net/kRGxhau/manual-de-usuario-pdf#zoom=100" class="pdfv" style="border: none;"></iframe>
</div>
</template>


<style>
.contManual {
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
.tituloMan {
  /* background-color: hotpink; */
  color: white;
  padding: 10px;
  display: flex;
}

.pdfv {
  width: 100%;
  height: 80vh;
}

</style>