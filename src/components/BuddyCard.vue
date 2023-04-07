<template>
  <div class="main_containt box_style buddy_card">
    <el-avatar :size="100" fit="fit" :src="buddyDetails.profilePic" />
    <div class="buddy_details">
      <div>
        <h4>{{ buddyDetails.displayName }}</h4>
        <p>{{ buddyDetails.numOfFollowers }} followers</p>
        <p>
            <el-icon size="20"><Location /></el-icon>
          {{
            buddyDetails.state
              ? `${buddyDetails.state},${buddyDetails.country}`
              : buddyDetails.country
          }}
        </p>
      </div>
      <div class="tags">
        <el-button
          v-for="(title, index) in buddyDetails.tags"
          type="primary"
          plain
          :key="index"
          size="small"
          >{{ title }}</el-button
        >
      </div>
    </div>
    <div class="follow_div">
      <el-button
        v-if="
          isFollowing &&
          buddyDetails.uid !== store.state.loginModule.user.userID
        "
        class="follow_btn"
        type="success"
        plain
        @click="handleUnfollow"
        >Following..</el-button
      >
      <el-button
        v-else-if="buddyDetails.uid !== store.state.loginModule.user.userID"
        class="follow_btn"
        type="success"
        plain
        @click="handleFollow"
        ><el-icon><Plus /></el-icon>&nbsp; Follow</el-button
      >
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "buddy-card",
  props: ["buddyDetails"],
  setup(props) {
    let store = useStore();
    let isFollowing = computed(() =>
      store.getters["loginModule/isFollowing"](props.buddyDetails.uid)
    );
    let handleFollow = async () => {
      store.commit("loginModule/handleFollowing", props.buddyDetails.uid);
    };
    
    let handleUnfollow = () =>{
      store.commit("loginModule/handleUnfollow", props.buddyDetails.uid);
    }
    return { store, isFollowing, handleFollow, handleUnfollow };
  },
};
</script>

<style scoped>
.buddy_card {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px;
}

.buddy_details {
  width: 350px;
  margin: 0px 10px;
}
.buddy_details h4, p{
    margin: 8px 0px;
}
.tags{
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;

}
.follow_div{
    height: 100px;
    display: flex;
    align-items: flex-start;
    
}
</style>
