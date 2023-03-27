import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../main";
export const loginModule = {
  namespaced: true,
  state() {
    return {
      user: null,
      likedPosts: [],
    };
  },
  mutations: {
    setUser: (state, { id, likes }) => {
      state.user = {
        email: id.email,
        displayName: id.displayName,
        userAccessToken: id.accessToken,
        userID: id.uid,
      };
      if (likes) {
        state.likedPosts = likes;
      }
    },
  },
  actions: {
    login({ commit }, data) {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        async (user) => {
          localStorage.setItem(
            "userToken",
            JSON.stringify(user.user.accessToken)
          );
          const docRef = await getDocs(
            collection(db, "users", user.user.uid, "likes")
          );
          let likedPosts = [];
          docRef.forEach((doc) => {
            likedPosts.push(doc.id);
          });
          commit("setUser", { id: user.user, likes: likedPosts });
        }
      );
    },
  },
};
