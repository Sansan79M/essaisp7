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
                <h1 class="text-center text-color">FIL D'ACTUALITE</h1>
              </div>
              <br />

              <div
                id="card-h2"
                max-width="600"
                class="card effect-shadow effect-blue"
              >
                <router-link
                  :to="'create'"
                  aria-label="Lien vers la page de création de message"
                  class="effect-blue"
                >
                  <h2 class="text-color text-center effect-blue">💬 CREER UN MESSAGE</h2>
                </router-link>
              </div>
              <br />

              <div>
                <ul id="news-list" v-for="post in posts" :key="post.id">
                  <li class="card effect-shadow">
                    <div class="card effect-bg text-color">
                      🧍 {{ post.username }} - ⌚ {{ post.createdAt}}
                      <br />
                      📝 {{ post.title}}
                      <br />
                      ⌨️ {{ post.description }}
                    </div>
                  </li>
                </ul>
              </div>
              <br />
              <div class="text-center">
                <ul
                  class="pagination pagination-md justify-content-center"
                  aria-label="Page de navigation"
                >
                  <li class="page-item disabled">
                    <a class="page-link text-color" href="#" tabindex="-1"
                      >Précédente</a
                    >
                  </li>
                  <li class="page-item">
                    <a class="page-link text-color" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link text-color" href="#">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link text-color" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link text-color" href="#">Suivante</a>
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
  name: "news",
  components: { HeaderConnected },

  data() {
    return {
      posts: [],
      post: {
        id: "",
        userId: "",
        username: "fdsd",
        createdAt: "fdsfs",
        title: "fdssd",
      },
      page: "",
    };
  },

 /* computed: {
    infoPost() {
      //return this.post.id;
      this.post.array.forEach(post => {
        post += this.post.id
      });
      return post
    },
  },*/

  methods: {
    //Affichage du fil d'actualité
    listPosts(e) {
      e.preventDefault();
      //Récupération des id des posts
      const storage = JSON.parse(localStorage.getItem("storage_post"));
      this.post.id = storage.id;

      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.parse(this.post),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/news", myInit)
        .then(res => {
          this.posts = res.data.id
           console.log(res.data + "Le fil d'actualité s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le fil d'actualité ne s'affiche pas");
        });
    },
    //Clic sur un message pour voir le message
    /*getOnePost(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.stringify(this.onePost),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/news", myInit)
        .then((success) => {
          this.$router.push({ path: "/posts/post" });
          console.log(success + "Le lien vers le post choisi fonctionne");
        })
        .catch((error) => {
          console.log(error + "Le lien vers le post choisi ne fonctionne pas");
        });
    },*/
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
  background-color: rgb(252, 252, 111);
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
.effect-blue:hover {
  text-decoration: none;
  background-color: #0b505b !important;
  color: white;
}

main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 130vh;
}
#news .container #news-row #news-column #news-box {
  margin-top: 20px;
  max-width: 600px;
  height: 340px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
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
#news-list {
  padding-left: 0;
  margin-left: 0;
}
</style>