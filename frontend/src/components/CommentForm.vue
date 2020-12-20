<template>
  <form class="flex flex-col" @submit.prevent="submitComment">
    <div class="mb-2">
      <h3 class="text-left text-sm ml-3 text-color">Nouveau commentaire</h3>
      <p v-if="respondTo" class="text-xs ml-3 text-color">
        En réponse à <span class="font-semibold">Machin {{respondTo.userId}}</span>  
        <button type="button" @click="$emit('cancel-respond-to')" class="text-white bg-color font-semibold"> ❌ Annuler</button>
      </p>
    </div>
    
    <div>
      <textarea class="w-full border rounded p-3 ml-3 text-color" v-model="newComment.content" placeholder="Commentaire"></textarea>
    </div>
    <button type="submit" class="border rounded border-color py-2 text-white bg-color ml-3 mt-2 mb-2 font-semibold" >Commenter</button>
  </form>
</template>


<script>

export default {
  name: "commentForm",
  props: ["respondTo", "postId"],
  data() {
    return {
      newComment: {
       userId:'',
       postId:'',
        content: "",
      },
    };
  },

  computed: {
    fullForm() {
      if (this.respondTo) {
        return {
          ...this.newComment,
          respond_to_id: this.respondTo.id,
        };
      }
      return this.newComment;
    },
  },

  methods: {
    submitComment() {
      const storage = JSON.parse(localStorage.getItem("storage_user"));
      this.newComment.userId = storage.userId;
      this.newComment.postId = this.postId;
      const headers = new Headers();
      headers.append("content-type", "application/json");

      const myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.newComment),
      };
      console.log(this.newComment);
      fetch("http://localhost:3000/api/posts/create", myInit)
        .then((result) => {
          result.json()
            .then((data) => {
              if (data.error) {
                console.log(data);
                return;
              }
              console.log(result + "Un message a été créé");


              //this.$router.push({ path: "/posts/news" });
            })
            .catch((error) => {
              console.log(error + "Le message n'a pas été créé");
            });
        })
        .catch((error) => {
          console.log(error + "La création de message ne fonctionne pas");
        });
    },
  },
};
</script>

<style scoped>
.bg-color{
  background-color: #0b505b;
}
.text-color{
  color: #0b505b;
}
.border-color{
  border: 1px solid #0b505b;
}
</style>