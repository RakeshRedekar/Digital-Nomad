<template>
    <div class="main_containt box_style buddy_card">
      <el-avatar :size="100" fit="fit" :src="planDetails.profilePic" />
      <div class="buddy_details">
        <div>
          <router-link :to="{
            path: '/users',
            query: {
              id: `${planDetails.userID}`,
              page: 'overview',
            },
          }">
          <h4>{{ planDetails.displayName }}</h4>
      </router-link>
  
          <p>{{ planDetails.numOfFollowers }} followers</p>
          <p>
              <el-icon size="20"><Location /></el-icon>
            {{
              planDetails.fromState
                ? `${planDetails.fromState},${planDetails.fromCountry}`
                : planDetails.fromCountry
            }}
          </p>
        </div>
        <div class="tags">
          <!-- <el-button
            v-for="(title, index) in planDetails.tags"
            type="primary"
            plain
            :key="index"
            size="small"
            >{{ title }}</el-button
          > -->
        </div>
      </div>
      <div class="follow_div">
        <el-button
          v-if="
            isFollowing &&
            planDetails.uid !== store.state.loginModule.user.userID
          "
          class="follow_btn"
          type="success"
          plain
          @click="handleUnfollow"
          >Following..</el-button
        >
        <el-button
          v-else-if="planDetails.uid !== store.state.loginModule.user.userID"
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
    name: "travel-card",
    props: ["planDetails"],
    setup(props) {
      let store = useStore();
      let isFollowing = computed(() =>
        store.getters["loginModule/isFollowing"](props.planDetails.userID)
      );
      let handleFollow = async () => {
        store.commit("loginModule/handleFollowing", props.planDetails.userID);
      };
      
      let handleUnfollow = () =>{
        store.commit("loginModule/handleUnfollow", props.planDetails.userID);
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
  