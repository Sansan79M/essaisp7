//Importation des librairies
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use (BootstrapVue);
Vue.use (IconsPlugin);


import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

//Importation des différentes pages concernant l'utilisateur
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Moderator from './views/Moderator.vue'
import Profile from './views/Profile.vue'
import ModifyProfile from './components/ModifyProfile.vue'
//Importation des différentes pages concernant les posts
import News from './views/News.vue'
import CreatePost from './components/CreatePost.vue'
import Post from './components/Post.vue'
import UpdatePost from './components/UpdatePost.vue'
import Comments from './components/Comments.vue'
import CommentForm from './components/CommentForm.vue'

//ROUTER
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    //Chemins et titres des pages concernant l'utilisateur
    {path: "/", component: Home, meta: {title:"Accueil Groupomania"}},
    {path: "/user/signup", component: Signup, meta: {title:"Inscription à Groupomania"}},
    {path: "/user/login", component: Login, meta: {title:"Connexion à Groupomania"}},
    {path: "/user/moderator", component: Moderator, meta: {title:"Modérateur Groupomania"}},
    {path: "/user/profile", component: Profile, meta: {title:"Profil utilisateur, Groupomania"}},
    {path: "/user/modify", component: ModifyProfile, meta: {title:"Modification du profil utilisateur, Groupomania"}},
    //Chemins et titres des pages concernant les posts
    {path: "/posts/news", component: News, meta: {title:"News de Groupomania"}},
    {path: "/posts/create", component: CreatePost, meta: {title:"Création d'un message Groupomania"}},
    {path: "/posts/post", component: Post, meta: {title:"Message Groupomania"}},
    {path: "/posts/update", component: UpdatePost, meta: {title:"Modification du message Groupomania"}},
    {path: "/posts/comments", component: Comments, meta: {title:"commentaire-essai"}},
    {path: "/posts/commentForm", component: CommentForm, meta: {title:"commentaire-formlaire"}},
  ]
  
});
//Affichage de la balise meta title en fonction de la route
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

