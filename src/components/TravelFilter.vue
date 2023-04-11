<template>
  <div class="filter main_containt box_style">
    <div class="heading">
      <h4>Search travel plans</h4>
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
        @change="fromCountrySelected"
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
        v-model="fromStateSelected"
        class="m-2"
        placeholder="Select State"
        @change="stateChanged"
      >
        <el-option
          v-for="item in fromStates"
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
        @change="toCountrySelected"
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
        v-model="toState"
        class="m-2"
        placeholder="Select State"
        @change="stateChanged"
      >
        <el-option
          v-for="item in toStates"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </div>
    <div class="location">
      <div class="location_of">
        <el-icon size="20"><Calendar /></el-icon>
        <b>Date : </b>
      </div>
      <el-date-picker
        v-model="planDate"
        type="month"
        placeholder="month"
        format="MMMM,YYYY"
        value-format="YYYY-MM-DD"
        @change="stateChanged"
      />
    </div>
    <div class="your_plan" @click="handleOpenPlan">
      <el-icon><Plus /></el-icon>
      <p>Add your travel plan</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "travel-filter",

  setup(prop, { emit }) {
    onMounted(() => {
      axios
        .get("https://countriesnow.space/api/v0.1/countries/currency")
        .then((getData) => {
          countries.value = getData.data.data;
        });
    });
    let fromCountry = ref(null);
    let fromState = ref(null);
    let toCountry = ref(null);
    let toState = ref(null);
    let countries = ref([]);
    let fromStates = ref([]);
    let toStates = ref([]);
    const planDate = ref(null);
    let fromCountrySelected = async () => {
      fromState.value = null;
      emit(
        "filterTravel",
        fromCountry.value,
        fromState.value,
        toCountry.value,
        toState.value,
        planDate.value
      );
      let body = { country: fromCountry.value };
      let stateData = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        body
      );
      fromStates.value = stateData.data.data.states;
    };
    let toCountrySelected = async () => {
      toState.value = null;
      emit(
        "filterTravel",
        fromCountry.value,
        fromState.value,
        toCountry.value,
        toState.value,
        planDate.value
      );
      let body = { country: toCountry.value };
      let stateData = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        body
      );
      toStates.value = stateData.data.data.states;
    };

    let stateChanged = () => {
      emit(
        "filterTravel",
        fromCountry.value,
        fromState.value,
        toCountry.value,
        toState.value,
        planDate.value
      );
    };
    let handleOpenPlan = () => {
      emit("openPlan");
    };
    return {
      fromCountrySelected,
      toCountrySelected,
      fromCountry,
      fromState,
      countries,
      fromStates,
      toStates,
      stateChanged,
      toCountry,
      toState,
      planDate,
      handleOpenPlan,
    };
  },
};
</script>

<style scoped>
.filter {
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0px;
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
  width: 80px;
  column-gap: 5px;
}
.your_plan {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: green;
  column-gap: 5px;
  cursor: pointer;
}
.your_plan:hover {
  text-decoration: underline;
}
</style>
