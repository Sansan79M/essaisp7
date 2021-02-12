<template>
  <div  v-if="!user.id">
   <error-403></error-403>
</div>
  <body v-else>
    <!--<header>-->
    <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="modify-profile">
        <div class="container">
          <div id="modify-profile-row" class="row justify-content-center">
            <div id="modify-profile-column" class="col-md-6">
              <div id="modify-profile-box" class="col-md-12">
                <form
                  id="modify-profile-form"
                  class="form"
                  @submit.prevent="modifyProfile"
                >
                  <h1 class="text-center text-color">MODIFICATION DU PROFIL</h1>
                  <br />
                  <div class="form-group text-center">
                    <label id="label-avatar" for="avatar">Avatar</label>
                    <input
                      id="avatar"
                      name="avatar"
                      class="avatar text-white rounded-circle text-center"
                      v-model="initial"
                    />
                  </div>
                  <br />
                  <div class="form-group text-left">
                    <label for="username" class="text-color"
                      >🧍 Nom de l'utilisateur :</label
                    >
                    <br />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      class="form-control"
                      v-model="user.username"
                      required="required"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label for="service" class="text-color">✏️ Service :</label
                    ><br />
                    <textarea
                      type="input"
                      name="service"
                      id="service"
                      class="form-control"
                      v-model="user.service"
                    ></textarea>
                  </div>
                  <div class="form-group text-left">
                    <label for="email" class="text-color">📧 Email :</label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      v-model="user.email"
                      required="required"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,15}$"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label for="password" class="text-color"
                      >🔒 Mot de passe :</label
                    >
                    <br />
                    <input
                      :type="show ? 'text' : 'password'"
                      name="password"
                      id="password"
                      class="form-control"
                      required="required"
                      v-model="user.password"
                      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                    />
                    <button
                      type="button"
                      class="bg-transparent rounded"
                      @click="show = !show"
                    >
                      <img
                        src="../assets/view-show.svg"
                        alt="mot de passe visible"
                        class="eyes text-color"
                        v-show="show"
                      />
                      <img
                        src="../assets/view-hide.svg"
                        alt="mot de passe invisible"
                        class="eyes text-color"
                        v-show="!show"
                      />
                    </button>
                  </div>
                  <br />
                  <div id="buttons">
                    <input
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md button"
                      value="ACTUALISER"
                      aria-label="Actualise le profil"
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
import Error403 from './Error403.vue';

export default {
  name: "modify",
  components: { HeaderConnected, Error403 },

  data() {
    return {
      user: {},
      show: false,
      initial: "",
      newUsername: "",
      newService: "",
      newEmail: "",
      newPassword: "",
    };
  },
  mounted() {
    this.userProfile();
  },
  methods: {
    //Affichage des données du compte utilisateur dans les inputs--------------------------
    userProfile() {
      const headers = new Headers();
      headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token)
        const myInit = {
          method: "GET",
          headers: headers,
        };
      const storage = JSON.parse(localStorage.getItem("storage_user_groupomania"));
      fetch("http://localhost:3000/api/user/profile/" + storage.userId, myInit)
        .then((response) => {
          response.json().then((user) => {
            this.user = user;
            //Initiales de l' utilisateur affichées en majuscule dans l'avatar
            this.initial = user.username.toUpperCase().split(" ").map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null)).join("");
          });
          console.log(response + "Les données du profil utilisateur s'affichent");
        })
        .catch((error) => {console.log(error + "Les données du profil utilisateur ne s'affichent pas");});
    },

    //Modification du compte utilisateur-----------------------------------------
    modifyProfile() {
      const storage = JSON.parse(localStorage.getItem("storage_user_groupomania"));
      this.user.id = storage.userId;
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append("Authorization", JSON.parse(localStorage.getItem("storage_user_groupomania")).token)
      const myInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(this.user),
      };
      //console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/user/modify/" + storage.userId, myInit)
        .then((success) => {
          this.user.username = this.newUsername;
          this.user.service = this.newService;
          this.user.email = this.newEmail;
          this.user.password = this.newPassword;

          this.$router.push({ path: "/user/profile/" + storage.userId });
          console.log(success + "Le profil utilisateur a été modifié");
        })
        .catch((error) => {
          console.log(error + "Le profil utilisateur n'a pas a été modifié");
        });
    },
  },
};
</script>

<style scoped>
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 250vh;
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
#modify-profile
  .container
  #modify-profile-row
  #modify-profile-column
  #modify-profile-box {
  margin-top: 30px;
  max-width: 600px;
  height: 740px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#modify-profile
  .container
  #modify-profile-row
  #modify-profile-column
  #modify-profile-box
  #modify-profile-form {
  padding: 20px;
}
#modify-profile
  .container
  #modify-profile-row
  #modify-profile-column
  #modify-profile-box
  #modify-profile-form
  #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}

.button {
  background-color: #0b505b !important;
}

#modify-profile-box {
  box-shadow: 10px 10px 10px #b32204;
}
#modify-profile-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
input[type="file"] {
  display: none;
}
#buttons {
  display: flex;
  justify-content: space-between;
}
#label-avatar {
  display: none;
}
.eyes {
  width: 20px;
}
</style>