<template>
<div  v-if="!posts">
  <error-403></error-403>
</div>
  <body v-else>
    <!--<header>-->
    <header-connected></header-connected>
    <!-- Page Content -->
    <main>
      <div id="trafic" class="container">
        <div class="justify-content-center text-center text-color">
          <h1>TRAFIC GSN - GROUPOMANIA</h1>
          <div id="dashboards">
            <div>
              <h2>MESSAGES SIGNALES</h2>
              <table
                class="table table-sm table-hover table-responsive-md"
                v-if="posts[0]"
              >
                <thead class="bg-color text-white">
                  <tr>
                    <th></th>
                    <th>Utilisateurs</th>
                    <th>Titres</th>
                    <th>Messages</th>
                    <th>Dates</th>
                    <th>ID</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody v-for="post in posts" :key="post.id">
                  <tr v-if="post.isSignaled !== false">
                    <td>❌</td>
                    <td>{{ post.user.username}}</td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.description }}</td>
                    <td>{{ post.createdAt }}</td>
                    <td>{{ post.id }}</td>
                    <td>
                      <router-link
                        :to="'/post/' + post.id"
                        aria-label="Lien vers le message"
                        ><button class="bg-color rounded text-white">🢂</button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div>
              <h2>COMMENTAIRES SIGNALES</h2>
              <table
                class="table table-sm table-hover table-responsive-md"
                v-if="comments[0]"
              >
                <thead class="bg-color text-white">
                  <tr>
                    <th></th>
                    <th>Utilisateurs</th>
                    <th>Contenus</th>
                    <th>Dates</th>
                    <th>ID des posts</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-for="comment in comments" :key="comment.id">
                  <tr v-if="comment.isSignaled !== false">
                    <td>❌</td>
                    <td>{{ comment.user.username }}</td>
                    <td>{{ comment.content }}</td>
                    <td>{{ comment.createdAt }}</td>
                    <td>{{ comment.postId }}</td>
                    <td>
                      <router-link
                        :to="'/post/' + comment.postId"
                        aria-label="Lien vers le commentaire"
                        ><button class="bg-color rounded text-white">🢂</button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
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
import Error403 from './Error403.vue';

export default {
  components: { HeaderConnected, Error403 },
  name: "trafic",
  data() {
    return {
      post: {},
      posts: [],
      comment: "",
      comments: [],
      user:{username:""}
    };
  },
  mounted() {
    this.listPosts();
    this.getComments();
  },
  methods: {
    //Affichage des posts---------------------------------------------
    listPosts() {
      const headers = new Headers();
      headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token)
      const myInit = {
          method: "GET",
          headers: headers,
        };
      fetch("http://localhost:3000/api/posts/news", myInit)
        .then((success) => {
          success.json().then((posts) => {
            this.posts = posts;
          });
          console.log(success + "La liste des posts signalés s'affiche");
        })
        .catch((error) => {
          console.log(error + "La liste des posts signalés ne s'affiche pas");
        });
    },

    //Affichage des commentaires---------------------------------------
    getComments() {
      const headers = new Headers();
      headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token)
      const myInit = {
          method: "GET",
          headers: headers,
        };
      fetch("http://localhost:3000/api/comments/readall", myInit)
        .then((response) => {
          response.json().then((comments) => {
            this.comments = comments;
            //console.log(comments)
          });
          console.log(
            response + "La liste des commentaires signalés s'affiche"
          );
        })
        .catch((error) => {
          console.log(
            error + "La liste des commentaires signalés ne s'affiche pas"
          );
        });
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 30px;
  border: 2px solid #0b505b !important;
}
h2 {
  font-size: 25px;
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 350vh;
}
#trafic {
  padding-top: 30px;
}
.text-color {
  color: #0b505b !important;
}
td,
button {
  background-color: white;
  vertical-align: middle;
}
.bg-color {
  background-color: #0b505b !important;
}
</style>