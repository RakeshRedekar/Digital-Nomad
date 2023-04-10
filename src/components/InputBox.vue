<template>
  <div class="inputBox box_style">
    <div class="input_post">
      <el-avatar :size="50" fit="fit" :src="profilePic" />
      <div class="post_field">
        <el-input v-model="postDiscrip">What's on your mind?</el-input>
      </div>
      <el-button type="success" :icon="Check" round @click="submitForm"
        >Post</el-button
      >
    </div>
    <div v-if="postImg" class="preview_img_div">
      <img :src="postImg" class="postImgtemp" />
      <el-icon size="20" @click="removeImage" class="remove_image">
        <CircleClose />
      </el-icon>
    </div>
    <div class="add_attachments">
      <div>
        <img src="../images/video_img.png" />

        <b>Add Video</b>
      </div>
      <div @click="$refs.filepickerRef.click()" >
        <img src="../images/add_image.png" />
        <input
          type="file"
          class="input_hidden"
          ref="filepickerRef"
          accept="image/*"
          @change="setImg"
        /><b>Add Picture</b>
      </div>
      <div class="input_options">
        <div
          ref="buttonRef"
          v-click-outside="onClickOutside"
          class="location_display"
        >
          <img src="../images/location.png" /><b v-if="selectedCountry">{{
            selectedState? `${selectedState},${selectedCountry}`:selectedCountry
          }}</b>
          <b v-else>Add Location</b>
        </div>

        <el-popover
          ref="popoverRef"
          :virtual-ref="buttonRef"
          trigger="click"
          title="Select Location :"
          virtual-triggering
          class="pop_over"
          width="350px"
        >
          <div class="location_dropdown">
            <el-select
              v-model="selectedCountry"
              class="location_input"
              placeholder="Select Country"
              @change="selectState"
            >
              <el-option
                class="location_input"
                v-for="item in countries"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            <el-select
              v-model="selectedState"
              class="m-2"
              placeholder="Select State"
            >
              <el-option
                v-for="item in states"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import { ref, unref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  ref as storageReference,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { Timestamp, addDoc, collection } from "@firebase/firestore";
import { storage, db } from "../main";
import { useStore } from "vuex";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default {
  name: "input-box",
  setup() {
    // let filepickerRef = ref(null);
    onMounted(() => {
      axios
        .get("https://countriesnow.space/api/v0.1/countries/currency")
        .then((getData) => {
          countries.value = getData.data.data;
        });
    });
    let store = useStore();
    const storageRef = storageReference(storage, "images/" + uuid());
    let postDiscrip = ref("");
    let postImg = ref(null);
    let picToBeUploaded = ref(null);
    let selectedCountry = ref(null);
    let selectedState = ref(null);
    let countries = ref([]);
    let states = ref([]);
    const buttonRef = ref();
    const popoverRef = ref();
    const onClickOutside = () => {
      unref(popoverRef).popperRef?.delayHide?.();
    };
    let profilePic = ref(store.state.loginModule.user.profilePic);
    let setImg = (e) => {
      picToBeUploaded.value = e.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(e.target.files[0]);
      oFReader.onload = function (oFREvent) {
        postImg.value = oFREvent.target.result;
      };
    };

    let submitForm = async () => {
      console.log("store.state.loginModule.user: ", store.state.loginModule.user);
      if (selectedCountry.value && postDiscrip.value) {
        let data = {
          ...store.state.loginModule.user,
          postDiscrip: postDiscrip.value,
          timestamp: Timestamp.now(),
          numOfLikes: 0,
          country : selectedCountry.value,
          state : selectedState.value
        };
        if (picToBeUploaded.value) {
          let uploadTask = await uploadBytesResumable(
            storageRef,
            picToBeUploaded.value
          );
          await getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
            data.postImg = downloadURL;
          });
        }
        await addDoc(collection(db, "posts"), {
          ...data,
        }).then((d) => {
          store.commit("homeModule/addPost", { ...data, docID: d.id });
        });
        postDiscrip.value = "";
        postImg.value = null;
        selectedState.value = null;
        selectedCountry.value = null
      } else if(postDiscrip.value){
        ElMessage({
          message: "Select Location",
          type: "warning",
        });
      }
      else{
        ElMessage({
          message: "Write Post",
          type: "warning",
        });
      }
    };

    let selectState = async () => {
      selectedState.value = "";
      let body = { country: selectedCountry.value };
      let stateData = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        body
      );
      states.value = stateData.data.data.states;
    };
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

    const removeImage = () => {
      postImg.value = null;
      picToBeUploaded.value = null;
    };

    return {
      postDiscrip,
      postImg,
      setImg,
      submitForm,
      removeImage,
      profilePic,
      onClickOutside,
      buttonRef,
      selectedCountry,
      selectedState,
      selectState,
      states,
      countries,
    };
  },
};
</script>

<style scoped>
.inputBox {
  /* height: 100%; */
  width: 600px;
  margin: 20px 0px;
}

.postImgtemp {
  width: 200px;
  max-height: 200px;
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

.preview_img_div {
  display: flex;
  width: 100%;
  justify-content: center;
}

.add_attachments b {
  margin-left: 5px;
  color: #65676b;
}

.remove_image {
  position: relative;
  left: -23px;
  top: 3px;
  z-index: 5;
}
.location_dropdown {
  display: flex;
  width: 300px;
  column-gap: 10px;
}
.location_display {
  display: flex;
  
}
.location_display b{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
}
</style>
