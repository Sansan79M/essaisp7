<template>
  <body>
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

    <!-- Page Content -->
    <main>
      <div id="profile">
        <div class="container">
          <div id="profile-row" class="row justify-content-center">
            <div id="profile-column" class="col-md-6">
              <div id="profile-box" class="col-md-12">
                <div id="profile-displayed">
                  <h1 class="text-center text-color">
                    Profil de {{user.username}}
                  </h1>
                  <br />
                  <div class="text-center">
                    <v-avatar>
                      <img id="avatar"
                        src="../../../backend/faces/NY.jpeg"
                        alt="Avatar de l'utilisateur"
                      />
                    </v-avatar>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">👔 {{user.service}}</p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">
                      ⌨️ {{user.bio}}
                    </p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">📧 {{user.email}}</p>
                  </div>
                  <br />
                  <div id="buttons">
                    <router-link :to="'modify'">
                      <button
                        type="submit"
                        name="update"
                        id="update"
                        class="btn text-white btn-md"
                        value="submit"
                      >MODIFIER</button>
                    </router-link>
                    <router-link :to="'/posts/news'">
                        <button
                          type="submit"
                          name="back-news"
                          id="back-news"
                          class="btn text-white btn-md"
                          value="FIL D'ACTUALITE"
                        >FIL D'ACTUALITE
                        </button></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      user: {
        userId:"",
        username: "Will SMITH",
        avatar:"",
        service: "Service informatique",
        bio: "Développeur front-end, recetteur. Aime la musique et les jeux vidéos.",
        email: "will.smith@groupomania.com",
      },
    };
  },

  methods: {
    userProfile(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.stringify(this.user),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/user/profile", myInit)
        .then((success) => {
          console.log(success + "Le profil utilisateur s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le profil utilisateur ne s'affiche pas");
        });
    },
     disconnect() {
      localStorage.clear();
      setTimeout(() => {
      this.$router.push({ path: '/' })
        window.location.reload();
         }, 500);
          }
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
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 110vh;
}
h1 {
  font-size: 30px;
}
#profile .container #profile-row #profile-column #profile-box {
  margin-top: 30px;
  max-width: 600px;
  height: 500px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#profile
  .container
  #profile-row
  #profile-column
  #profile-box
  #profile-displayed {
  padding: 20px;
}
#profile
  .container
  #profile-row
  #profile-column
  #profile-box
  #profile-displayed
  #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
button {
  background-color: #0b505b !important;
}
#profile-box {
  box-shadow: 10px 10px 10px #b32204;
}
#profile-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
#delete{
  margin-left : 20px;
}
#buttons{
  display: flex;
  justify-content: space-between;
}
</style>