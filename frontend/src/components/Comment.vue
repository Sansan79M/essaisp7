<template>
  <div>
    <div class="border rounded border-color px-3 pt-3 pb-2" max-width="600">
      <div class="mb-2">
        <p class="text-sm text-grey-dark mb-2 text-color">
          🧍 Nom du user{{ comment.username }} - ⌚ le (date de publication){{comment.createdAt}}
        </p>
        <p v-if="edit" class="flex ">
          <textarea
            class="w-full border rounded border-color p-3 text-color"
            v-model="newDescription"
          ></textarea>
        </p>
        <p v-else class="text-color">
          📝 {{ comment.title }}<br />
          ⌨️ {{ comment.description }}
        </p>
      </div>

      <p v-if="edit" class="flex ">
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color border rounded border-color"
          @click="cancel()"
        >❌ Annuler</button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color border rounded border-color"
          @click="update()"
        >💾 Sauvegarder</button>
      </p>
      <p v-else class="flex -mx-2">
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color border rounded border-color"
          @click="$emit('respond-to', comment)"
        >↩️ Répondre</button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color border rounded border-color"
          @click="edit = true"
        >✏️ Modifier</button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color border rounded border-color"
          @click="deletePost"
        >❌ Supprimer</button>
      </p>
    </div>
    <div class="mt-4 border-l-4 pl-4 ">
      <comment
        class="mb-4"
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        @respond-to="$emit('respondTo', $event)"
      ></comment>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["comment"],
  data() {
    return {
      edit: false,
      newDescription: this.comment.description,
    };
  },
  methods: {
    cancel() {
      (this.edit = false), (this.newDescription = this.comment.description);
    },
    update() {
      console.log("Updating");
      (this.comment.description = this.newDescription), (this.edit = false);
    },
    deletePost() {

    }
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