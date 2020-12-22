<template>
  <!-- Navigation-->
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-dark fixed-top"
      role="navigation"
    >
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
                :to="{ name: 'profile', params: { id: user.id } }"
                aria-label="Lien vers la page du profil utilisateur"
              >
                PROFIL</router-link
              >
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link
                class="nav-link"
                :to="'/trafic'"
                aria-label="Lien vers le tableau de bord"
              >
                TRAFIC</router-link
              >
            <li class="nav-item">
              <div
                id="disconnect"
                class="nav-link"
                aria-label="Déconnexion et retour vers la page d'accueil"
                @click="disconnect"
              >
                DECONNEXION
              </div>
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
  data() {
    return {
      user: {
      },
      isAdmin: false,
    };
  },
    mounted() {
    this.userProfile();
  },

  methods: {
    userProfile() { 
      const storage = JSON.parse(localStorage.getItem("storage_user"));
      fetch("http://localhost:3000/api/user/profile/" + storage.userId)
        .then((response) => {
          response.json()
          .then(user => {
            this.user = user;
          })
          console.log(response + "Le lien vers le profil utilisateur s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le lien vers le profil utilisateur ne s'affiche pas");
        });
    },
 
    //Déconnection
    disconnect() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push({ path: "/" });
        console.log("L'utilisateur s'est déconnecté")
      }, 600);
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
#disconnect {
  cursor: pointer;
}
</style>