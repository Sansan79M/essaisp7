<template>
  <form class="flex flex-col" @submit.prevent="submitComment">
    <div class="mb-2">
      <h3 class="text-left text-sm ml-3 text-color">Nouveau commentaire</h3>
      <p v-if="respondTo" class="text-xs ml-3 text-color">
        En réponse à <span class="font-semibold">Machin {{respondTo.username}}</span> : «{{respondTo.title}}».  
        <button type="button" @click="$emit('cancel-respond-to')" class="text-white bg-color font-semibold"> ❌ Annuler</button>
      </p>
    </div>
    <div class="mb-2">
      <input type="text" class="w-full border rounded p-3 ml-3 text-color" v-model="title" placeholder="Titre" />
    </div>
    <div>
      <textarea class="w-full border rounded p-3 ml-3 text-color" v-model="comment" placeholder="Commentaire"></textarea>
    </div>
    <button type="submit" class="border rounded border-color py-2 text-white bg-color ml-3 mt-2 mb-2 font-semibold" >Commenter</button>
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
.text-color{
  color: #0b505b;
}
.border-color{
  border: 1px solid #0b505b;
}
</style>