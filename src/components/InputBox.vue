<template>
  <div class="inputBox">
    <div class="input_post">
      <el-avatar :size="50" :fit="fit" src="src/images/Screenshot.png" />
      <div class="post_field">
        <el-input v-model="postDiscrip">What's on your mind?</el-input>
      </div>
      <el-button type="success" :icon="Check" round @click="submitForm"
        >Post</el-button
      >
    </div>
    <div v-if="postImg" class="postImgtemp">
      <img :src="postImg" class="postImgtemp" />
    </div>
    <div class="add_attachments">
      <div class="input_options">
        <img src="../images/video_img.png" />
        <b>Add Video</b>
      </div>
      <div @click="$refs.filepickerRef.click()" class="input_options">
        <img src="../images/add_image.png" />
        <input
          type="file"
          class="input_hidden"
          ref="filepickerRef"
          @change="setImg"
        /><b>Add Picture</b>
      </div>
      <div class="input_options">
        <img src="../images/location.png" />
        <b>Add Locaton</b>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  ref as storageReference,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { Timestamp, addDoc, collection } from "@firebase/firestore";
import { storage, db } from "../main";
import { useStore } from "vuex";
import { v4 as uuid } from "uuid";
export default {
  name: "input-box",
  setup() {
    // let filepickerRef = ref(null);
    let store = useStore();
    const storageRef = storageReference(storage, "images/" + uuid());
    let postDiscrip = ref("");
    let postImg = ref(null);
    let picToBeUploaded = ref(null);
    let setImg = (e) => {
      picToBeUploaded.value = e.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(e.target.files[0]);
      oFReader.onload = function (oFREvent) {
        postImg.value = oFREvent.target.result;
      };
    };
    let submitForm = async () => {
      // if (picToBeUploaded.value) {
      let uploadTask = await uploadBytesResumable(
        storageRef,
        picToBeUploaded.value
      );
      const data = {
        ...store.state.loginModule.user,
        postDiscrip: postDiscrip.value,
        timestamp: Timestamp.now(),
      };
      getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
        console.log("second");
        await addDoc(collection(db, "posts"), {
          ...data,
          postImg: downloadURL,
        });
        // await updateDoc(doc(db, "usersPosts", currentUser.uid), {
        //   messages: arrayUnion({
        //     id: uuid(),
        //     uid: currentUser.uid,
        //     photoURL: currentUser.photoURL,
        //     displayName: currentUser.displayName,
        //     input,
        //     img: downloadURL,
        //     timestamp: Timestamp.now(),
        //   }),
        // });
      });
      // };
      // );
      // }
      // else {
      //   await addDoc(collection(db, "posts"), {
      //     uid: currentUser.uid,
      //     photoURL: currentUser.photoURL,
      //     displayName: currentUser.displayName,
      //     input,

      //     timestamp: serverTimestamp(),
      //   });

      //   await updateDoc(doc(db, "usersPosts", currentUser.uid), {
      //     messages: arrayUnion({
      //       id: uuid(),
      //       uid: currentUser.uid,
      //       photoURL: currentUser.photoURL,
      //       displayName: currentUser.displayName,
      //       input,

      //       timestamp: Timestamp.now(),
      //     }),
      //   });
      // }
    };

    const removeImage = () => (postImg.value = null);
    return { postDiscrip, postImg, setImg, submitForm, removeImage };
  },
};
</script>

<style scoped>
.inputBox {
  height: 100%;
  width: 600px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 5px grey;
}
.postImgtemp {
  width: 200px;
  height: 200px;
}
.input_post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e6eb;
}

.post_field {
  width: 400px;
  display: flex;
  /* background-color: #f0f2f5;
  border-radius: 25px; */
  align-items: center;
}
.input_hidden {
  display: none;
}
.post_field p {
  color: #65676b;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: larger;
  margin: 0px 0px 0px 25px;
}
.add_attachments {
  display: flex;
  width: 550px;
  margin-top: 18px;
  justify-content: space-around;
}
.add_attachments > div {
  display: flex;
  align-items: center;
}
.add_attachments b {
  margin-left: 5px;
  color: #65676b;
}
</style>
