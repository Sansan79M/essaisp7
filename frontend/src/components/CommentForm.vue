<template>
  <form class="flex flex-col" @submit.prevent="submitComment">
    <div class="mb-3">
      <h3 class="text-primary text-left text-sm ml-3">Nouveau commentaire</h3>
      <p v-if="respondTo" class="text-grey-darkest test-xs ml-3">
        En réponse à : 🧍 Machin {{respondTo.username}} : "{{respondTo.title}}"
        <button type="button" @click="$emit('cancel-respond-to')"></button>
      </p>
    </div>
    <div class="mb-3">
      <input type="text" class="w-full border rounded p-3 ml-3" v-model="title" placeholder="Titre" />
    </div>
    <div>
      <textarea class="w-full border rounded p-3 ml-3" v-model="comment" placeholder="Commentaire"></textarea>
    </div>
    <button type="submit" class="border rounded py-2 text-white bg-color ml-3 mt-2 mb-2" >Commenter</button>
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
        .post("/posts/comments", this.fullForm)
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
.bg-color{
  background-color: #0b505b;
}

</style>