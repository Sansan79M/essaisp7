<template>
  <!-- Navigation-->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" role="navigation">
      <div class="container">
        <router-link
          :to="'/'"
          aria-label="Lien vers la page d'accueil"
          class="navbar-brand"
          ><img src="../assets/icon-white.png" alt="Logo Groupomania"
        /></router-link>
      </div>
    </nav>
  </header>
  
</template>

<script>

export default {
  name: "headerError",
};
</script>

<style scoped>
.navbar {
  background-color: #0b505b;
}
header img {
    width: 200px;
}

</style>
