<template>
  <!-- Navigation-->
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top" role="navigation">
      <div class="container">
        <router-link
          to="/"
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
          aria-label="Bouton de navigation"          
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link
                class="nav-link waves-effect"
                :to="'/user/login'"
                aria-label="Lien vers la page de connection"
              >
                CONNEXION
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link waves-effect"
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
  
</template>

<script>

export default {
  name: "headerNotConnected",
};
</script>

<style scoped>
.navbar {
  background-color: #0b505b;
}
header img {
    width: 200px;
}

</style>
