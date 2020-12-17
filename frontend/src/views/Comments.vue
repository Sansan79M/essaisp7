<template>
  <div>
    <div>
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @respond-to="respondTo = $event"
      ></comment>
    </div>
    <div>
      <comment-form
        :respond-to="respondTo"
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
import axios from "axios";

export default {
  name: "comments",
  components: { CommentForm, Comment },
  data() {
    return {
      comments: [],
      respondTo: null,
    };
  },
  mounted() {
    axios.get("posts/comments").then(({ data }) => {
      console.log(data);
      this.comments = data;
    });
  },
  methods: {
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