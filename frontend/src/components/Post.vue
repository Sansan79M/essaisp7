<template>
  <body>
 <!--<header>-->
   <header-connected></header-connected>

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
                    <p class="text-color">
                      🧍 {{ post.username }} - ⌚ {{ post.createdAt }}
                    </p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color" >📝 {{ post.title }}</p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">⌨️ {{ post.description }}</p>
                  </div>
                  <br />
                  <!-- <div class="justify-content-center">
                    <img src="../../../backend/medias/NY.jpeg" width="400px" alt="Image déposée par le créateur du post" />
                  </div>
                  <br />-->
                  <br />
                  <div id="buttons">
                    <router-link :to="'update'">
                      <button
                        type="submit"
                        name="update"
                        id="update"
                        class="btn text-white btn-md"
                        aria-label="Bouton de modification du message"
                        value="MODIFIER"
                      >
                        MODIFIER
                      </button>
                    </router-link>
                    <button
                      type="submit"
                      name="delete"
                      id="delete"
                      class="btn text-white btn-md"
                      value="SUPPRIMER"
                      aria-label="Bouton de suppression du message"
                      @click="deletePost"
                    >
                      SUPPRIMER
                    </button>
                    <button
                      type="button"
                      class="btn btn-md"
                      value="like"
                      @click="show = !show"
                      aria-label="Coeur pour liker"
                    >
                      <img
                        src="../assets/heart-red.png"
                        class="heart"
                        v-show="show"
                        alt="coeur rouge"
                      />
                      <img
                        src="../assets/heart-white.png"
                        class="heart"
                        v-show="!show"
                        alt="coeur blanc"
                      />
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
                        aria-label="Lien vers le fil d'actualité"
                      >
                        FIL D'ACTUALITE
                      </button></router-link
                    >
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
import HeaderConnected from './HeaderConnected.vue';

export default {
  components: { HeaderConnected },
  name: "post",

  data() {
    return {
      post: {
        id: "", 
        userId: "",
        username: "",
        createdAt: "",
        updatedAt: "",
        title: "",
        description: "",
        //media:"",
        //likes:"",
      },
      show: false,
    };
  },


  methods: {
    //Affichage du post
    getOnePost(e) {
      e.preventDefault();
      const storage = JSON.parse(sessionStorage.getItem("groupomaniaP7"));
      this.post.id = storage.id;
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.parse(this.post),
      };
      console.log(JSON.parse(myInit.body));
      console.log(this.post)
      fetch("http://localhost:3000/api/posts/post${id}", myInit)
        .then(response => {
          
          
          console.log(response + "Un message s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le message ne s'affiche pas");
        });
    },

    //suppression du post
    deletePost(e) {
      e.preventDefault();
      const storage = JSON.parse(sessionStorage.getItem("groupomaniaP7"));
      this.post.id = storage.id;
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
          this.$router.push({ path: "/posts/news" });
          console.log(success + "Le message est supprimé");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été supprimé");
        });
    },

  },
};
</script>

<style scoped>
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important; /*#fc5d3a*/
  height: 130vh;
}
h1 {
  font-size: 30px;
}
#post .container #post-row #post-column #post-box {
  margin-top: 30px;
  max-width: 600px;
  height: 640px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111); /*#fcfc6f*/
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
#delete,
#like {
  margin-left: 20px;
}
.icon {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 1.6rem;
  color: #626262;
}
#buttons {
  display: flex;
  justify-content: space-between;
}
.heart {
  width: 20px;
}
</style>