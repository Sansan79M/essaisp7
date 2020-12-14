//Importation des librairies
import Vue from 'vue'
import App from './App.vue'

//Importation des routes et du stockage de données
import router from '../src/router/router'



Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

