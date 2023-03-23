<template>
  <div class="feed">
    <!-- Feeds -->

    <!-- Stories -->

    <InputBox />
    <Posts />

    <!-- Input Box -->
  </div>
</template>

<script>
import InputBox from "./InputBox.vue";
import Posts from "./Posts.vue";
export default {
  components: { InputBox, Posts },
};
</script>

<style scoped>
.feed {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0px;
}
</style>
