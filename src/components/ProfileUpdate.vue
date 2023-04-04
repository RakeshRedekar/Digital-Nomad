<template>
  <div class="popup">
    <div class="popup_background"></div>
    <div class="popup_container box_style">
      <el-icon size="20" class="close_page" @click="handleClose">
        <CircleClose />
      </el-icon>
      <!-- <div v-if="postImg" class="preview_img_div">
        <img :src="postImg" class="postImgtemp" />
        <el-icon size="20" @click="removeImage" class="remove_image"
          ><CircleClose
        /></el-icon>
      </div> -->
      <div class="add_image">
        <div  v-if="postImg">
          <img :src="postImg" class="postImgtemp" @click="$refs.filepickerRef.click()" />
          <el-icon size="20" @click="removeImage" class="remove_image">
            <CircleClose />
          </el-icon>
        </div>
        <p v-else @click="$refs.filepickerRef.click()"> Choose Profile Picture</p>
        <input type="file" class="input_hidden" ref="filepickerRef" @change="setImg" />
      </div>
      <div class="location">
        <h4>Current Location :</h4>
        <el-select v-model="selectedCountry" class="location_input" placeholder="Select Country" @change="selectState">
          <el-option class="location_input" v-for="item in countries" :key="item.name" :label="item.name"
            :value="item.name" />
        </el-select>
        <el-select v-model="selectedState" class="m-2" placeholder="Select State">
          <el-option v-for="item in states" :key="item.name" :label="item.name" :value="item.name" />
        </el-select>
      </div>
      <div class="tags">
        <h4>Tags :</h4>
        <div class="tags_button">
          <el-button v-for="(item, index) in defaultTags" :key="index" type="primary" :plain='isPlain(item)'
            @click="selectedTagsFunc(item)">{{ item }} </el-button>
        </div>
      </div>
      <div>
        <h4>Description :</h4>
        <el-input v-model="description" :rows="5" type="textarea" placeholder="Please input" maxlength="250" />
      </div>
      <el-button type="success" class="submit_btn" round @click="submitDetails">Submit</el-button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { doc, setDoc } from "@firebase/firestore";
import {
  ref as storageReference,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { db, storage } from "../main";
export default {
  name: "profileUpdate",
  props: ["profileData", "profileID"],
  setup(props, { emit }) {
    onMounted(() => {
      axios.get(
        "https://countriesnow.space/api/v0.1/countries/currency"
      ).then((getData) => {
        countries.value = getData.data.data;
      });
    });
    let postImg = ref(props.profileData.profilePic ? props.profileData.profilePic : null);
    let selectedCountry = ref(props.profileData.country);
    let selectedState = ref(props.profileData.state);
    let countries = ref([]);
    let states = ref([])
    let picToBeUploaded = ref(null);
    let defaultTags = ['Vegitarian', 'No-Drinking', 'Non-smoker', 'Full time Travelling', 'Digital Nomad', 'Beach', 'Mountain', 'Food', 'Pets', 'Yoga', 'Gym', 'Spiritual'];
    let selectedTags = ref(props.profileData.tags?props.profileData.tags:[]);
    let description = ref(props.profileData.description)
    let updateref = doc(db, "users", props.profileID);
    let profilePicRef = storageReference(storage, "profilePics/" + props.profileID)
    let setImg = (e) => {
      picToBeUploaded.value = e.target.files[0];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(e.target.files[0]);
      oFReader.onload = function (oFREvent) {
        postImg.value = oFREvent.target.result;
      };
    };
    const removeImage = () => {
      postImg.value = null;
      picToBeUploaded.value = null;
    };
    let selectState = async () => {
      selectedState.value = '';
      let body = { 'country': selectedCountry.value };
      let stateData = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        body
      );
      states.value = stateData.data.data.states;
    };
    let selectedTagsFunc = (val) => {
      let i = selectedTags.value.indexOf(val)
      if (i >= 0) {
        selectedTags.value.splice(i, 1)
      }
      else if(selectedTags.value.length<=2){
        selectedTags.value.push(val)
      }
    }
    let isPlain = (item) => {
      if (selectedTags.value.indexOf(item) >= 0) {
        return false
      }
      return true
    }
    let submitDetails = async () => {
      let data = {
        description: description.value,
        country: selectedCountry.value,
        state: selectedState.value,
        tags: [...selectedTags.value],
      }
      if (picToBeUploaded.value) {
        let uploadTask = await uploadBytesResumable(
          profilePicRef,
          picToBeUploaded.value
        );
        await getDownloadURL(uploadTask.ref).then(async (downloadURL) => {
          data.profilePic = downloadURL;
        });
      }
      await setDoc(
        updateref,
        data,
        { merge: true }
      );
      emit('closeUpdate')
    }
    let handleClose = () => {
      emit('closeUpdate')
    }
    return {
      setImg,
      postImg,
      removeImage,
      selectedCountry,
      countries,
      selectState,
      selectedState,
      states,
      defaultTags,
      isPlain,
      selectedTagsFunc,
      description,
      submitDetails,
      handleClose
    };
  },
};
</script>
<style scoped>
.popup {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup_background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 50;
  background-color: gray;
  opacity: 0.5;
}

.popup_container {
  width: 500px;
  height: 800px;
  background-color: white;
  border-radius: 10px;
  z-index: 60;
}

.preview_img_div {
  display: flex;
  width: 100%;
  justify-content: center;
}

.remove_image {
  position: relative;
  left: 0px;
  top: -190px;
  z-index: 5;
  color: white;
}

.close_page {
  float: right;
}

.add_image {
  width: 300px;
  height: 200px;
  text-align: center;
  box-sizing: border-box;
  line-height: 180px;
  margin: auto;
  color: gray;
  border: 1px solid gray;
}

.input_hidden {
  display: none;
}

.postImgtemp {
  max-width: 300px;
  max-height: 200px;
}

.location_input {
  margin: 0px 5px;
}

.tags_button {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
}

.submit_btn {
  float: right;
  margin-top: 20px;
}
</style>
