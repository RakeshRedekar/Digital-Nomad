<template>
  <div>
    <Post
      v-for="post in profilePosts"
      :postData="post"
      :key="post.docID"
      :postIsLiked="isLiked(post.docID)"
      :postIsFollowed="isFollowed(post.userID)"
    />
  </div>
</template>

<script>
import Post from "./Post.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: { Post },
  props: ["profileID"],
  name: "posts",
  setup(props) {
    let store = useStore();
    let follow = computed(() => store.state.loginModule.followingTo);
    let profilePosts = computed(() =>
      store.state.homeModule.posts.filter(
        (ele) => ele.userID === props.profileID
      )
    );

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

    return { store, isLiked, isFollowed, profilePosts };
  },
};
</script>

<style scoped></style>
