// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../main";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../main";
export const homeModule = {
  namespaced: true,
  state() {
    return {
      posts: null,
    };
  },
  mutations: {
    setPosts: (state, fetchedData) => {
      state.posts = fetchedData;
    },
    addPost: (state, data) => {
      state.posts.unshift(data);
    },
  },
  actions: {
    async getPosts({ commit }) {
      let data = await getDocs(collection(db, "posts"));
      let fetchedData = [];
      data.forEach((doc) => {
        fetchedData.push({ ...doc.data(), docID: doc.id });
      });
      commit("setPosts", fetchedData);
    },
  },
};
