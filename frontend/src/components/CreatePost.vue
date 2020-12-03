<template>
  <body>
<!--<header>-->
  <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="create-post">
        <div class="container">
          <div id="create-post-row" class="row justify-content-center">
            <div id="create-post-column" class="col-md-6">
              <div id="create-post-box" class="col-md-12">
                <form id="create-post-form" class="form" @submit="createPost">
                  <h1 class="text-center text-color">CREATION D'UN MESSAGE</h1>
                  <br />
                  <div class="form-group text-left" v-if="!submitted">
                    <label for="title" class="text-color">📝 Titre :</label>
                    <br />
                    <input
                      type="text"
                      name="title"
                      id="title"
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
                    <label for="media" class="text-color"
                      >Ajouter une image ou un gif :</label
                    >
                    <br />
                    <input
                      type="file"
                      name="media"
                      id="media"
                      class="btn text-white btn-md button"
                      value="Ajouter une photo"
                      accept=".png, .jpg, .jpeg, .gif"
                      aria-label="Bouton pour télécharger un média"
                    />
                    <!--v-model="post.media" @change="fileDownload"-->
                  </div>

                  <div class="form-group text-right">
                    <br />
                    <button
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md button"
                      value="Publier votre message"
                      aria-label="Bouton de publication du message et fait un lien vers la vue du message"
                    >
                      Publier votre message
                    </button>
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
import HeaderConnected from './HeaderConnected.vue';

export default {
  name: "create",
  components: { HeaderConnected },

  data() {
    return {
      post: {
        userId:"",
        title: "",
        description: "",
        //media: "",
      },
      token:"",
      submitted: false,
      successful: false,
    };
    
  },
  
  /*mounted: () => {
    const storage = JSON.parse(sessionStorage.getItem("storage_user"));
    this.post.userId = storage.userId;
    this.token = storage.token;
  },*/

  methods: {
    //Téléchargement du média
   /* fileDownload(e) {
      console.log(e);
      this.post.media = e.target.files[0] || e.dataTransfer.files;
      console.log(this.post.media);
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.post.media = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },*/
   
     
    //Création du message
    createPost(e) {
      e.preventDefault();
      const storage = JSON.parse(sessionStorage.getItem("storage_user"));
      this.post.userId = storage.userId;
      const headers = new Headers();
      headers.append("content-type", "application/json");
      //headers.append("name", "my-picture");
      //headers.append("file", event.target.files[0]);
      //headers.append("content-type", "image/jpg");
      const myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.post),
      };
      console.log(this.post)
      fetch("http://localhost:3000/api/posts/create", myInit)
      .then((result) => {
        result.json().then((data) => {
          if (data.error) {
            console.log(data);
            return;
          }
          console.log(data);
          console.log(result + "Un message a été créé");
          //Sauvegarder  l'id du post
          const storage = {id:data.id, token:data.token}
          localStorage.setItem("storage_post", JSON.stringify(storage));

          this.$router.push({ path: '/posts/post' });
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été créé");
        });
      })
      .catch((error) => {
        console.log(error + "La création de message ne fonctionne pas");
      })
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
  height: 100vh;
}
#create-post .container #create-post-row #create-post-column #create-post-box {
  margin-top: 30px;
  max-width: 600px;
  height: 500px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#create-post
  .container
  #create-post-row
  #create-post-column
  #create-post-box
  #create-post-form {
  padding: 20px;
}
#create-post
  .container
  #create-post-row
  #create-post-column
  #create-post-box
  #create-post-form
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
#create-post-box {
  box-shadow: 10px 10px 10px #b32204;
}
#create-post-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
</style>