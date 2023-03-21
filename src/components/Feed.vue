<template>
  <div class="feed">
    <!-- Feeds -->

    <!-- Stories -->

    <InputBox />

    <!-- Input Box -->
  </div>
</template>

<script>
import InputBox from "./InputBox.vue";
export default {
  components: { InputBox },
};
</script>

<style scoped>
.feed {
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 40px 0px;
}
</style>
