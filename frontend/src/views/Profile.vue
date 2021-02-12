<template>
<div  v-if="!user.id">
  <error-403></error-403>
</div>
  <body v-else>
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
                    <label id="label-avatar" for="avatar">Avatar</label>
                    <input
                      id="avatar"
                      name="avatar"
                      class="avatar text-white rounded-circle text-center"
                      v-model="initial"
                    />
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">✏️ {{ user.service }}</p>
                  </div>
                  <br />
                  <div class="text-left">
                    <p class="text-color">📧 {{ user.email }}</p>
                  </div>
                  <br />
                  <div id="buttons">
                    <router-link :to="'/user/modify/'+ user.id">
                      <button
                        type="submit"
                        name="update"
                        id="update"
                        class="btn text-white btn-md"
                        value="submit"
                        aria-label="lien vers la modification de profil"
                      >
                        MODIFIER
                      </button>
                    </router-link>
                    <input
                      type="submit"
                      name="delete"
                      class="btn text-white btn-md button"
                      value="SUPPRIMER"
                      aria-label="bouton de suppression de profil"
                      @click.prevent="deleteProfile"
                    />
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
import Error403 from './Error403.vue';

export default {
  name: "profile",
  components: { HeaderConnected, Error403 },

  data() {
    return {
      user: {
        /*userId:"",
        username: "",
        email: "",
        service: ""*/
      },
      initial:""
    };
  },

  mounted() {
    this.userProfile();
  },

  methods: {
    //Affichage du compte utilisateur-----------------------------------------
    userProfile() {
      const headers = new Headers();
      headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token)
        const myInit = {
          method: "GET",
          headers: headers,
        };
      const storage = JSON.parse(localStorage.getItem("storage_user_groupomania"));
      //console.log(storage);
      fetch("http://localhost:3000/api/user/profile/" + storage.userId, myInit)
        .then((response) => {
          response.json().then((user) => {
            this.user = user;
            //Initiales de l' utilisateur affichées en majuscule dans l'avatar
            this.initial = user.username.toUpperCase().split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("");
          });
          console.log(response + "Le profil utilisateur s'affiche");
        })
        .catch((error) => {console.log(error + "Le profil utilisateur ne s'affiche pas");});
    },

    //Suppression du compte utilisateur--------------------------------------------
    deleteProfile() {
      if (
        confirm("Souhaitez-vous vraiment supprimer votre compte utilisateur ?")
      ) {
        const headers = new Headers();
        headers.append("content-type", "application/json");
        headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token);
        const myInit = {
          method: "DELETE",
          headers: headers,
          body: JSON.stringify(this.user),
        };
        fetch("http://localhost:3000/api/user/delete", myInit)
          .then((success) => {
            alert('Le votre profil est supprimé')
            this.$router.push({ path: "/" });
            console.log(success + "Le profil utilisateur a été supprimé");
          })
          .catch((error) => {
            console.log(error + "Le profil utilisateur n'a pas a été supprimé");
          });
      }
    },
  },
};
</script>

<style scoped>
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 160vh;
}
h1 {
  font-size: 30px;
}
.avatar {
  width: 80px;
  height: 80px;
  background-color: #0b505b !important;
  border: #0b505b !important;
  font-size: 30px;
}
#label-avatar {
  display: none;
}
#profile .container #profile-row #profile-column #profile-box {
  margin-top: 30px;
  max-width: 600px;
  height: 450px;
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
button,
.button {
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