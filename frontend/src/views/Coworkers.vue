<template>
  <body>
    <!--<header>-->
    <header-connected></header-connected>
    <!-- Page Content -->
    <main>
      <div class="container">
        <div id="news-row" class="row justify-content-center">
          <div id="news-column" class="col-md-10">
            <div id="news-displayed">
              <div
                max-width="600"
                class="card text-center effect-shadow"
                id="card-h1"
              >
                <h1 class="text-center text-white font-weight-bold">MES COLLEGUES</h1>
              </div>
              <br />

              <div>
                <ul id="news-list">
                  <li
                    class="card effect-shadow mb-2"
                    v-for="user in users"
                    :key="user.id"
                  >
                    <!--<router-link
                      class="link"
                      :to="'/coworker/' + user.id"
                      aria-label="Lien vers le message"
                      >-->
                      <div class="card effect-bg text-color">
                        <p>🧍 {{ user.username }} 
                          <br class="d-block d-md-none" />
                        <span v-if="user.service">✏️ {{ user.service }} </span>
                        <br class="d-block d-md-none" />
                        📧 {{ user.email }}</p>
                        <br />
                      </div>
                    <!--</router-link>-->
                    <div></div>
                  </li>
                </ul>
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
  name: "coworkers",
  components: { HeaderConnected },
  data() {
    return {
      user: {},
      users:[],
    };
  },
  mounted() {
    this.getCoworkers();
  },
  methods: {
    //Affichage de la liste des messages-------------------------------
    getCoworkers() {
      const headers = new Headers();
      headers.append(
        "Authorization",
        JSON.parse(localStorage.getItem("storage_user_groupomania")).token
      );
      const myInit = {
        method: "GET",
        headers: headers,
      };
      fetch("http://localhost:3000/api/user/coworkers", myInit)
        .then((success) => {
          success.json().then((users) => {
            this.users = users;
            //console.log(users);
          });
          console.log(success + "La liste des utilisateurs s'affiche");
        })
        .catch((error) => {
          console.log(error + "La liste des utilisateurs ne s'affiche pas");
        });
    },


  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
h2 {
  font-size: 25px;
}
h2:hover {
  color: white !important;
}
#card-h1 {
  font-size: 30px;
  margin-top: 30px;
  padding: 10px;
  background-color: #0b505b;
}
.effect-shadow {
  border: 1px solid #0b505b;
  box-shadow: 10px 10px 10px #b32204;
}
.effect-shadow:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
.effect-bg:hover {
  background-color: rgb(252, 252, 111);
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 400vh;
}
#news .container #news-row #news-column #news-box {
  margin-top: 20px;
  max-width: 600px;
  height: 340px;
  border: 1px solid #0b505b;
}
#news .container #news-row #news-column #news-box #news-displayed {
  padding: 20px;
}
#news .container #news-row #news-column #news-box #news-displayed {
  margin-top: -80px;
}
.text-color {
  color: #0b505b !important;
}
button {
  background-color: #0b505b !important;
}
#news-box {
  box-shadow: 10px 10px 10px #b32204;
}
#news-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
li {
  list-style-type: none;
}
.link {
  text-decoration: none;
}
#news-list {
  padding-left: 0;
  margin-left: 0;
}
</style>