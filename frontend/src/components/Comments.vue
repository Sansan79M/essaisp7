<template>
<div>
<div class="widths d-flex justify-content-center">
    <form class="d-flex flex-column"  @submit.prevent="submitComment">
        <textarea class="border rounded p-3 mb-3" v-model="comment"> </textarea>
         <button type="submit" class="border rounded py-2">Commenter</button>
    </form>
</div>
</div>
</template>

<script>
export default {
    name: "comments",
    data() {
        return {
        comment:"",
        }
    },
    methods: {
        submitComment(e) {
            e.preventDefault();
      console.log(this.post);
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.comment)
      };
      console.log(JSON.parse(myInit.body));
      fetch("http://localhost:3000/api/posts/comments", myInit)
        .then((success) => {
          //this.$router.push({ path: '/posts/post' });
          console.log(success + "Un message a été créé");
        })
        .catch((error) => {
          console.log(error + "Le message n'a pas été créé");
        });
        }
    }
}
</script>

<style scoped>
.widths{
    max-width: 600px;

}
</style>