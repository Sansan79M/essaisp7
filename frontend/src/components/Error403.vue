<template>
  <body>
    <!--<header>-->
    <header-error></header-error>

    <!-- Page Content -->
    <main>
      <div id="error403" class="container">
        <div class="row-column justify-content-center text-center text-color">
          <img
            class="img-fluid"
            src="../assets/stop.jpg"
            alt="Grand logo Groupomania"
          />
          <h1 class="font-weight-bold">ERREUR 403</h1>
          <p class="font-weight-bold">
            VOUS N'ETES PAS AUTORISE A CONSULTER CETTE PAGE
          </p>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import HeaderError from "../components/HeaderError";

export default {
  components: { HeaderError },
  name: "error403",
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 200vh;
}
main img {
  height: 20em;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid #0b505b;
  box-shadow: 10px 10px 10px #b32204;
}
main img:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
.text-color {
  color: #0b505b !important;
}
.font-weight-bold {
  font-size: 25px;
}
</style>