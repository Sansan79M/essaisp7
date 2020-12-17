<template>
  <div>
    <div>
      <p>{{ comment.username }} - le {{ comment.createdAt }}</p>
      <p v-if="edit">
        <textarea v-model="newDescription"></textarea>
      </p>
      <p v-else>
        {{ comment.title }}<br>
        {{ comment.description }}
      </p>
    </div>
    <div>
      <p v-if="edit" class="flex -mx-2">
        <button type="button" class="flex items-center text-xs mx-2" @click="cancel()">
          <img src="../assets/close.svg" alt="flèche répondre" class="h-3"/>
          Annuler
        </button>
        <button type="button" class="flex items-center text-xs mx-2" @click="update()">
          <img src="../assets/save-disk.svg" alt="crayon modifier" class="h-3"/>
          Sauvegarder
        </button>
      </p>
      <p v-else class="flex -mx-2">
        <button type="button" class="flex items-center text-xs mx-2" @click="$emit('respond-to', comment)"><!--respond-to pour répondre à un commentaire-->
          <img src="../assets/reply.svg" alt="flèche répondre" class="h-3"/>
          Répondre
        </button>
        <button type="button" class="flex items-center text-xs mx-2" @click="edit=true"><!--respond-to pour répondre à un commentaire-->
          <img src="../assets/edit-pencil.svg" alt="crayon modifier" class="h-3"/>
          Modifier
        </button>
      </p>
    </div>
    <div class="mt-4 border-l-4 pl-4">
      <comment
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        @respond-to="$emit((respondTo = $even))"
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

</style>