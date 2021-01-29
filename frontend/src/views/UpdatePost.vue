<template>
  <body>
    <!--<header>-->
    <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="update-post">
        <div class="container">
          <div id="update-post-row" class="row justify-content-center">
            <div id="update-post-column" class="col-md-6">
              <div id="update-post-box" class="col-md-12">
                <form
                  id="update-post-form"
                  class="form"
                  @submit.prevent="updatePost"
                >
                  <h1 class="text-center text-color">
                    MODIFICATION DU MESSAGE
                  </h1>
                  <br />
                  <div class="text-left">
                    <p class="text-color">
                      🧍 User {{ post.userId }} - ⌚ {{ post.createdAt }}
                    </p>
                  </div>
                  <div class="form-group text-left">
                    <label for="topic" class="text-color">📧 Titre :</label>
                    <br />
                    <input
                      type="text"
                      name="topic"
                      id="topic"
                      class="form-control text-color"
                      required="required"
                      v-model="post.title"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label for="description" class="text-color"
                      >📝 Description :</label
                    ><br />
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      class="form-control text-color"
                      required="required"
                      v-model="post.description"
                    ></textarea>
                  </div>

                  <br />
                  <div id="buttons" class="form-group text-right">
                    <input
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md button"
                      value="MODIFIER"
                      aria-label="Modifie le message"
                    />
                    <router-link :to="'/posts/news'">
                      <button
                        type="submit"
                        name="back"
                        id="back"
                        class="btn text-white btn-md button"
                        aria-label="annulation retour aux news"
                      >
                        ANNULER
                      </button>
                    </router-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import HeaderConnected from "../components/HeaderConnected";

export default {
  name: "update",
  components: { HeaderConnected },
  data() {
    return {
      post: {
        id:"",
        postId: "",
        userId: "",
        username: "",
        createdAt: "",
        title: "",
        description: "",
      },
      newTitle: "",
      newDescription: ""
    };
  },
  mounted() {
    this.getOnePost();
  },
  methods: {
    //Affiche les données du message--------------------------------------------
    getOnePost() {
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/posts/post/" + postId)
        .then((response) => {
          response.json().then((post) => {
            this.post = post;
            //console.log(post);
          });
          console.log(response + "Le message d'origine s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le message d'origine ne s'affiche pas");
        });
    },

    //Modifier un message--------------------------------------------
    updatePost() {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(this.post),
      };
      //console.log(JSON.parse(myInit.body));
      const postId = this.$route.params.id;
      fetch("http://localhost:3000/api/posts/update/" + postId, myInit)
        .then((success) => {
          this.post.title = this.newTitle;
          this.post.description = this.newDescription;
          
          this.$router.push({ path: "/post/" + postId });
          console.log(success + "Le message a été modifié");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été modifié");
        });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 110vh;
}
#update-post .container #update-post-row #update-post-column #update-post-box {
  margin-top: 30px;
  max-width: 600px;
  height: 470px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#update-post
  .container
  #update-post-row
  #update-post-column
  #update-post-box
  #update-post-form {
  padding: 20px;
}
#update-post
  .container
  #update-post-row
  #update-post-column
  #update-post-box
  #update-post-form
  #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
button,
.button {
  background-color: #0b505b !important;
}
#update-post-box {
  box-shadow: 10px 10px 10px #b32204;
}
#update-post-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
#buttons {
  display: flex;
  justify-content: space-between;
}
</style>