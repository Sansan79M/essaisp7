<template>
  <div id="comment-box" class="col-md-12">
    <div id="comment-displayed">
      <form  @submit.prevent="submitComment(postId)">    
          <textarea
            class="border rounded p-2 mb-2 text-color"
            v-model="newComment.content"
            placeholder="Commentaire"
          ></textarea>
        <button
          type="submit"
          class="btn text-white btn-md"
        >COMMENTER
        </button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "commentForm",
  props: ["respondTo", "postId"],
  data() {
    return {
      newComment: {
        userId: "",
        postId: "",
        content: "",
        //edit: false,
      },
    };
  },

  /*computed: {
    fullForm() {
      if (this.respondTo) {
        return {
          ...this.newComment,
          respond_to_id: this.respondTo.id,
        };
      }
      return this.newComment;
    },
  },*/

  methods: {
    submitComment(postId) {
      const storage = JSON.parse(localStorage.getItem("storage_user"));
      this.newComment.userId = storage.userId;
      this.newComment.postId = postId;
      console.log(this.newComment)
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.newComment),
      };
      console.log(this.newComment);
      fetch("http://localhost:3000/api/comments/create", myInit)
        .then((result) => {
          window.location.reload(); 
          result
            .json()
            .then((data) => {
              if (data.error) {
                console.log(data);
                return;
              }
              console.log(result + "Un commentaire a été créé");
            })
            .catch((error) => {
              console.log(error + "Aucun commentaire n'a pas été créé");
            });
        })
        .catch((error) => {
          console.log(error + "La création de commentaire ne fonctionne pas");
        });
    },
    cancel() {
      (this.edit = false), (this.newContent = this.newComment.content);
    },
  },
};
</script>

<style scoped>
#comment-box {
  margin-top: 30px;
  max-width: 600px;
  height: 170px;
  border: 1px solid #0b505b;
  background-color: rgb(252, 252, 111);
}
#comment-box #comment-displayed {
  padding: 20px;
}

#comment-box #comment-displayed #register-link {
  margin-top: -85px;
}
.text-color {
  color: #0b505b !important;
}
button {
  background-color: #0b505b !important;
}
#comment-box {
  box-shadow: 10px 10px 10px #b32204;
}
#comment-box:hover {
  box-shadow: 5px 5px 5px #b32204;
  transition: transform 5s;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
}
</style>