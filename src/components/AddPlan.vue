<template>
    <div class="popup">
      <div class="popup_background"></div>
      <div class="popup_container box_style">
        <el-icon size="20" class="close_page" @click="handleClose">
          <CircleClose />
        </el-icon>
        
        <el-button type="success" class="submit_btn" round @click="submitDetails">Submit</el-button>
      </div>
    </div>
  </template>
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { doc, setDoc } from "@firebase/firestore";
  import { db } from "../main";
  export default {
    name: "add-plan",
    // props: ["profileData", "profileID"],
    setup(props, { emit }) {
      onMounted(async () => {
       await axios.get(
          "https://countriesnow.space/api/v0.1/countries/currency"
        ).then((getData) => {
          countries.value = getData.data.data;
        });
      });
      let selectedCountry = ref(null);
      let selectedState = ref(null);
      let countries = ref([]);
    //   let states = ref([])
      let description = ref(null)
      let updateref = doc(db, "plans", "sdclkmskcm");

      let submitDetails = async () => {
        let data = {
          description: description.value,
          country: selectedCountry.value,
          state: selectedState.value,
        }
        await setDoc(
          updateref,
          data,
          { merge: true }
        );
        emit('closePlan')
      }
      let handleClose = () => {
        emit('closePlan')
      }
      return {
        submitDetails, handleClose
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

  
  .close_page {
    float: right;
  }

  .submit_btn {
    float: right;
    margin-top: 20px;
  }
  </style>
  