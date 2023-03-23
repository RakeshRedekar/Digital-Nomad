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
        uID: id.accessToken,
      };
    },
  },
  actions: {
    login({ commit }, data) {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        (user) => {
          commit("setUser", user.user);
        }
      );
    },
  },
};
