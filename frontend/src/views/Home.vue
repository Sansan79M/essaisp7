<template>
  <body>
    <!--<header>-->
    <header-not-connected></header-not-connected>

    <!-- Page Content -->
    <main>
      <div id="home" class="container">
        <div class="row-column justify-content-center text-center text-color">
          <img
            class="img-fluid"
            src="../assets/icon-above-font.png"
            alt="Grand logo Groupomania"
          />
          <h1 class="font-weight-bold">
            Bienvenue sur le réseau social interne de GROUPOMANIA
          </h1>
          <p>
            <br />
            Gardez le lien avec vos collègues en télétravail et au bureau,
            communiquez sur votre actualité.
          </p>
          <p>
            C'est simple, publier vos posts depuis votre ordinateur, mais aussi
            depuis votre mobile.
          </p>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import HeaderNotConnected from "../components/HeaderNotConnected.vue";

export default {
  components: { HeaderNotConnected },
  name: "home",
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