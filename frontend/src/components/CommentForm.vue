<template>
  <form @submit.prevent="submitComment">
    <div>
      <h3>Nouveau commentaire</h3>
      <p v-if="respondTo">
        En réponse à {{respondTo.username}} : "{{respondTo.title}}"
        <button type="button" @click="$emit('cancel-respond-to')"></button>
      </p>
    </div>
    <div>
      <input type="text" v-model="title" placeholder="Titre" />
    </div>
    <div>
      <textarea v-model="comment" placeholder="Commentaire"></textarea>
    </div>
    <button type="submit">Commenter</button>
  </form>
</template>


<script>
import axios from "axios";
export default {
  name: "commentForm",
  props: ["respondTo"],
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
    };
  },

  computed: {
    fullForm() {
      if (this.respondTo) {
        return {
          ...this.form,
          respond_to_id: this.respondTo.id,
        };
      }
      return this.form;
    },
  },

  methods: {
    submitComment() {
      axios
        .post("posts/comments", this.fullForm)
        .then((result) => {
          console.log(result);
          this.$emit("newComment", this.data);
          this.form.description = ""
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style scoped>

</style>