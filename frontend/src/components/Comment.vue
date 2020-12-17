<template>
  <div>
    <div class="border rounded px-3 pt-3 pb-2">
      <div class="mb-2">
        <p class="text-sm text-grey-dark mb-2">
          🧍 Nom du user{{ comment.username }} - ⌚ le (date de publication){{comment.createdAt}}
        </p>
        <p v-if="edit" class="flex ">
          <textarea
            class="w-full border rounded p-3"
            v-model="newDescription"
          ></textarea>
        </p>
        <p v-else>
          📝 {{ comment.title }}<br />
          ⌨️ {{ comment.description }}
        </p>
      </div>

      <p v-if="edit" class="flex ">
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color"
          @click="cancel()"
        >❌ Annuler</button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color"
          @click="update()"
        >💾 Sauvegarder</button>
      </p>
      <p v-else class="flex -mx-2">
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color"
          @click="$emit('respond-to', comment)"
        >↩️ Répondre</button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color"
          @click="edit = true"
        >✏️ Modifier</button>
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-white font-semibold bg-color"
          @click="deleteMssg"
        >❌ Supprimer</button>
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
    deleteMssg() {

    }
  },
};
</script>

<style scoped>
.bg-color{
  background-color: #0b505b
}
</style>