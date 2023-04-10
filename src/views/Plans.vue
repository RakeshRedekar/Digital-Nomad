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
    let filterTravel = (userCountry, userState) => {
      if (userState) {
        filteredPlans.value = users.value.filter((user) => {
          return user.country == userCountry && user.state == userState;
        });
      } else {
        filteredPlans.value = users.value.filter((user) => {
          return user.country == userCountry;
        });
      }
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
