<template>
  <div class="wall">
    <MainHeader />

    <Feed />
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import Feed from "../components/Feed.vue";

export default {
  name: "wall",
  components: {
    MainHeader,
    Feed,
  },
};
</script>

<style scoped>
.wall {
  width: 100vw;
  /* display: flex;
  justify-content: center; */
}
</style>
