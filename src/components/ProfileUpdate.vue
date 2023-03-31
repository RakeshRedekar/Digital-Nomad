<template>
  <div class="popup">
    <div class="popup_background"></div>
    <div class="popup_container box_style">
      <div v-if="postImg" class="preview_img_div">
        <img :src="postImg" class="postImgtemp" />
        <el-icon size="20" @click="removeImage" class="remove_image"
          ><CircleClose
        /></el-icon>
      </div>
      <div v-else class="add_image" @click="$refs.filepickerRef.click()">
        Choose Profile Picture
        <input
          type="file"
          class="input_hidden"
          ref="filepickerRef"
          @change="setImg"
        />
      </div>
      <div>Hello</div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "profileUpdate",
  setup() {
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
    const removeImage = () => {
      postImg.value = null;
      picToBeUploaded.value = null;
    };
    return { setImg, postImg, removeImage };
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
  z-index: 60;
}
.preview_img_div {
  display: flex;
  width: 100%;
  justify-content: center;
}
.remove_image {
  position: relative;
  left: -23px;
  top: 3px;
  z-index: 5;
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
  width: 300px;
  max-height: 300px;
}
</style>
