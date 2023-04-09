<template>
    <div class="find_buddy">
        <TravelFilter @filterTravel="filterTravel" @openPlan="isAddPlan=true"/>
        <TravelCard v-for="(item, index) in filteredUsers" :buddyDetails="item" :key="index" />
        <AddPlan v-if="isAddPlan" @closePlan="()=>isAddPlan=false"/>
    </div>
</template>

<script>
import TravelCard from "../components/TravelCard.vue";
import TravelFilter from "../components/TravelFilter.vue";
import AddPlan from "../components/AddPlan.vue";
import { ref } from "vue";
import { db } from "../main";
import { onMounted } from "vue";
import { getDocs, collection } from "@firebase/firestore";
export default {
    components: { TravelCard, TravelFilter, AddPlan },
    name: "plans",
    
    setup() {
        onMounted(async () => {
            let data = await getDocs(collection(db, "users"));
            let fetchedData = [];
            data.forEach((doc) => {
                fetchedData.push({ ...doc.data() });
            });
            users.value = fetchedData;
            filteredUsers.value = fetchedData;
        });

        let users = ref([]);
        let filteredUsers = ref([]);
        let isAddPlan = ref(true)
        let filterTravel = (userCountry, userState) => {
            if (userState) {
                filteredUsers.value = users.value.filter((user) => {
                    return user.country == userCountry && user.state == userState;
                });
            } else {
                filteredUsers.value = users.value.filter((user) => {
                    return user.country == userCountry;
                });
            }
        };

        return { users, filterTravel, filteredUsers ,isAddPlan};
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
