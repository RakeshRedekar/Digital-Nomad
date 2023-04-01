<template>
  <div class="profile main_containt">
    <div class="profile_header box_style">
      <div class="profile_header_top">
        <el-avatar :size="100" fit="fit" src="src/images/Screenshot.png" />
        <div class="profile_name">
          <h2>{{ profileData.displayName }}</h2>
          <p>{{ profileData.numOfFollowers }} followers</p>
        </div>
        <div class="profile_nav">
          <el-button class="follow_btn" type="success" plain
            ><el-icon><Plus /></el-icon>&nbsp; Follow</el-button
          >
        </div>
      </div>
      <ul>
        <router-link
          :to="{ path: '/profile', query: { id: profileID, page: 'overview' } }"
          class="li_item"
          :class="activeClass === 'overview' ? 'activeTab' : ''"
        >
          <h4>Overview</h4>
        </router-link>
        <router-link
          :to="{ path: '/profile', query: { id: profileID, page: 'posts' } }"
          class="li_item"
          :class="activeClass === 'posts' ? 'activeTab' : ''"
        >
          <h4>Posts</h4>
        </router-link>
        <router-link to="/profile/travel" class="li_item">
          <h4>Travel Plan</h4>
        </router-link>
      </ul>
    </div>
    <ProfilePosts v-if="activeClass === 'posts'" :profileID="profileID" />
    <ProfileOverview :profileData="profileData" v-else />
    <!-- <ProfileUpdate /> -->
    <!-- <RouterView></RouterView> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import ProfileOverview from "./ProfileOverview.vue";
import ProfilePosts from "./ProfilePosts.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../main";
// import ProfileUpdate from "./ProfileUpdate.vue";
export default {
  name: "profile",
  components: { ProfileOverview, ProfilePosts },
  setup() {
    let router = useRoute();
    onMounted(async () => {
      const docRef = doc(db, "users", `${router.query.id}`);
      const docSnap = await getDoc(docRef);
      profileData.value = docSnap.data();
      profileID.value = router.query.id;
    });
    let profileID = ref("");
    let profileData = ref({});
    let activeClass = computed(() => router.query.page);
    return { activeClass, profileData, profileID };
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
.li_item,
ul,
h4 {
  margin: 0;
  padding: 0;
}
.li_item {
  width: 120px;
  padding: 15px 0px;
  text-align: center;
}

a {
  text-decoration: none;
  color: black;
}
.activeTab {
  border-bottom: 3px solid blue;
  color: blue;
  box-sizing: border-box;
}
</style>
