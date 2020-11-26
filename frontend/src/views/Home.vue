<template>
  <body>
    <!-- Navigation-->
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
          <router-link to="/"
            aria-label="Lien vers la page d'accueil"
            class="navbar-brand"
            ><img src="../assets/icon-white.png" alt="Logo Groupomania"
          /></router-link>

          <!--Responsive burger menu-->
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <router-link
                  class="nav-link"
                  :to="'/user/login'"
                  aria-label="Lien vers la page de connection"
                >
                  CONNEXION
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="'/user/signup'"
                  aria-label="Lien vers la page d'inscription"
                >
                  INSCRIPTION</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

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
          <p><br>
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
export default {
  name: "home",
};
</script>

<style scoped>
.navbar {
  background-color: #0b505b;
}
header img {
    width: 200px;
}
h1{
    font-size: 30px;
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 120vh;
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