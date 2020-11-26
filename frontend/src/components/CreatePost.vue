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
                      @submit="fileDownload"
                    />
                    <!--v-model="post.media"-->
                  </div>

                  <div class="form-group text-right">
                    <br />
                    <button
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md button"
                      value="Publier votre message"
                    >Publier votre message</button>
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

export default {
  name: "create",
  data() {
    return {
      post: {
        id: null,
        title: "",
        description: "",
        media: "",
      },
      submitted: false,
      successful: false
    };
  },
  methods: {
    createPost(e) {
      e.preventDefault();
      const headers = new Headers ();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.post),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/create", myInit)
        .then((success) => {
          this.$router.push({ path: '/posts/post' });
          console.log(success + "Un message a été créé");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été créé");
        });
    },

    //Téléchargement du média
  fileDownload(e) {
       console.log(e);
         this.post.media = e.target.files[0] || e.dataTransfer.files;
       console.log(this.post.media);

       let input = event.target;
            if (input.files && input.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.post.media = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
   },

   //Déconnection
    disconnect() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push({ path: "/" });
        window.location.reload();
      }, 500);
    },
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