<template>
  <body>
    <!--<header>-->
    <header-not-connected></header-not-connected>

    <!-- Page Content -->
    <main>
      <div id="signup">
        <div class="container">
          <div id="signup-row" class="row justify-content-center">
            <div id="signup-column" class="col-md-6">
              <div id="signup-box" class="col-md-12">
                <form id="signup-form" class="form" @submit="signup">
                  <h1 class="text-center text-color">INSCRIPTION</h1>
                  <br />
                  <div class="form-group text-left">
                    <label for="username" class="text-color"
                      >🧍 Nom d'utilisateur :</label
                    >
                    <br />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      class="form-control"
                      placeholder="Nom Prénom"
                      required="required"
                      v-model="user.username"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label for="email" class="text-color">📧 Email :</label
                    ><br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      placeholder="email@domaine.com"
                      required="required"
                      v-model="user.email"
                      unique="true"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,15}$"
                    /><!---->
                  </div>
                  <div class="form-group text-left">
                    <label for="password" class="text-color"
                      >🔒 Mot de passe :</label
                    >
                    <br />
                    <input
                      :type="show1 ? 'text' : 'password'"
                      name="password"
                      id="password"
                      class="form-control"
                      placeholder="8 caractères"
                      required="required"
                      v-model="user.password"
                      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                    />
                    <button
                      type="button"
                      class="text-color"
                      @click="show1 = !show1"
                    >
                      <img
                        src="../assets/view-show.svg"
                        class="eyes text-color"
                        v-show="show1"
                      />
                      <img
                        src="../assets/view-hide.svg"
                        class="eyes text-color"
                        v-show="!show1"
                      />
                      Affichage du mot de passe
                    </button>
                  </div>
                  <div class="form-group text-left">
                    <label for="confirm-password" class="text-color"
                      >🔒 Confirmation du mot de passe :</label
                    >
                    <br />
                    <input
                      :type="show2 ? 'text' : 'password'"
                      name="confirm-password"
                      id="confirm-password"
                      class="form-control"
                      placeholder="8 caractères"
                      required="required"
                      v-model="passwordConfirm"
                      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                    />
                    <button
                      type="button"
                      class="text-color"
                      @click="show2 = !show2"
                    >
                      <img
                        src="../assets/view-show.svg"
                        class="eyes text-color"
                        v-show="show2"
                      />
                      <img
                        src="../assets/view-hide.svg"
                        class="eyes text-color"
                        v-show="!show2"
                      />
                      Affichage du mot de passe
                    </button>
                  </div>
                  <div class="form-group text-left">
                    <br />
                    <button
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md"
                      value="S'enregistrer"
                    >
                      S'enregistrer
                    </button>
                  </div>
                  <div id="register-link" class="text-right">
                    <router-link class="text-color" :to="'/user/login'"
                      >Se connecter</router-link
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
import User from '../models/userModel';

export default {
  name: "signup",
  components: { HeaderNotConnected },

  data() {
    return {
       user: new User ('', '', '','', '', ''),
      /*user: {
        username: "",
        email: "",
        password: "",
      },*/
      passwordConfirm: "",
      show1: false,
      show2: false,
    };
  },

  methods: {
    signup(e) {
      if (this.user.password === this.passwordConfirm) {
        e.preventDefault();
        const headers = new Headers();
        headers.append("content-type", "application/json");
        const myInit = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(this.user),
        };
        console.log(JSON.parse(myInit.body));
        fetch("http://localhost:3000/api/user/signup", myInit)
          .then((success) => {
            this.$router.push({ path: "/user/profile" });
            console.log(success + "Le compte a bien été créé");
          })
          .catch((error) => {
            console.log(error + "Le compte n'a pas été créé");
          });
      } else {
        alert("Les mots de passe ne sont pas identiques");
      }
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
  height: 120vh;
}
#signup .container #signup-row #signup-column #signup-box {
  margin-top: 30px;
  max-width: 600px;
  height: 590px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#signup .container #signup-row #signup-column #signup-box #signup-form {
  padding: 20px;
}
#signup
  .container
  #signup-row
  #signup-column
  #signup-box
  #signup-form
  #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
.btn {
  background-color: #0b505b !important;
}
#signup-box {
  box-shadow: 10px 10px 10px #b32204;
}
#signup-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
.eyes {
  width: 20px;
}
</style>
