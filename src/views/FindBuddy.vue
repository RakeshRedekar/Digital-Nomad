<template>
    <div class="wall">
        <Filter @filterUsers="filterUsers" />
        <BuddyCard v-for="(item, index) in filteredUsers" :buddyDetails="item" :key="index" />
    </div>
</template>

<script>
import BuddyCard from "../components/BuddyCard.vue";
import Filter from "../components/Filter.vue";
import { ref } from "vue";
import { db } from "../main";
import { onMounted } from "vue";
import { getDocs, collection } from "@firebase/firestore";
export default {
    components: { BuddyCard, Filter },
    name: "find-buddy",
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

        let filterUsers = (userCountry, userState) => {
            console.log("running");
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

        return { users, filterUsers, filteredUsers };
    },
};
</script>

<style scoped>
.wall {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 0px;
}
</style>
