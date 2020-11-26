<template>
  <body>
    <!-- Navigation-->
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <img class="navbar-brand"  
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
                 <router-link class="nav-link" :to="'/posts/news'"
                  aria-label="Lien vers la page fil d'actualité">
                  FIL D'ACTUALITE
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
               <li class="nav-item">
                 <router-link class="nav-link" :to="'/posts/create'"
                  aria-label="Lien vers la page de création de message">
                  CREER UN MESSAGE</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="'/user/profile'"
                  aria-label="Lien vers la page du profil utilisateur">
                  PROFIL</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="'/'"
                  aria-label="Déconnexion et retour vers la page d'accueil"
                  @click="disconnect">
                  DECONNEXION</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <main>
      <div id="post">
        <div class="container">
          <div id="post-row" class="row justify-content-center">
            <div id="post-column" class="col-md-6">
              <div id="post-box" class="col-md-12">
                <div id="post-displayed">
                  <h1 class="text-center text-color">MESSAGE</h1>
                  <br />
                  <div class="text-left">
                    <p class="text-color">📝 {{post.title}}</p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">⌨️ {{post.description}}</p>
                  </div>
                  <br />
                    <div class="justify-content-center">
                    <img src="../../../backend/medias/NY.jpeg" width="400px" alt="Image déposée par le créateur du post" />
                  </div>
                  <br />
                  <br />
                  <div id="buttons">
                    <router-link :to="'update'">
                    <button
                      type="submit"
                      name="update"
                      id="update"
                      class="btn text-white btn-md"
                      value="MODIFIER"
                    >MODIFIER</button>
                    </router-link>
                    <button
                      type="submit"
                      name="delete"
                      id="delete"
                      class="btn text-white btn-md"
                      value="SUPPRIMER"
                      @click="deletePost"
                    >SUPPRIMER
                    </button>
                    <button
                      type="submit"
                      name="like"
                      id="like"
                      class="btn text-white btn-md"
                      @click="likes">🤍
                    </button>
                    </div>
                    <br />
                    <br />
                    
                    <div>
                        <router-link :to="'/posts/news'">
                    <button
                      type="submit"
                      name="back-news"
                      class="btn text-white btn-md"
                      value="back-back-news"
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
  name: "post",
  data() {
    return {
       post: {
      id:"",
      userId:"",
      title: "titre du message", 
      description: "description du message", 
      media: "../../../backend/medias/NY.jpeg"
    }
    };
  },
   

  methods: {
    //Affichage du post
    getOnePost(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.stringify(this.post),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/post", myInit)
        .then((success) => {
          console.log(success + "Le message s'affiche");
        })
        .catch((error) => {
          console.log(error+ "Le message ne s'affiche pas");
        });
    },
    //suppression du post
    deletePost(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(this.post),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/delete", myInit)
        .then((success) => {
          this.$router.push({ path: '/posts/news' });
          console.log(success + "Le message est supprimé");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été supprimé");
        });
    },
        disconnect() {
      localStorage.clear();
      setTimeout(() => {
      this.$router.push({ path: '/' })
        window.location.reload();
         }, 500);
          },
  },

  mounted: {
             //Bouton like
  likes(){
   const like = document.getElementById("like")
    like.innerHtml = "❤️";
  }
  }
 
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
  background-color: rgba(252, 94, 59, 0.8) !important; /*#fc5d3a*/
  height: 110vh;
}
h1{
    font-size: 30px;
}
#post .container #post-row #post-column #post-box {
  margin-top: 30px;
  max-width: 600px;
  height: 620px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);/*#fcfc6f*/
}
#post .container #post-row #post-column #post-box #post-displayed {
  padding: 20px;
}
#post
  .container
  #post-row
  #post-column
  #post-box
  #post-displayed
  #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
button {
  background-color: #0b505b !important;
}
#post-box {
  box-shadow: 10px 10px 10px #b32204;
}
#post-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
#delete, #like {
  margin-left : 20px;
}
.icon{
font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
font-size: 1.6rem;
color: #626262;
}
#buttons{
  display: flex;
  justify-content: space-between;
}

</style>