<template>
  <div @click="isLiked">
    <Post
      v-for="post in store.state.homeModule.posts"
      :postData="post"
      :key="post.docID"
      :postIsLiked="isLiked(post.docID)"
    />

    <!-- Input Box -->
  </div>
</template>

<script>
import Post from "./Post.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  components: { Post },
  setup() {
    let store = useStore();
    onMounted(() => {
      store.dispatch("homeModule/getPosts");
    });
    let isLiked = (id) => {
      if (store.state.loginModule.likedPosts) {
        return store.state.loginModule.likedPosts.includes(id);
      } else {
        return false;
      }
    };

    return { store, isLiked };
  },
};
</script>

<style scoped></style>
