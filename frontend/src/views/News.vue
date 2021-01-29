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
                  :to="'/post/create'"
                  aria-label="Lien vers la page de création de message"
                  class="link effect-blue"
                >
                  <h2 class="text-color text-center effect-blue">
                    💬 CREER UN MESSAGE
                  </h2>
                </router-link>
              </div>
              <br />

              <div>
                <ul id="news-list">
                  <li
                    class="card effect-shadow mb-2"
                    v-for="post in posts"
                    :key="post.id"
                  >
                    <router-link
                      class="link"
                      :to="'/post/' + post.id"
                      aria-label="Lien vers le message"
                      ><!--:to="{ name: 'post', params: { id: post.id }}"-->
                      <div class="card effect-bg text-color">
                        🧍 User {{ post.userId }} - ⌚ {{ format(post.createdAt) }}
                        <br />
                        📧 {{ post.title }}
                        <br />
                        📝 {{ post.description }}
                      </div>
                    </router-link>
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
import {formatRelative} from 'date-fns';
import {fr} from 'date-fns/locale';

export default {
  name: "news",
  components: { HeaderConnected },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.listPosts();
  },
  methods: {
    //Affichage de la liste des messages-------------------------------
    listPosts() {
      fetch("http://localhost:3000/api/posts/news")
        .then((success) => {
          success.json().then((posts) => {
            this.posts = posts;
            //console.log(posts);
          });
          console.log(success + "Le fil d'actualité s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le fil d'actualité ne s'affiche pas");
        });
    },

    //Affichage de la date des messages au format français-------------------------------
    format(date) {
      return formatRelative(new Date(date), new Date(), { locale: fr })
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
  background-color: #0b505b !important;
  color: white;
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
.link {
  text-decoration: none;
}
#news-list {
  padding-left: 0;
  margin-left: 0;
}
</style>