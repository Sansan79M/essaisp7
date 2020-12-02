<template>
  <!-- Navigation-->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <img
          class="navbar-brand"
          aria-label="Lien vers la page d'accueil"
          src="../assets/icon-white.png"
          alt="Logo Groupomania"
        />
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
                :to="'/posts/news'"
                aria-label="Lien vers la page fil d'actualité"
              >
                FIL D'ACTUALITE
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="'/posts/create'"
                aria-label="Lien vers la page de création de message"
              >
                CREER UN MESSAGE</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="'/user/profile'"
                aria-label="Lien vers la page du profil utilisateur"
              >
                PROFIL</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="'/'"
                aria-label="Déconnexion et retour vers la page d'accueil"
                @click="disconnect"
              >
                DECONNEXION</router-link
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
  name: "headerConnected",
  methods: {
    //Déconnection
    disconnect() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push({ path: "/" });
        window.location.reload();
      }, 500);
    },
  },
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