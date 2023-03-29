<template>
  <div class="profile main_containt">
    <div class="profile_header box_style">
      <div class="profile_header_top">
        <el-avatar :size="100" fit="fit" src="src/images/Screenshot.png" />
        <div class="profile_name">
          <h2>Rakesh Redekar</h2>
          <p>447 followers</p>
        </div>
        <div class="profile_nav">
          <el-button class="follow_btn" type="success" plain
            ><el-icon><Plus /></el-icon>&nbsp; Follow</el-button
          >
        </div>
      </div>
      <ul>
        <li
          :class="activeClass == '' ? 'active' : ''"
          @click="handleActive('')"
        >
          <h4>Overview</h4>
        </li>
        <li
          :class="activeClass == 'posts' ? 'active' : ''"
          @click="handleActive('posts')"
        >
          <h4>Posts</h4>
        </li>
        <li
          :class="activeClass == 'travel' ? 'active' : ''"
          @click="handleActive('travel')"
        >
          <h4>Travel Plan</h4>
        </li>
      </ul>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "profile",
  components: {},
  setup() {
    let activeClass = ref("");
    let router = useRouter();
    let handleActive = (data) => {
      activeClass.value = data;
      router.push("/profile/" + data);
    };
    return { activeClass, handleActive };
  },
};
</script>

<style scoped>
.profile {
  margin: 20px 0px;
}
.profile_header {
  padding-bottom: 0px;
}
.profile_header_top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.profile_name {
  width: 320px;
}

ul {
  display: flex;
  list-style: none;
  justify-content: space-between;
  box-sizing: border-box;
  color: gray;
}
li,
ul,
h4 {
  margin: 0;
  padding: 0;
}
li {
  width: 120px;
  padding: 15px 0px;
  text-align: center;
}
.active {
  border-bottom: 5px solid blue;
  color: blue;
  box-sizing: border-box;
}
</style>
