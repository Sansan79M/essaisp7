<template>
  <body>
    <!--<header>-->
    <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="trafic" class="container">
        <div class="row-column justify-content-center text-center text-color">
          <h1 class="font-weight-bold">TRAFIC GSN - GROUPOMANIA</h1>
          <div id="dashboards">
            <div>
              <h2>MESSAGES</h2>
              <table class="table">
                <tr>
                  <th>Utilisateurs</th>
                  <th>Titres</th>
                  <th>Créations</th>
                  <th>Modifications</th>
                  <th>Alertes</th>
                  <th>Suppressions</th>
                </tr>
                <tr v-for="post in posts"
                    :key="post.id">
                  <td>{{post.userId}}</td>
                  <td>{{post.title}}</td>
                  <td>{{post.description}}</td>
                  <td>{{post.createdAt}}</td>
                  <td>{{post.updatedAt}}</td>
                  <td><input type="checkbox" /></td>
                  <td><button
                      type="submit"
                      name="delete-post"
                      id="delete-post"
                      aria-label="Bouton de suppression du message"
                      @click.prevent="deletePost"
                  >🗑️</button></td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <h2>COMMENTAIRES</h2>
              <table class="table">
                <tr>
                  <th>Utilisateurs</th>
                  <th>Titres</th>
                  <th>Créations</th>
                  <th>Modifications</th>
                  <th>Alertes</th>
                  <th>Suppressions</th>
                </tr>
                <tr>
                  <td>{{comment.userId}}</td>
                  <td>{{comment.content}}</td>
                  <td>{{comment.createdAt}}</td>
                  <td>{{comment.updatedAt}}</td>
                  <td><input type="checkbox" /></td>
                  <td><button
                      type="submit"
                      name="delete-comment"
                      id="delete-comment"
                      aria-label="Bouton de suppression du commentaire"
                      @click.prevent="deleteComment"
                  >🗑️</button></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import HeaderConnected from "../components/HeaderConnected.vue";

export default {
  components: { HeaderConnected },
  name: "trafic",
  data() {
    return {
      post:{},
      posts: [],
      comment:{},
      comments: [],
    };
  },
  mounted() {
    this.listPosts();
  },
  methods: {
    //Affichage des posts---------------------------------------------
    listPosts() {
      fetch("http://localhost:3000/api/posts/news")
        .then((success) => {
          success.json().then((posts) => {
            this.posts = posts;
            console.log(posts);
          });
          console.log(success + "La liste des posts s'affiche");
        })
        .catch((error) => {
          console.log(error + "La liste des posts ne s'affiche pas");
        });
    },

    //Suppression des posts----------------------------------------------
    deletePost() {
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
    //Suppression des commentaires---------------------------------------
    deleteComment() {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(this.comment),
      };
      console.log(JSON.parse(myInit.body));
      const commentId = this.comment.id;
      console.log(this.comment.id)
      fetch("http://localhost:3000/api/comments/delete/" + commentId, myInit)
        .then((success) => {
           window.location.reload(); 
          console.log(success + "Le commentaire est supprimé");
        })
        .catch((error) => {
          console.log(error + "Le commentaire n'a pas été supprimé");
        });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  margin-bottom: 30px;
}
h2 {
  font-size: 25px;
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 120vh;
}
#trafic {
  padding-top: 30px;
}
.text-color {
  color: #0b505b !important;
}
.font-weight-bold {
  font-size: 25px;
}
table,
tr,
th,
td, button {
  border: 1px solid #0b505b;
  background-color: white;
}
</style>