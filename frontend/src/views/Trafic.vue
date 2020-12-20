<template>
  <body>
    <!--<header>-->
    <header-connected></header-connected>

    <!-- Page Content -->
    <main>
      <div id="trafic" class="container">
        <div class="row-column justify-content-center text-center text-color">
          <h1 class="font-weight-bold">TRAFIC GSN - GROUPOMANIA</h1>

          <div id="dashboards">
            <div>
                <h2>
                  MESSAGES
                </h2>
              <table class="table">
                
                <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Titre</th>
                  <th>Création</th>
                  <th>Modification</th>
                </tr>
                 </thead>
                <tbody>
                <tr>
                  <td>Machin</td>
                  <td>Hello</td>
                  <td>19/12/2020 18:00</td>
                  <td>19/12/2020 18:20</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div>
                 <h2>
                  COMMENTAIRES
                </h2>
              <table class="table">
               
                <tr>
                  <th>Utilisateur</th>
                  <th>Titre</th>
                  <th>Création</th>
                  <th>Modification</th>
                </tr>
                <tr>
                  <td>Truc</td>
                  <td>Salut</td>
                  <td>19/12/2020 18:00</td>
                  <td></td>
                </tr>
              </table>
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
  components: { HeaderConnected },
  name: "trafic",
};
</script>

<style scoped>
h1{
  font-size: 30px;
    margin-bottom: 30px;
}
h2{
   font-size: 25px;
}
main {
  margin: 0;
  padding: 0;
  background-color: rgba(252, 94, 59, 0.8) !important;
  height: 120vh;
}
#trafic {
  padding-top: 30px;

}
.text-color {
  color: #0b505b !important;
}
.font-weight-bold {
  font-size: 25px;
}
table, tr, th, td  {
  border: 1px solid #0b505b;
  background-color: white;
}
#dashboards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>