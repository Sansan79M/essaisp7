<template>
  <body>
   <!--<header>-->
     <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="modify-profile">
        <div class="container">
          <div id="modify-profile-row" class="row justify-content-center">
            <div id="modify-profile-column" class="col-md-6">
              <div id="modify-profile-box" class="col-md-12">
                <form id="modify-profile-form">
                  <h1 class="text-center text-color">MODIFICATION DU PROFIL</h1>
                  <br />
                  <div class="form-group">
                    <label for="avatar" class="text-color">
                      <span> Cliquez sur l'avatar pour le modifier : </span>
                         <b-avatar class="avatar rounded-circle bg-primary" size="4rem" >
                    <img  src="../../../backend/faces/NY.jpeg" alt="Avatar de l'utilisateur"/>
                    </b-avatar>
                    </label>
                    <input
                      type="file"
                      class="btn text-white btn-md button"
                      name="avatar"
                      id="avatar"
                      accept=".png, .jpg, .jpeg"
                      value="Modifier l'avatar"
                      @change="downloadFile"
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
                    <label for="service" class="text-color"
                      >👔 Service de l'utilisateur :</label
                    >
                    <br />
                    <input
                      type="text"
                      name="service"
                      id="service"
                      class="form-control"
                      v-model="user.service"
                    />
                  </div>
                  <div class="form-group text-left">
                    <label for="bio" class="text-color"
                      >⌨️ Biographie :</label
                    ><br />
                    <textarea
                      type="input"
                      name="bio"
                      id="bio"
                      class="form-control"
                      v-model="user.bio"
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
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      required="required"
                      v-model="user.password"
                      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                    />
                  </div>
                  <br />
                  <div id="buttons">
                    <input
                      type="submit"
                      name="submit"
                      class="btn text-white btn-md button"
                      value="Mettre à jour"
                      @submit="modifyProfile"
                    />
                    <input
                      type="submit"
                      name="delete"
                      class="btn text-white btn-md button"
                      value="Supprimer votre profil"
                      @click="deleteProfile"
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
import HeaderConnected from './HeaderConnected.vue';

export default {
  name: "modify",
  components: { HeaderConnected },

  data() {
    return {
      user: {
        userId: "",
        face: null,
        username: "Will SMITH",
        service: null,
        bio: null,
        email: "will.smith@groupomania.com",
        password: "",
      },
      submitted: false,
      successful: false,
    };
  },
  methods: {
    downloadFile(e) {
      this.$emit('input', e.target.files[0])
    },

    modifyProfile(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(this.user),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/user/modify", myInit)
        .then((success) => {
          this.$router.push({ path: '/user/profile' });
          console.log(success + "Le profil utilisateur a été modifié");
        })
        .catch((error) => {
          console.log(error + "Le profil utilisateur n'a pas a été modifié");
        });
    },
 
    deleteProfile(e) {
      e.preventDefault();
      if (confirm("Souhaitez-vous vraiment supprimer votre compte utilisateur ?")) {
      
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(this.user),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/user/delete", myInit)
        .then((success) => {
          this.$router.push({ path: '/' });
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
h1 {
  font-size: 30px;
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 140vh;
}
#modify-profile
  .container
  #modify-profile-row
  #modify-profile-column
  #modify-profile-box {
  margin-top: 30px;
  max-width: 600px;
  height: 750px;
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
.button,
#avatar {
  background-color: #0b505b !important;
}
#avatar {
  margin-left: 30px;
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
</style>