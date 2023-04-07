<template>
  <div class="wall">
    <MainHeader />
    <router-view />
    <!-- <Feed /> -->
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
// import Feed from "../components/Feed.vue";

export default {
  name: "wall",
  components: {
    MainHeader,
  },
};
</script>

<style scoped>
.wall {
  width: 100vw;
  display: flex;
  min-height: 100vh;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  padding: 0px 0px;
  background-color: #F0F2F5;
}
</style>
