<template>
  <div @click="isLiked">
    <Post
      v-for="post in store.state.homeModule.posts"
      :postData="post"
      :key="post.docID"
      :postIsLiked="isLiked(post.docID)"
      :postIsFollowed="isFollowed(post.userID)"
    />
  </div>
</template>

<script>
import Post from "./Post.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: { Post },
  setup() {
    let store = useStore();
    let follow = computed(() => store.state.loginModule.followingTo);
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
    let isFollowed = (id) => {
      if (follow.value.indexOf(id)) {
        return true;
      } else {
        return false;
      }
    };

    return { store, isLiked, isFollowed };
  },
};
</script>

<style scoped></style>
