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
      <div class="container">
        <div>
          <v-card max-width="800" class="mx-auto text-center effect" id="v-card-h1">
            <h1 class="text-color">FIL D'ACTUALITE</h1>
          </v-card>
        </div>
        <br />

        <!--<ul v-for="value in onePost" :key="value">
          <li>{{value}}</li>
        </ul>-->

        <v-card max-width="800" class="mx-auto effect">
          <v-toolbar class="bg-color">
            <v-toolbar-title>
              <router-link
                class="text-color"
                :to="'create'"
                aria-label="Lien vers la page de création de message"
                >💬 CREER UN MESSAGE</router-link>
            </v-toolbar-title>
          </v-toolbar>

          <v-list>
            
            <v-list-item v-for="onePost in AllPosts" :key="onePost" @click="getOnePost">
              <v-list-item-content >
                <v-list-item-title
                  v-text="post"
                  class="text-color"
                >{{onePost.title}} {{onePost.datetime}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          
          </v-list>
        </v-card>
<!--v-if="AllPosts.length >= 8"-->
<br>
 <div class="text-center" >
    <v-pagination
      v-model="page"
      :length="4"
      circle
    ></v-pagination>
  </div>

        <!--<div id="news">
        <div class="container">
          <div id="news-row" class="row justify-content-center">
            <div id="news-column" class="col-md-6">
              <div id="news-box" class="col-md-12">
                <div id="news-displayed">
                  <h1 class="text-center text-color">Fil d'actualité</h1>
                  <br />
                  <div class="text-left">
                    <p class="text-color">Titre du message</p>
                    <br />
                  </div>
                  <div class="text-left">
                    <p class="text-color">Corps du message</p>
                    <br />
                  </div>
                  <div class="text-left">
                    <br />
                    <router-link :to="'post'">
                      <button
                        type="submit"
                        name="submit"
                        class="btn text-white btn-md"
                        value="submit"
                      >
                        Consulter
                      </button></router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: "news",
  data() {
    return {
      onePost: 
          { id:"",
            userId:"",
            title: "📝 Title", 
            datetime: "⌚ Datetime"
          },
      allPosts: [],
      page: ""
    };
  },
  methods: {
    //Affichage du fil d'actualité
    listPosts(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.stringify(this.allPosts),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/news", myInit)
        .then((success) => {
          console.log(success + "Le fil d'actualité s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le fil d'actualité ne s'affiche pas");
        });
    },
  //Clic sur un message pour voir le message
    getOnePost(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.stringify(this.onePost),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/news", myInit)
        .then((success) => {
          this.$router.push({ path: '/posts/post' });

          console.log(success + "Le lien vers le post choisi fonctionne");
        })
        .catch((error) => {
          console.log(error + "Le lien vers le post choisi ne fonctionne pas");
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
h1 {
  font-size: 30px;
}
#v-card-h1{
  font-size: 30px;
  margin-top: 40px;
  padding: 10px;
  background-color: rgb(252, 252, 111);
}
.effect{
  border: 1px solid #0b505b;
  box-shadow: 10px 10px 10px #b32204;
}
.effect:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}



main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 100vh;
}
/*#news .container #news-row #news-column #news-box {
  margin-top: 30px;
  max-width: 600px;
  height: 340px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#news .container #news-row #news-column #news-box #news-displayed {
  padding: 20px;
}
#news
  .container
  #news-row
  #news-column
  #news-box
  #news-displayed
  #register-link {
  margin-top: -85px;
}*/
.text-color {
  color: #0b505b !important;
}
button {
  background-color: #0b505b !important;
}
#news-box {
  box-shadow: 10px 10px 10px #b32204;
}
#news-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
</style>