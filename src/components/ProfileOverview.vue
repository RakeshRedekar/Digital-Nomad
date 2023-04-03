<template>
  <div class="box_style">
    <div class="overview_flex">
      <h4>Current Location :</h4>
      <p>{{ profileData.state}},{{ profileData.country }}</p>
    </div>
    <div class="overview_flex">
      <h4>Tags :</h4>
      <el-button
        v-for="(title, index) in profileData.tags"
        type="primary"
        plain
        :key="index"
        >{{ title }}</el-button
      >
    </div>
    <div class="overview_flex">
      <h4>Description :</h4>
      <p>
        {{ profileData.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "overview",
  props: ["profileData"],
  setup(props) {
    console.log('overview: ', props.profileData);
  },
};
</script>

<style scoped>
.overview_flex {
  display: flex;
  align-items: start;
  margin: 20px 0px;
}
p,
h4 {
  margin: 0px;
  padding: 0px;
  line-height: 20px;
}
h4 {
  width: 150px;
}
p {
  width: 400px;
}
</style>
