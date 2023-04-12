<template>
    <div>
      <TravelCard
        v-for="(plan, index) in profilePlans"
        :planDetails="plan"
        :key="index"
      />
    </div>
  </template>
  
  <script>
  import TravelCard from "./TravelCard.vue";
  import { computed } from "vue";
  import { useStore } from "vuex";

  export default {

    components: { TravelCard },
    props: ["profileID"],
    name: "profile-plans",
    setup(props) {
        
      let store = useStore();
      
      let profilePlans = computed(() =>
        store.state.plansModule.plans.filter(
          (ele) => ele.userID === props.profileID
        )
      );
      return { store,  profilePlans };
    },
  };
  </script>
  
  <style scoped></style>
  