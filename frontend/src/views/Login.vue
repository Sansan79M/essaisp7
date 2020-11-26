<template>
  <body>
    <!-- Navigation-->
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
          <router-link
            to="/"
            aria-label="Lien vers la page d'accueil"
            class="navbar-brand"
            ><img src="../assets/icon-white.png" alt="Logo Groupomania"
          /></router-link>

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
                  :to="'/'"
                  aria-label="Lien vers la page d'accueil"
                >
                  ACCUEIL
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="'/user/signup'"
                  aria-label="Lien vers la page d'inscription"
                >
                  INSCRIPTION</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <main>
      <div id="login">
        <div class="container">
          <div id="login-row" class="row justify-content-center">
            <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                <form id="login-form" class="form" @submit="login">
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
                  <div class="form-group text-left">
                    <label for="password" class="text-color"
                      >🔒 Mot de passe:</label
                    >
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      required="required"
                      placeholder="8 caractères"
                      v-model="user.password"
                      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                    />
                  </div>
                  <div class="form-group text-left">
                    <br />
                    <button
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md"
                      value="Se connecter"
                    >
                      Se connecter
                    </button>
                  </div>
                  <div id="register-link" class="text-right">
                    <router-link class="text-color" :to="'/user/signup'"
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
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    login(e) {
      if (this.user.email !== null || this.user.password !== null) {
        e.preventDefault();
        const headers = new Headers();
        headers.append("content-type", "application/json");
        const myInit = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(this.user),
        };
        console.log(JSON.parse(myInit.body));
        fetch("http://localhost:3000/api/user/login", myInit)
          .then((result) => {
            result.json().then((data) => {
              console.log(data);
              if (data.error) {
                console.log(data);
                return;
              }
              this.$router.push({ path: "/posts/news" });
            });
          })
          .catch((error) => {
            console.log(error, "La connexion n'a pas été établie");
          });
      }
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
#login .container #login-row #login-column #login-box {
  margin-top: 30px;
  max-width: 600px;
  height: 360px;
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
</style>