<template>
  <body>
    <!--<header>-->
    <header-not-connected></header-not-connected>

    <!-- Page Content -->
    <main>
      <div id="login">
        <div class="container">
          <div id="login-row" class="row justify-content-center">
            <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                <form id="login-form" class="form" @submit.prevent="login">
                  <h1 class="text-center text-color">CONNEXION</h1>
                  <br />
                  <div class="form-group text-left">
                    <label for="email" class="text-color">📧 Email :</label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      required="required"
                      placeholder="email@domaine.com"
                      v-model="user.email"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,15}$"
                    />
                  </div>
                  <div class="form-group text-left flex">
                    <label for="password" class="text-color"
                      >🔒 Mot de passe:</label
                    >
                    <br />
                    <input
                      :type="show ? 'text': 'password'"
                      name="password"
                      id="password"
                      class="form-control"
                      required="required"
                      placeholder="8 caractères"
                      v-model="user.password"
                      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                    />
                    <button type="button" class="bg-transparent rounded" @click="show = !show">
                    <img src="../assets/view-show.svg" alt="mot de passe visible" class="eyes text-color" v-show="show">
                    <img src="../assets/view-hide.svg" alt="mot de passe invisible" class="eyes text-color" v-show="!show">
                    </button>
                  </div>
                  <div class="form-group text-left">
                    <br />
                    <button
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md"
                      value="Se connecter"
                      aria-label="bouton pour confirmer la connexion"
                    >
                      Se connecter
                    </button>
                  </div>
                  <div id="register-link" class="text-right">
                    <router-link class="text-color" :to="'/user/signup'"
                    aria-label="Lien vers la page d'inscription"
                      >S'enregistrer</router-link
                    >
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
import HeaderNotConnected from "../components/HeaderNotConnected.vue";

export default {
  name: "login",
  components: { HeaderNotConnected },
  
  data() {
    return {
      user:{
        email: "",
        password: "",
      },
      //loading: false,
      show: false
    };
  },
 
  methods: {
    login() {
        const headers = new Headers();
        headers.append("content-type", "application/json");
        

        const myInit = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(this.user),
        };
        //console.log(JSON.parse(myInit.body));
        fetch("http://localhost:3000/api/user/login", myInit)
          .then((result) => {
            result.json().then((data) => {
              if (data.error) {
                console.log(data, 'Il y a une erreur de connexion');
                return;
              }

             //Sauvegarde du userId pour l'affichage du profil et la création de posts et de commentaires
              const storage = {userId:data.userId, token:data.token, isAdmin: data.isAdmin};
              localStorage.setItem("storage_user_groupomania", JSON.stringify(storage));
 
              this.$router.push({ path: "/posts/news" });
              console.log("L'utilisateur s'est bien connectée");
            });
          })
          .catch((error) => {
            console.log(error, "La connexion n'a pas été établie");
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
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 30px;
  max-width: 600px;
  height: 380px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login
  .container
  #login-row
  #login-column
  #login-box
  #login-form
  #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
.btn {
  background-color: #0b505b !important;
}
#login-box {
  box-shadow: 10px 10px 10px #b32204;
}
#login-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
.eyes{
  width : 20px;
}
</style>