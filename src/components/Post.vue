<template>
  <div class="post main_containt box_style">
    <div class="post_heading">
      <el-avatar :size="50" fit="fit" :src="profilePic" />
      <router-link :to="{
          path: '/users',
          query: {
            id: `${postData.userID}`,
            page: 'overview',
          },
        }">
      <div class="title_left">
        <p>
          <b>{{ postData.displayName }}&nbsp;</b>is at &nbsp;<b>{{postData.state? `${postData.state},${postData.country}`:postData.country }}</b>
        </p>
        <p>{{ gettingDate(postData.timestamp) }}</p>
      </div>
    </router-link>
      <el-button
        v-if="
          isFollowing && postData.userID !== store.state.loginModule.user.userID
        "
        class="follow_btn"
        type="success"
        plain
        @click="handleUnfollow"
        >Following..</el-button
      >
      <el-button
        v-else-if="postData.userID !== store.state.loginModule.user.userID"
        class="follow_btn"
        type="success"
        plain
        @click="handleFollow"
        ><el-icon><Plus /></el-icon>&nbsp; Follow</el-button
      >
    </div>
    <div class="post_body">
      <p>
        {{ postData.postDiscrip }}
      </p>
      <img class="post_body_img" :srcset="postData.postImg" />
    </div>
    <div class="post_footer">
      <div class="footer_top">
        <div class="num_of_likes">
          <p v-if="isLiked">You and&nbsp;</p>
          {{ postData.numOfLikes }} others
        </div>
        <p>24 comments</p>
      </div>
      <div class="footer_bottom">
        <div class="footer_action" @click="likePost">
          <!-- <img
            src="../../public/icons/reshot-icon-heart.svg
          "
          /> -->
          <el-icon v-if="isLiked" size="25" color="blue"
            ><StarFilled
          /></el-icon>
          <el-icon v-else size="25"><Star /></el-icon>

          <p>Like</p>
        </div>
        <div class="footer_action">
          <el-icon size="25"><ChatLineSquare /></el-icon>
          <p >Comment</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { increment, deleteDoc } from "firebase/firestore";
import { ref as storageRef, getDownloadURL } from "@firebase/storage";
import { useStore } from "vuex";
// import { collection } from "firebase/firestore";
import { db, storage } from "../main";
import { onMounted, computed } from "vue";
export default {
  name: "post",
  props: ["postData", "postIsLiked"],

  setup(props) {
    let store = useStore();
    onMounted(async () => {
      // let data = await getDocs(
      //   collection(db, "posts", props.postData.docID, "likes")
      // );
      isLiked.value = props.postIsLiked;
      await getDownloadURL(storageRef(storage, `profilePics/${props.postData.userID}`)).then(async (downloadURL) =>
      profilePic.value=downloadURL).catch(()=>{console.log("Profile pic missing for some posts");});
      // isFollowing.value = props.postIsFollowed;
    });

    let isLiked = ref(false);
    let profilePic = ref("../assets/logo.png")
    let isFollowing = computed(() =>
      store.getters["loginModule/isFollowing"](props.postData.userID)
    );

    let gettingDate = (timeInstance) => {
      let postTime = timeInstance.toDate();
      let temp = postTime.toString();
      postTime = temp.slice(0, 21);
      return postTime;
    };
    let likePost = async () => {
      const washingtonRef = doc(
        db,
        "users",
        store.state.loginModule.user.userID,
        "likes",
        props.postData.docID
      );
      let numOfLikesRef = doc(db, "posts", props.postData.docID);
      if (isLiked.value) {
        await setDoc(
          numOfLikesRef,
          {
            numOfLikes: increment(-1),
          },
          { merge: true }
        );
        await deleteDoc(washingtonRef);
      } else {
        await setDoc(
          numOfLikesRef,
          {
            numOfLikes: increment(1),
          },
          { merge: true }
        );
        let likedPosts = {};
        likedPosts.likedPost = props.postData.docID;
        likedPosts.timestamp = Timestamp.now();
        // let k = collection(db, "posts", props.postData.docID, "likes");

        // let temp = props.postData.userID;
        // let obj = {};
        // obj[temp] = isLiked.value;
        // const q = query(
        //   k,
        //   where("likes", "array-contains", props.postData.userID)
        // );
        await setDoc(washingtonRef, likedPosts, { merge: true });

        // let querySnapshot = await getDocs(q);
        // querySnapshot.forEach((element) => {
        //   console.log("now:", element.data(), element.id);
        // });
      }
      isLiked.value = !isLiked.value;
    };
    let handleFollow = async () => {
      store.commit("loginModule/handleFollowing", props.postData.userID);
    };

    let handleUnfollow = () =>{
      store.commit("loginModule/handleUnfollow", props.postData.userID);
    }


    return { gettingDate, isLiked, likePost, handleFollow,handleUnfollow, isFollowing, store , profilePic};
  },
};
</script>

<style scoped>
/* a{
  text-decoration: none;
  color: black;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
} */
.post_heading {
  display: flex;
}
.title_left {
  width: 350px;
  margin: 0px 20px;
}
.title_left > p:first-child {
  margin-top: 0px;
  padding-top: 0px;
  font-size: large;
}
.title_left > p:nth-child(2) {
  margin-top: 0px;
  padding-top: 0px;
  font-size: small;
  color: rgb(74, 74, 74);
}
.follow_btn {
  float: right;
}
.post_body_img {
  width: 100%;
  max-height: 800px;
}
.footer_top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* font-size: small; */
  color: gray;
  border-bottom: 1px solid gray;
}
.footer_bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.num_of_likes {
  display: flex;
  height: 50px;
  align-items: center;
}
.num_of_likes p {
  margin: 0px;
}
/* .footer_bottom img {
  height: 30px;
} */
.footer_action {
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  width: 200px;
  justify-content: center;
  margin-top: 5px;
}

.footer_action p {
  margin: 0px 10px;
}
</style>
