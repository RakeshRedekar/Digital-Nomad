<template>
  <div class="navigation">
    <img src="../../public/icons/icon.png" class="app_logo"/>
    <ul class="navigationUL">

      

      <router-link to="/home" exact class="li_item">
        <el-icon size="25"><HomeFilled /></el-icon>
        <p><b>Home</b></p>
      </router-link>
      <router-link to="/findbuddy" class="li_item">
        <img src="../../public/icons/add_friend.svg" class="buddy_svg" />
        <p><b>Find Buddy</b></p>
      </router-link>
      <router-link to="/plans" class="li_item">
        <img src="../../public/icons/travel-icon.svg" class="travel_svg" />
        <p><b> Plans</b></p>
      </router-link>
      <router-link
        :to="{
          path: '/profile',
          query: {
            id: `${store.state.loginModule.user.userID}`,
            page: 'overview',
          },
        }"
        class="li_item"
      >
        <el-avatar :size="50" fit="fit" :src="store.state.loginModule.user.profilePic" />
      </router-link>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "main-header",
  setup() {
    let store = useStore();
    return { store };
  },
};
</script>

<style scoped>
.app_logo{
  height: 76px;
  position: absolute;
margin: 0px 50px;
border-radius: 38px;

}
.navigation {
  width: 100vw;
  position: sticky;
  top: 0px;
  font-family: "open sans", Arial, Helvetica, sans-serif;
  background-color: white;
  z-index: 90;
}
.navigationUL {
  margin: 0px;
  list-style: none;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.navigationUL .li_item {
  text-align: center;
  padding: 10px;
  width: 150px;
}
.navigationUL p {
  margin: 2px;
}
.buddy_svg {
  height: 25px;
}
.travel_svg {
  height: 25px;
}
/* .active {
  color: blue;
} */
.router-link-active {
  /* color: blue; */
  border-bottom: 3px solid #0000ff;
  
}
a {
  text-decoration: none;
  color: black;
}

/* .router-link-exact-active {
  color: #f66;
} */
</style>
