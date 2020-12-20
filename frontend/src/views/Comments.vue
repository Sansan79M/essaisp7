<template>
  <div>
    <div class="border-b pb-4 mb-8">
      <comment
        class="mb-4 text-left"
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @respond-to="respondTo = $event" 
      ></comment><!--"$emit('respond-to', $event)"-->
    </div>
    <div>
      <comment-form
        :respond-to="respondTo"
        :post-id="postId"
        @newComment="newComment"
        @cancel-respond-to="respondTo = null"
      ></comment-form>
      <!--@newComment="comment.push($event)"-->
    </div>
  </div>
</template>


<script>
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";

export default {
  name: "comments",
  components: { CommentForm, Comment },
  data() {
    return {
      comments: [],
      postId:'',
      respondTo: null,
    };
  },
mounted() {
      this.getComments();
      this.postId = this.$route.params.postId
  },
  methods: {
   getComments() {
     // const postId = this.$route.params.postId
      fetch("http://localhost:3000/api/comments/read/" + this.postId)
        .then(response => {
          response.json()
          .then(comments => {
            this.comments = comments
            console.log(comments)
          })
           console.log(response + "Un message s'affiche");
        })
        .catch((error) => {
          console.log(error + "Le message ne s'affiche pas");
        });
    },
  
    newComment(comment) {
      if (!this.respondTo) {
        this.comments.push(comment);
        return;
      }
      this.respondTo.children.push(comment);
    },
  },
};
</script>

<style scoped>

</style>