import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../main";
export const loginModule = {
  namespaced: true,
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser: (state, id) => {
      state.user = {
        email: id.email,
        displayName: id.displayName,
        userAccessToken: id.accessToken,
        userID: id.uid,
      };
    },
  },
  actions: {
    login({ commit }, data) {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (user) => {

          localStorage.setItem(
            "userToken",
            JSON.stringify(user.user.accessToken)
          );
          commit("setUser", user.user);
        }
      );
    },
  },
};
