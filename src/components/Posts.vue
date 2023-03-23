<template>
  <div>
    <Post
      v-for="post in store.state.homeModule.posts"
      :postData="post"
      :key="post.id"
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

    return { store };
  },
};
</script>

<style scoped></style>
