<template>
  <div class="find_buddy">
    <TravelFilter @filterTravel="filterTravel" @openPlan="isAddPlan = true" />
    <TravelCard
      v-for="(item, index) in filteredPlans"
      :planDetails="item"
      :key="index"
    />
    <AddPlan v-if="isAddPlan" @closePlan="() => (isAddPlan = false)" />
  </div>
</template>

<script>
import TravelCard from "../components/TravelCard.vue";
import TravelFilter from "../components/TravelFilter.vue";
import AddPlan from "../components/AddPlan.vue";
import { ref, computed } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  components: { TravelCard, TravelFilter, AddPlan },
  name: "plans",

  setup() {
    onMounted(async () => {
      await store.dispatch("plansModule/getPlans");
      filteredPlans.value = store.state.plansModule.plans;
    });

    let store = useStore();
    let plans = computed(() => store.state.plansModule.plans);
    let users = ref([]);
    let filteredPlans = ref([]);
    let isAddPlan = ref(false);
    let filterTravel = (
      fromCountry,
      fromState,
      toCountry,
      toState,
      planDate
    ) => {
      let a = fromCountry ? fromCountry : "";
      let b = fromState ? fromState : "";
      let c = toCountry ? toCountry : "";
      let d = toState ? toState : "";

      if (planDate) {
        let plannedDateObj = new Date(planDate);
        let filterMonth = plannedDateObj.getMonth()+1;
        let filterYear = plannedDateObj.getFullYear();
        filteredPlans.value = plans.value.filter(
        (plan) =>
        {
          let dateObj = new Date(plan.toDate)
          let planMonth =  dateObj.getMonth()
          let planYear =  dateObj.getFullYear()
         return plan.fromCountry.includes(a) &&
          plan.toCountry.includes(c) &&
          plan.fromState.includes(b) &&
          plan.toState.includes(d) && planMonth==filterMonth && planYear == filterYear
        }
      );
      }
      else{
        filteredPlans.value = plans.value.filter(
        (plan) =>
        
          plan.fromCountry.includes(a) &&
          plan.toCountry.includes(c) &&
          plan.fromState.includes(b) &&
          plan.toState.includes(d)
        
      );
      }
      // if (userState) {
      //   filteredPlans.value = users.value.filter((user) => {
      //     return user.country == userCountry && user.state == userState;
      //   });
      // } else {
      //   filteredPlans.value = users.value.filter((user) => {
      //     return user.country == userCountry;
      //   });
      // }
    };

    return { users, filterTravel, filteredPlans, isAddPlan, plans };
  },
};
</script>

<style scoped>
.find_buddy {
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center;
    flex-direction: column; */
  padding: 0px 0px;
}
</style>
