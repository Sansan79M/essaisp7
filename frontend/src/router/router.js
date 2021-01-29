//Importation des librairies
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//Importation des différentes pages concernant l'utilisateur
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import ConfirmSignup from '../views/ConfirmSignup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import ModifyProfile from '../views/ModifyProfile.vue'

//Importation des différentes pages concernant les posts
import News from '../views/News.vue'
import CreatePost from '../views/CreatePost.vue'
import Post from '../views/Post.vue'
import UpdatePost from '../views/UpdatePost.vue'

//Importation du trafic
import Trafic from '../views/Trafic.vue'

//ROUTER
const router = new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [
      //Chemins et titres des pages concernant l'utilisateur
      {path: "/", component: Home, name: 'home', meta: {title:"Accueil Groupomania"}},
      {path: "/user/signup", component: Signup, name: 'signup', meta: {title:"Inscription à Groupomania"}},
      {path: "/user/confirmSignup", component: ConfirmSignup, name: 'confirmSignup', meta: {title:"Confirmation d'inscription à Groupomania"}},
      {path: "/user/login", component: Login, name: 'login', meta: {title:"Connexion à Groupomania"}},
      {path: "/user/profile/:id", component: Profile, name: 'profile', meta: {title:"Profil utilisateur, Groupomania"}},
      {path: "/user/modify/:id", component: ModifyProfile, name: 'modify', meta: {title:"Modification du profil utilisateur, Groupomania"}},
      
      //Chemins et titres des pages concernant les posts et commentaires
      {path: "/posts/news", component: News, name: 'news', meta: {title:"News de Groupomania"}},
      {path: "/post/create", component: CreatePost, name: 'create', meta: {title:"Création d'un message Groupomania"}},
      {path: "/post/:id", component: Post, name: 'post', meta: {title:"Message et commentaires Groupomania"}},
      {path: "/post/update/:id", component: UpdatePost, name: 'update', meta: {title:"Modification du message Groupomania"}},
     
      //Chemin et titre du tableau de bord de l'administrateur
      {path: "/trafic", component: Trafic, name: 'trafic', meta: {title:"Trafic GSN"}},
    ]
    
  });

  //Affichage de la balise meta title en fonction de la route
  router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
  })
  

  export default router