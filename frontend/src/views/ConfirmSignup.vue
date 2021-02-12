<template>
  <body>
    <!--<header>-->
    <header-not-connected></header-not-connected>

    <!-- Page Content -->
    <main>
      <div id="home" class="container">
        <div class="row-column justify-content-center text-center text-color">
          <img
            class="img-fluid"
            src="../assets/icon-above-font.png"
            alt="Grand logo Groupomania"
          />
          <h1 class="font-weight-bold">
            Bravo votre inscription a bien été enregistré !
          </h1>
          <br />
          <p>
            Vous allez être redirigé automatiquement vers la page de connexion, d'ici 5 secondes<span id="loading"></span>
            </p>
          <p>
            Si le transfert ne se fait pas automatiquement, vous pouvez cliquer sur
              <router-link
              class=""
                :to="'/user/login'"
                aria-label="Lien vers la page de connection"
              >ce lien de connexion. 
            </router-link>
          </p>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import HeaderNotConnected from '../components/HeaderNotConnected.vue';

export default {
  components: { HeaderNotConnected },
  name: "confirmSignup",

  mounted() {
      this.redirection ();
  },

  methods: {
      //Redirection automatique vers la page de connexion dans 8 secondes
      redirection () {
      setTimeout(() => {
        this.$router.push({ path: "/user/login" });
        console.log("Redirection vers la page de connexion")
      }, 5000);
    },
  }
  
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
  height: 200vh;
}
main img {
  height: 20em;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid #0b505b;
  box-shadow: 10px 10px 10px #b32204;
}
main img:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
.text-color {
  color: #0b505b !important;
}
.font-weight-bold {
  font-size: 25px;
}
#loading:after{
  display: inline-block;
  animation: dotty steps(1,end) 1s infinite;
  content: '';
}
@keyframes dotty {
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
}
</style>