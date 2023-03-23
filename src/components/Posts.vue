<template>
  <div>
    <Post v-for="post in posts" :postData="post" :key="post.id" />

    <!-- Input Box -->
  </div>
</template>

<script>
import Post from "./Post.vue";
import { db } from "../main";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
export default {
  components: { Post },
  setup() {
    let posts = ref([]);
    onMounted(() => {
      getPosts();
    });
    let getPosts = async () => {
      let data = await getDocs(collection(db, "posts"));

      data.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        posts.value.push({ ...doc.data(), docID: doc.id });
        // console.log(doc.id, " => ", doc.data());
      });
      console.log("type", typeof posts.value, posts.value);
    };
    return { posts, getPosts };
  },
};
</script>

<style scoped></style>
