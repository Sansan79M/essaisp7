<template>
  <div>
    <div class="border rounded px-3 pt-3 pb-2">
      <div class="mb-2">
        <p class="text-sm text-grey-dark mb-2">
          {{ comment.author }} - Il y a {{ dateformat }}
        </p>
        <p v-if="edit">
          <textarea class="w-full border rounded p-3" v-model="newBody"></textarea>
        </p>

        <p v-else>{{ comment.body }}</p>
      </div>
      <p v-if="edit" class="flex -mx-2">
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-grey-dark font-semibold"
          @click="$emit('respond-to', comment)"
        >
          <img
            id="fleche"
            src="../assets/reply.svg"
            alt="Flèche répondre"
            class="fill-current text-grey-dark mr-px"
          />
          Répondre
        </button>

        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-grey-dark font-semibold"
          @click="edit = true"
        >
          <img
            id="crayon"
            src="../assets/edit-pencil.svg"
            alt="Crayon de modification"
            class="fill-current text-grey-dark mr-px"
          />
          Modifier
        </button>
      </p>
      <p v-else class="flex -mx-2">
        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-grey-dark font-semibold"
          @click="cancel()"
        >
          <img
            id="fleche"
            src="../assets/close.svg"
            alt="Flèche répondre"
            class="fill-current text-grey-dark mr-px"
          />
          Annuler
        </button>

        <button
          type="button"
          class="mx-2 flex-items-center text-xs text-grey-dark font-semibold"
          @click="update()"
        >
          <img
            id="crayon"
            src="../assets/save-disk.svg"
            alt="Crayon de modification"
            class="fill-current text-grey-dark mr-px"
          />
          Sauvegarder
        </button>
      </p>
    </div>
    <div class="mt-4 border-l-4 pl-4">
      <comment
        class="mb-4"
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        :now="now"
        @respond-to="$emit('respond-to', $event)"
      ></comment>
    </div>
  </div>
</template>

<script>
import { formatDistance } from "date-fns";
import { fr } from "date-fns/esm/locale";

export default {
  name: "comment",

  props: ["comment", "now"],

  data() {
    return {
      edit: false,
      newBody: this.comment.body
    };
  },

  computed: {
    //l'heure et la date s'actualise automatiquement
    dateformat() {
      return formatDistance(new Date(this.comment.created_at), this.now, {
        local: fr,
      });
    },
  },

  methods:{
      cancel(){
          this.edit = false,
          this.newBody = this.comment.body
      },
      update(){
          console.log('Updating')
          this.comment.body = this.newBody
          this.edit = false
      }
  }
};
</script>

<style scoped>
#fleche,
#crayon {
  width: 20px;
}
</style>