<template>
  <body>
    <!--<header>-->
    <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="post">
        <div class="container">
          <div id="post-row" class="row justify-content-center">
            <div id="post-column" class="col-md-8">
              <div id="post-box" class="col-md-12">
                <div id="post-displayed">
                  <h1 class="text-center text-color">MESSAGE</h1>
                  <br />
                  <div class="text-left">
                    <p class="text-color">
                      🧍 {{ post.username }} - ⌚ {{ post.createdAt }}
                    </p>
                  </div>
                  <div class="text-left">
                    <p class="text-color">📧 {{ post.title }}</p>
                  </div>
                  <div class="text-left">
                    <p class="text-color">📝 {{ post.description }}</p>
                  </div>
                  <div v-if="author" class="buttons">
                    <router-link :to="'/posts/update'">
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
                    >SUPPRIMER
                    </button>                  
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <comment-form
                    :respond-to="respondTo"
                    :post-id="post.id"
                    @newComment="newComment"
                    @cancel-respond-to="respondTo = null"
                  ></comment-form>
                </div>
                <div>
                  <comment
                    v-for="comment in comments"
                    :key="comment.id"
                    :comment="comment"
                    @respond-to="respondTo = $event"
                  ></comment>
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
import HeaderConnected from "../components/HeaderConnected.vue";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";

export default {
  components: { HeaderConnected, CommentForm, Comment },
  name: "post",

  data() {
    return {
      post: {
        /*id: "",
        userId: "",
        username: "",
        createdAt: "",
        updatedAt: "",
        title: "",
        description: ""*/
      },
      comments: [],
      author: true,
      reader: true,
      respondTo: null,
    };
  },

  mounted() {
    this.getOnePost();
    this.getComments();
  },
  methods: {
    //Affichage du post---------------------------------------------
    getOnePost() {
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/posts/post/" + postId)
        .then((response) => {
          response.json().then((post) => {
            this.post = post;
            console.log(post);
          });
          console.log(response + "Un message s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le message ne s'affiche pas");
        });
    },

    //Suppression du post----------------------------------------------
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
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/posts/delete/"+ postId, myInit)
        .then((success) => {
          this.$router.push({ path: "/posts/news" });
          console.log(success + "Le message est supprimé");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été supprimé");
        });
    },

    //Affichage des commentaires---------------------------------------
    getComments() {
      const postId = this.$route.params.id
      fetch("http://localhost:3000/api/comments/read/" + postId)
        .then(response => {
          response.json()
          .then(comments => {
            this.comments = comments
            console.log(comments)
          })
           console.log(response + "Un message s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le message ne s'affiche pas");
        });
    },

    //Nouveau commentaire----------------------------------------------
    newComment(comment) {
      if (!this.respondTo) {
        this.comments.push(comment);
        return;
      }
      this.respondTo.children.push(comment);
    },

    
  },
};
</script>

<style scoped>
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 500vh;
}
h1 {
  font-size: 30px;
}
#post .container #post-row #post-column #post-box {
  margin-top: 30px;
  max-width: 600px;
  height: 310px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
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
  border: 1px solid #0b505b;
}
#post-box {
  box-shadow: 10px 10px 10px #b32204;
}
#post-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>