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
                <form id="update-post-form" class="form" @submit="updatePost">
                  <h1 class="text-center text-color">
                    MODIFICATION DU MESSAGE
                  </h1>
                  <br />
                  <div class="form-group text-left">
                    <label for="topic" class="text-color">📝 Titre :</label>
                    <br />
                    <input
                      type="text"
                      name="topic"
                      id="topic"
                      class="form-control"
                      required="required"
                      v-model="post.title"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label for="description" class="text-color"
                      >⌨️ Description :</label
                    ><br />
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      class="form-control"
                      required="required"
                      v-model="post.description"
                    ></textarea>
                  </div>
                  <div class="form-group text-left">
                    <label for="media" class="btn text-white btn-md button"
                      >Ajouter une image ou un gif</label
                    >
                    <br />
                    <input
                      type="file"
                      name="media"
                      id="media"
                      class="btn text-white btn-md button"
                      value="Enregistrer un nouveau média"
                      accept=".png, .jpg, .jpeg, .gif"
                      @change="onFileChange"
                    />
                  </div>
                  <br />
                  <div class="form-group text-right">
                    <input
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md button"
                      value="Mettre à jour"
                      @submit="updatePost"
                    />
                    <input
                      type="submit"
                      name="delete"
                      class="btn text-white btn-md button"
                      value="Supprimer votre message"
                      @click="deletePost"
                    />
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
import HeaderConnected from "./HeaderConnected.vue";

export default {
  name: "update",
  components: { HeaderConnected },

  data() {
    return {
      post: {
        id: this.id,
        userId: this.user.userId,
        username: this.user.username,
        updatedAt: this.user.updatedAt,
        title: this.post.title,
        description: this.post.description,
        media: this.post.media,
      },
    };
  },

  methods: {
    //Modification du média
    onFileChange() {
      /*this.post.media = e.target.files[0] || e.dataTransfer.files;
      console.log(this.post.media);
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.post.media = e.target.result;
        };
      }*/
    },


    updatePost(e) {
      e.preventDefault();
      const storage = JSON.parse(localStorage.getItem("storage_post"));
      this.post.id = storage.id;
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(this.post),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/update", myInit)
        .then(response => {
          this.post = response.data;
          this.$router.push({ path: "/posts/post" });
          console.log(response + "Le message a été modifié");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été modifié");
        });
    },

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
          this.$router.push({ path: "/posts/news" });
          console.log(success + "Le message a été supprimé");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été supprimé");
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
  height: 540px;
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
#media {
  display: none;
}
</style>