<template>
  <div>
    <div id="comment-box" class="col-md-12">
      <form
        id="comment-displayed"
        class="form"
        @submit.prevent="updateComment()"
      >
        <p class="mb-2 text-color">
          🧍 User {{ comment.userId }} - ⌚ {{ format(comment.createdAt) }}
        </p>
        <p v-if="edit" class="form-group flex">
          <label for="new-content">Laisser un commentaire</label>
          <textarea
            type="text"
            name="new-content"
            id="new-content"
            class="form-control border rounded border-color p-3 text-color"
            required="required"
            v-model="comment.content"
          ></textarea>
        </p>
        <p v-else class="text-color">📝 {{ comment.content }}</p>
        <button
          v-if="user.id != comment.userId"
          name="signal"
          id="signal"
          class="flex-items-center rounded border-color text-white"
          aria-label="Bouton de signalement du message"
          @click.prevent="signalComment"
        >
          ⚠️
        </button>
        <p v-if="edit" class="flex">
          <button
            type="button"
            class="flex-items-center text-xs text-white bg-color rounded border-color"
            @click="cancelComment()"
          >
            Annuler
          </button>
          <input
            type="submit"
            name="submit"
            class="mx-2 flex-items-center text-xs text-white bg-color rounded border-color"
            value="Sauvegarder"
          />
        </p>
        <p
          v-else-if="comment.userId == user.id || user.isAdmin"
          class="flex -mx-2"
        >
          <button
            type="button"
            class="flex-items-center text-xs text-white bg-color rounded border-color"
            @click="edit = true"
          >Modifier</button>
          <button
            type="button"
            class="mx-2 flex-items-center text-xs text-white bg-color rounded border-color"
            @click.prevent="deleteComment"
          >Supprimer</button>
        </p>
      </form>
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
import {formatRelative} from 'date-fns';
import {fr} from 'date-fns/locale';

export default {
  name: "comment",
  props: ["comment", "user"],
  data() {
    return {
      edit: false,
      newContent: this.comment.newContent,
      id: "",
      postId: "",
    };
  },

  methods: {
    //Fermeture du textarea de modification------------------------------
    cancelComment() {
      this.edit = false;
      this.comment.content = this.newContent;
      window.location.reload();
    },

    //Modification du commentaire------------------------------------------
    updateComment() {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(this.comment),
      };
      //console.log(JSON.parse(myInit.body));
      const commentId = this.comment.id;
      fetch("http://localhost:3000/api/comments/update/" + commentId, myInit)
        .then((success) => {
          this.comment.content = this.newContent;
          window.location.reload();
          console.log(success + "Un commentaire a été modifié");
        })
        .catch((error) => {
          console.log(error + "Aucun commentaire n'a été modifié");
        });
    },

    //Supprime un commentaire----------------------------------------------
    deleteComment() {
      const commentId = this.comment.id;
      fetch("http://localhost:3000/api/comments/delete/" + commentId, {
        method: "DELETE",
      })
        .then((success) => {
          window.location.reload();
          console.log(success + "Le commentaire est supprimé");
        })
        .catch((error) => {
          console.log(error + "Le commentaire n'a pas été supprimé");
        });
    },

    //Signalement du commentaire----------------------------------------------
    signalComment() {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(this.comment),
      };
      //console.log(JSON.parse(myInit.body));
      const commentId = this.comment.id;
      fetch("http://localhost:3000/api/comments/signal/" + commentId, myInit)
          .then((success) => {
              this.comment.isSignaled = true,
              alert("Le commentaire a été signalé auprès de l'administrateur !")
              console.log(success + "Le signalement du commentaire a été effectué")
        })
         .catch((error) => {
          console.log(error + "Le signalement du commentaire n'a pas été effectué");
        });
    },

     //Affichage de la date des commentaires au format français-------------------------------
    format(date) {
      return formatRelative(new Date(date), new Date(), { locale: fr })
    },
  },
};
</script>

<style scoped>
#comment-box {
  margin-top: 30px;
  max-width: 600px;
  height: 235px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#comment-box #comment-displayed {
  padding: 20px;
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
label {
  display: none;
}
#signal {
  background-color: rgba(252, 94, 59, 0.8) !important;
  border: 1px solid rgba(252, 94, 59, 0.8) !important;
}
</style>