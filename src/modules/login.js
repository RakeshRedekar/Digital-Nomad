import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../main";
export const loginModule = {
  namespaced: true,
  state() {
    return {
      user: null,
      likedPosts: [],
      followingTo: [],
    };
  },
  mutations: {
    setUser: (state, { id, likes, following }) => {
      state.user = {
        email: id.email,
        displayName: id.displayName,
        userAccessToken: id.accessToken,
        userID: id.uid,
      };
      if (likes) {
        state.likedPosts = likes;
      }
      if (following) {
        state.followingTo = following;
      }
    },
    handleFollowing: (state, data) => {
      if (state.followingTo.indexOf(data) >= 0) {
        let followIndex = state.followingTo.indexOf(data);
        state.followingTo.splice(followIndex, 1);
      } else {
        state.followingTo.push(data);
      }
    },
  },
  getters: {
    isFollowing: (state) => (id) => {
      if (state.followingTo.indexOf(id) >= 0) {
        return true;
      } else {
        return false;
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
          //fetching liked posts
          const likedRef = await getDocs(
            collection(db, "users", user.user.uid, "likes")
          );
          let likedPosts = [];
          likedRef.forEach((doc) => {
            likedPosts.push(doc.id);
          });
          //fetching following channels
          const followingRef = await getDocs(
            collection(db, "users", user.user.uid, "following")
          );
          let following = [];
          followingRef.forEach((doc) => {
            following.push(doc.id);
          });
          commit("setUser", {
            id: user.user,
            likes: likedPosts,
            following: following,
          });
        }
      );
    },
  },
};
