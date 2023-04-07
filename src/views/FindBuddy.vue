<template>
    <div class="wall">
      
      <Filter />
      <BuddyCard v-for="(item,index) in users" :buddyDetails="item" :key="index"/>
    </div>
  </template>
  
  <script>
import BuddyCard from '../components/BuddyCard.vue'
import Filter from '../components/Filter.vue'
import { ref } from 'vue';
import { db } from '../main';
import { onMounted } from 'vue';
import { getDocs, collection } from '@firebase/firestore';
  export default {
components: {BuddyCard , Filter },
  name: "find-buddy",
  setup() {
    onMounted(async()=>{
        let data = await getDocs(collection(db, "users"));
      let fetchedData = [];
      data.forEach((doc) => {
        fetchedData.push({...doc.data()});
      });
      users.value = fetchedData;
      console.log("All Users: ", users.value);
    })
    let users = ref([])

   

    return {  users };
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
  