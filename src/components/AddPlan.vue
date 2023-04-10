<template>
  <div class="popup">
    <div class="popup_background"></div>
    <div class="popup_container box_style">
      <el-icon size="20" class="close_page" @click="handleClose">
        <CircleClose />
      </el-icon>
      <div class="heading">
        <h4>Plan your trip</h4>
      </div>
      <div class="location">
        <div class="location_of">
          <el-icon size="20"><Location /></el-icon>
          <b>From : </b>
        </div>
        <el-select
          v-model="fromCountry"
          class="location_input"
          placeholder="Select Country"
          @change="selectFromState"
        >
          <el-option
            class="location_input"
            v-for="item in countries"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-select v-model="fromState" class="m-2" placeholder="Select State">
          <el-option
            v-for="item in fromAllstates"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
      <div class="location">
        <div class="location_of">
          <el-icon size="20"><Location /></el-icon>
          <b>To : </b>
        </div>
        <el-select
          v-model="toCountry"
          class="location_input"
          placeholder="Select Country"
          @change="selectToState"
        >
          <el-option
            class="location_input"
            v-for="item in countries"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-select v-model="toState" class="m-2" placeholder="Select State">
          <el-option
            v-for="item in toAllstates"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
      <div class="location">
        <div class="location_of">
          <el-icon size="20"><Calendar /></el-icon>
          <b>From date : </b>
        </div>
        <el-date-picker
          v-model="fromDate"
          type="date"
          placeholder="select start date"
          format="YYYY/MM/DD"
          value-format="x"
        />
      </div>
      <div class="location">
        <div class="location_of">
          <el-icon size="20"><Calendar /></el-icon>
          <b>To date : </b>
        </div>
        <el-date-picker
          v-model="toDate"
          type="date"
          placeholder="select end date"
          format="YYYY/MM/DD"
          value-format="x"
        />
      </div>
      <div class="your_plan">
        <el-input
          v-model="tripDesc"
          type="textarea"
          show-word-limit
          maxlength="150"
          placeholder="select end date"
        />
      </div>
      <el-button type="success" class="submit_btn" round @click="submitDetails"
        >Submit</el-button
      >
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
      await axios
        .get("https://countriesnow.space/api/v0.1/countries/currency")
        .then((getData) => {
          countries.value = getData.data.data;
        });
    });
    let fromCountry = ref(null);
    let fromState = ref(null);
    let toCountry = ref(null);
    let toState = ref(null);
    let fromDate = ref(null);
    let toDate = ref(null);
    let tripDesc = ref(null);
    let countries = ref([]);
    let fromAllstates = ref([]);
    let toAllstates = ref([]);
    let description = ref(null);
    let updateref = doc(db, "plans", "sdclkmskcm");
    let selectFromState = async () => {
      fromState.value = "";
      let body = { country: fromCountry.value };
      let stateData = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        body
      );
      fromAllstates.value = stateData.data.data.states;
    };

    let selectToState = async () => {
      toState.value = "";
      let body = { country: toCountry.value };
      let stateData = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        body
      );
      toAllstates.value = stateData.data.data.states;
    };

    let submitDetails = async () => {
      let data = {
        description: description.value,
        toCountry: toCountry.value,
        toState: toState.value,
      };
      await setDoc(updateref, data, { merge: true });
      emit("closePlan");
    };
    let handleClose = () => {
      emit("closePlan");
    };
    // let see = () =>{
    //     let temp = new Date((toDate.value))
    //     console.log("Time: ", temp.getMonth());
    // }
    return {
      submitDetails,
      handleClose,
      fromCountry,
      fromState,
      toCountry,
      toState,
      fromDate,
      toDate,
      fromAllstates,
      tripDesc,
      countries,
      toAllstates,
      selectFromState,
      selectToState
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
  padding-top: 30px;
  width: 700px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  z-index: 60;
}

.close_page {
  /* float: right; */
  position: relative;
  top: -15px;
  left: 640px;
}

.submit_btn {
  float: right;
  margin-top: 20px;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  color: #666;
  height: 40px;
}
.location {
  display: flex;
  column-gap: 15px;
  margin: 20px;
}
.location_of {
  display: flex;
  align-items: center;
  width: 120px;
  column-gap: 5px;
}
</style>
