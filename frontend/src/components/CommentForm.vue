<template>
  <form class="flex flex-col" @submit.prevent="submitComment">
    <div class="mb-3">
      <h3 class="text-primary text-left text-sm">Nouveau commentaire :</h3>
      <p v-if="respondTo" class="text-grey-darkest test-xs">
        En réponse à <span class="font-semi-bold">{{ respondTo.name }}</span> :
        " {{ respondTo.body }} ".
        <button type="button" @click="$emit('cancel-respond-to')">
          Annuler
        </button>
      </p>
    </div>
    <div class="mb-3">
      <input
        type="text"
        class="w-full border rounded p-3"
        v-model="form.name"
        placeholder="pseudo"
        :class="{ 'boder-red': errors.name }"
      />
      <!--Ce paragraphe s'affichera seulement s'il y a une erreur-->
      <p
        class="text-red px-3 py-1"
        v-if="errors.name"
        v-text="errors.name[0]"
      ></p>
    </div>

    <div class="mb-3">
      <textarea
        class="w-full border rounded p-3"
        v-model="form.body"
        placeholder="commentaire"
        :class="{ 'boder-red': errors.body }"
      ></textarea>
      <!--Ce paragraphe s'affichera seulement s'il y a une erreur-->
      <p
        class="text-red px-3 py-1"
        v-if="errors.comment"
        v-text="errors.comment[0]"
      ></p>
    </div>
    <button type="submit" class="border rounded py-2">Commenter</button>
  </form>
</template>

<script>
export default {
  name: "commentForm",
  props: ["respondTo"],
  data() {
    return {
      form: {
        name: "",
        body: "",
        url: window.location.href
      },
      errors: {},
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
    submitComment(e) {
      e.preventDefault();
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.form),
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/comments", myInit, this.fullForm)
        .then(({ data }) => {
          this.$emit("newComment", data);
          //this.comments.push(data);
          this.form.body = "";
          this.erros = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>