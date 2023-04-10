// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../main";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../main";
export const plansModule = {
  namespaced: true,
  state() {
    return {
      plans: null,
    };
  },
  mutations: {
    setPlans: (state, fetchedData) => {
      state.plans = fetchedData;
    },
    addPlans: (state, data) => {
      state.plans.unshift(data);
    },
  },
  actions: {
    async getPlans({ commit }) {
      let data = await getDocs(collection(db, "plans"));
      let fetchedData = [];
      data.forEach((doc) => {
        fetchedData.push({ ...doc.data(), docID: doc.id });
      });
      commit("setPlans", fetchedData);
    },
  },
};
