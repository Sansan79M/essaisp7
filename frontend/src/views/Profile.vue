<template>
  <body>
    <!--<header>-->
    <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="profile">
        <div class="container">
          <div id="profile-row" class="row justify-content-center">
            <div id="profile-column" class="col-md-6">
              <div id="profile-box" class="col-md-12">
                <div id="profile-displayed">
                  <h1 class="text-center text-color">
                    Profil de {{ user.username }}
                  </h1>
                  <br />
                  <div class="text-center">
                    <!--<a class="avatar avatar-xl rounded-circle bg-primary" size="5rem"-->
                    <img
                      class="avatar img-fluid rounded-circle"
                      src="../../../backend/faces/NY.jpeg"
                      alt="Avatar de l'utilisateur"
                    />
                    <!--{{user.face}}</a>-->
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">👔 {{ user.service }}</p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">⌨️ {{ user.bio }}</p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">📧 {{ user.email }}</p>
                  </div>
                  <br />
                  <div id="buttons">
                    <router-link :to="'/user/modify'">
                      <button
                        type="submit"
                        name="update"
                        id="update"
                        class="btn text-white btn-md"
                        value="submit"
                      >
                        MODIFIER
                      </button>
                    </router-link>
                    <router-link :to="'/posts/news'">
                      <button
                        type="submit"
                        name="back-news"
                        id="back-news"
                        class="btn text-white btn-md"
                        value="FIL D'ACTUALITE"
                      >
                        FIL D'ACTUALITE
                      </button></router-link
                    >
                  </div>
                </div>
              </div>
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
  name: "profile",
  components: { HeaderConnected },

  data() {
    return {
      user: {
        userId:"",
        username: "",
        face:"",
        service: "",
        bio: "",
        email: "",
      },
    };
  },

  mounted() {
    this.userProfile();
  },

  methods: {
    userProfile() { //this.$route.params.id
      const storage = JSON.parse(localStorage.getItem("storage_user"));
      console.log(storage);
      fetch("http://localhost:3000/api/user/profile/" + storage.userId)
        .then((response) => {
          response.json()
          .then(user => {
            this.user = user.id;
            console.log(user)
          })
          console.log(response + "Le profil utilisateur s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le profil utilisateur ne s'affiche pas");
        });
    },
  },
 
}
</script>

<style scoped>
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 110vh;
}
h1 {
  font-size: 30px;
}
.avatar {
  width: 100px;
  height: 100px;
}
#profile .container #profile-row #profile-column #profile-box {
  margin-top: 30px;
  max-width: 600px;
  height: 500px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#profile
  .container
  #profile-row
  #profile-column
  #profile-box
  #profile-displayed {
  padding: 20px;
}
#profile
  .container
  #profile-row
  #profile-column
  #profile-box
  #profile-displayed
  #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
button {
  background-color: #0b505b !important;
}
#profile-box {
  box-shadow: 10px 10px 10px #b32204;
}
#profile-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
#delete {
  margin-left: 20px;
}
#buttons {
  display: flex;
  justify-content: space-between;
}
</style>