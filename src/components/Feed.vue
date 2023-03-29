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
  name: "feed",
  components: { InputBox, Posts },
};
</script>

<style scoped></style>
