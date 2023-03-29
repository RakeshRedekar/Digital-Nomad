<template>
  <div class="navigation">
    <ul class="navigationUL">
      <li
        data-name=""
        @click="handleActive('')"
        :class="activeClass == '' ? 'active' : ''"
      >
        <el-icon :class="activeClass == '' ? 'active' : ''" size="25"
          ><HomeFilled
        /></el-icon>
        <p><b>Home</b></p>
      </li>
      <li
        @click="handleActive('Buddy')"
        data-name="Buddy"
        :class="activeClass == 'Buddy' ? 'active' : ''"
      >
        <img
          :class="activeClass == '' ? 'active' : ''"
          src="../../public/icons/add_friend.svg"
          class="buddy_svg"
        />
        <p><b>Find Buddy</b></p>
      </li>
      <li
        @click="handleActive('travel')"
        data-name="travel"
        :class="activeClass == 'travel' ? 'active' : ''"
      >
        <img src="../../public/icons/travel-icon.svg" class="travel_svg" />
        <p><b> Plans</b></p>
      </li>
      <li
        @click="handleActive('profile')"
        data-name="profile"
        :class="activeClass == 'profile' ? 'active' : ''"
      >
        <el-avatar :size="25" fit="fit" src="src/images/Screenshot.png" />
        <p><b>Profile</b></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "main-header",
  setup() {
    let activeClass = ref("");
    let router = useRouter();
    let handleActive = (data) => {
      activeClass.value = data;
      router.push("/" + data);
    };
    return { activeClass, handleActive };
  },
};
</script>

<style scoped>
.navigation {
  width: 100vw;
  position: sticky;
  top: 0px;
  font-family: "open sans", Arial, Helvetica, sans-serif;
  background-color: white;
}
.navigationUL {
  margin: 0px;
  list-style: none;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.navigationUL li {
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
.active {
  color: blue;
}
li.active {
  border-bottom: 3px solid blue;
}
</style>
