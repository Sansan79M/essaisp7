<template>
  <div>
    <div class="border-b pb-4 mb-8">
      <!--Affichage d'un message-->
      <comment
        class="mb-4 text-left"
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :now="now"
        @respond-to="$emit('respond-to', $event)"
      ></comment>
    <div v-if="nextPage" class="flex justify-center">
      <button class="text-grey-darker text-sm" @click="fetchComments(nextPage)"
      >Afficher les {{ numberOfComments - comments.length}} commentaires suivants...</button>
  </div>
    </div>
    <!--formulaire de création de message-->
    <comment-form
      :respond-to="respond - to"
      @newComment="newComment"
      @cancel-respond-to="respondTo = null"
    ></comment-form>
  </div>
</template>

<script>
import CommentForm from "./CommentForm";
import Comment from "./Comment.vue";

export default {
  name: "comments",
  components: { CommentForm, Comment },
  data() {
    return {
      comments: [],
      respondTo: null,
      nextPage: null,
      numberOfComments:0,
      now: new Date(),
    };
  },

  mounted: {
    //réactualise automatiquement l'heure du message
    timerun() {
      setInterval(() => {
        this.now = new Date();
      }, 1000);
    },
    //Affiche les messages enregistrés
    getComment(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "GET",
        headers: headers,
        body: JSON.stringify(this.comments),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/comments", myInit + btoa(window.location.href))
      .then(({ data: pagination }) => {
          this.comments = pagination.data;
          this.nextPage = pagination.next_page_url
        }
      );
    },
  },

  methods: {
    fetchComments(){
      const url = {
        method: "GET",
        //body: JSON.stringify(this.comments),
      };
      fetch(url)
      .then(({ data: pagination }) => {
          this.comments= this.commments.concat(pagination.data);
          this.nextPage = pagination.next_page_url;
          this.numberOfComments = pagination.total
        }
      );
    
    },

    newComment(comment) {
      if (!this.respondTo) {
        this.comments.push(comment);
        return;
      }
      this.respondTo.children.push(comment)
    },
  },
};
</script>