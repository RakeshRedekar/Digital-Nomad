<template>
  <div class="filter main_containt box_style">
    <div class="heading">
      <h4>Filters</h4>
    </div>
    <div class="location">
      <el-icon size="25"><Location /></el-icon>
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
        @change="stateChanged"
      >
        <el-option
          v-for="item in states"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  name: "filter",
  setup(prop, { emit }) {
    onMounted(() => {
      axios
        .get("https://countriesnow.space/api/v0.1/countries/currency")
        .then((getData) => {
          countries.value = getData.data.data;
        });
    });
    let selectedCountry = ref(null);
    let selectedState = ref(null);
    let countries = ref([]);
    let states = ref([]);

    let selectState = async () => {
      emit("filterUsers", selectedCountry.value, null);
      selectedState.value = "";
      let body = { country: selectedCountry.value };
      let stateData = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        body
      );
      states.value = stateData.data.data.states;
    };

    let stateChanged = () => {
      emit("filterUsers", selectedCountry.value, selectedState.value);
    };
    return {
      selectState,
      selectedCountry,
      selectedState,
      countries,
      states,
      stateChanged,
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
  column-gap: 20px;
  margin: 20px;
}
</style>
