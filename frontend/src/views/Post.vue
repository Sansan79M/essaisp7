<template>
<div  v-if="!post.id">
  <error-403></error-403>
</div>
  <body v-else>
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
                      🧍 {{ post.user.username }}
                      <br class="d-block d-md-none" />
                      ⌚ {{ format(post.createdAt) }}
                    </p>
                  </div>
                  <div class="text-left">
                    <p class="text-color">📧 {{ post.title }}</p>
                  </div>
                  <div class="text-left">
                    <p class="text-color">📝 {{ post.description }}</p>
                  </div>
                  <div
                    class="buttons"
                    v-if="user.id == post.userId || user.isAdmin"
                  >
                    <router-link
                      :to="'/post/update/' + post.id"
                      aria-label="Lien vers la page de modification du message"
                    >
                    <!-- Les boutons du message -->
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
                      @click.prevent="deletePost"
                    >
                      SUPPRIMER
                    </button>
                  </div>
                  <div v-if="user.id != post.userId">
                    <button
                      name="signal"
                      id="signal"
                      class="flex-items-center rounded text-white"
                      aria-label="Bouton de signalement du message"
                      @click.prevent="signalPost"
                    >
                      ⚠️
                    </button>
                  </div>
                </div>
              </div>
              <!-- Les commentaires -->
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
                    :user="user"
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
import Error403 from './Error403';
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import { formatRelative } from "date-fns";
import { fr } from "date-fns/locale";


export default {
  components: { HeaderConnected, CommentForm, Comment, Error403 },
  name: "post",
  data() {
    return {
      post: {
        user: "",
      },
      comment: "",
      comments: [],
      respondTo: null,
      user: {
        id: null,
        isAdmin: false,
      },
    };
  },

  mounted() {
    //Affichage des posts et des commentaires
    this.getOnePost();
    this.getComments();

    //Affichage des boutons (modifier et supprimer) si auteur ou administrateur identifié
    const storage = JSON.parse(localStorage.getItem("storage_user_groupomania"));
    this.user.id = storage.userId;
    this.user.isAdmin = storage.isAdmin;
  },

  methods: {
    //Affichage du message---------------------------------------------
    getOnePost() {
      const headers = new Headers();
      headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token);
      const myInit = {
        method: "GET",
        headers: headers,
      };
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/posts/post/" + postId, myInit)
        .then((response) => {
          response.json().then((post) => {
            this.post = post;
            //console.log(post);
          });
          console.log(response + "Le message s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le message ne s'affiche pas");
        });
    },

    //Suppression du message----------------------------------------------
    deletePost() {
      const headers = new Headers();
      headers.append(
        "Authorization",
        JSON.parse(localStorage.getItem("storage_user_groupomania")).token
      );
      const myInit = {
        method: "DELETE",
        headers: headers,
      };
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/posts/delete/" + postId, myInit)
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
      const headers = new Headers();
      headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token);
      const myInit = {
        method: "GET",
        headers: headers,
      };
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/comments/read/" + postId, myInit)
        .then((response) => {
          response.json().then((comments) => {
            this.comments = comments;
            //console.log(comments);
          });
          console.log(response + "Les commentaires s'affichent");
        })
        .catch((error) => {
          console.log(error + "Les commentaires ne s'affichent pas");
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

    //Signalement du message----------------------------------------------
    signalPost() {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(this.post),
      };
      //console.log(JSON.parse(myInit.body));
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/posts/signal/" + postId, myInit)
        .then((success) => {
          this.post.isSignaled = true;
          alert("Le message a été signalé auprès de l'administrateur !");
          console.log(success + "Le signalement du message a été effectué");
        })
        .catch((error) => {
          console.log(error + "Le signalement du message n'a pas été effectué");
        });
    },

    //Affichage de la date des messages au format français-------------------------------
    format(date) {
      if (date === undefined) {
          return this.post.createdAt;
      } else if (date !== undefined) {
      let dateParts = date.split(/[- :]/); dateParts[1]--;
      const dateObject = new Date(...dateParts);
      return formatRelative(dateObject, new Date(), { locale: fr });
      }     
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
  height: 370px;
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
#signal {
  background-color: rgba(252, 94, 59, 0.8) !important;
  border: 1px solid rgba(252, 94, 59, 0.8) !important;
}
</style>