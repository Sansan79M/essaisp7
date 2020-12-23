<template>
  <div>
    <div id="comment-box" class="col-md-12">
      <div id="comment-displayed">
        <p class="mb-2 text-color">
          🧍 Nom du user :{{ comment.username }} - ⌚ {{ comment.createdAt }}
        </p>
        <p v-if="edit" class="flex">
          <textarea
            class="border rounded border-color p-3 text-color"
            v-model="newContent"
          ></textarea>
        </p>
        <p v-else class="text-color">📝 {{ comment.content }}</p>
       <p v-if="edit" class="flex">
        <button
          type="button"
          class="flex-items-center text-xs text-white bg-color border rounded border-color"
          @click="cancelComment()"
        >
          Annuler
        </button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white bg-color border rounded border-color"
          @click="updateComment()"
        >
          Sauvegarder
        </button>
      </p>
      <p v-else-if="author" class="flex -mx-2">
        <button
          type="button"
          class="flex-items-center text-xs text-white bg-color border rounded border-color"
          @click="edit = true"
        >
          Modifier
        </button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white bg-color border rounded border-color"
          @click.prevent="deleteComment"
        >
          Supprimer
        </button>
      </p>
    </div>
    <div class="mt-4 border-l-4 pl-4">
      <comment
        class="mb-4"
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        @respond-to="$emit('respondTo', $event)"
      ></comment>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["comment"],
  data() {
    return {
      //comments:[],
      edit: false,
      newContent: this.comment.content,
      author: true,
    };
  },

  methods: {
    //Fermeture du textarea de modification------------------------------
    cancelComment() {
      this.edit = false
      this.newContent = this.comment.content
    },

    //Mise à jour du commentaire------------------------------------------
    updateComment() {
      console.log("Updating");
      this.comment.content = this.newContent
      this.edit = false
    },
    
    //Supprime un commentaire----------------------------------------------
    deleteComment() {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(this.comment),
      };
      console.log(JSON.parse(myInit.body));
      const commentId = this.comment.id;
      console.log(this.comment.id)
      fetch("http://localhost:3000/api/comments/delete/" + commentId, myInit)
        .then((success) => {
           window.location.reload(); 
          console.log(success + "Le commentaire est supprimé");
        })
        .catch((error) => {
          console.log(error + "Le commentaire n'a pas été supprimé");
        });
    },
  },
};
</script>

<style scoped>
#comment-box {
  margin-top: 30px;
  max-width: 600px;
  height: 220px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#comment-box #comment-displayed {
  padding: 20px;
}

#comment-box #comment-displayed #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
button {
  background-color: #0b505b !important;
}
#comment-box {
  box-shadow: 10px 10px 10px #b32204;
}
#comment-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}
#buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bg-color {
  background-color: #0b505b;
}
.border-color {
  border: 1px solid #0b505b;
}
form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>