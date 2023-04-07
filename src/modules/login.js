import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs , Timestamp, doc, setDoc,} from "firebase/firestore";
import { auth, db, storage } from "../main";
import { increment, deleteDoc } from "firebase/firestore";
import { ref as storageRef, getDownloadURL } from "@firebase/storage";
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
    setUser: (state, { id, likes, following, profilePic }) => {
      state.user = {
        email: id.email,
        displayName: id.displayName,
        userAccessToken: id.accessToken,
        userID: id.uid,
        profilePic : profilePic
      };
      if (likes) {
        state.likedPosts = likes;
      }
      if (following) {
        state.followingTo = following;
      }
    },
    handleFollowing: async (state, data) => {
      
      let numOfFollowersRef = doc(db, "users", data);
      const followRef = doc(
        db,
        "users",
        state.user.userID,
        "following",
        data
      );
      
        let followingTo = {
          uid: data,
          timestamp: Timestamp.now(),
        };
        await setDoc(followRef, followingTo, { merge: true });
        await setDoc(
          numOfFollowersRef,
          {
            numOfFollowers: increment(1),
          },
          { merge: true }
        );
      
      if (state.followingTo.indexOf(data) >= 0) {
        let followIndex = state.followingTo.indexOf(data);
        state.followingTo.splice(followIndex, 1);
      } else {
        state.followingTo.push(data);
      }
    },
    handleUnfollow : async (state, data) =>{
      const followRef = doc(
        db,
        "users",
        state.user.userID,
        "following",
        data
      );
      let numOfFollowersRef = doc(db, "users", data);

      await deleteDoc(followRef);
      await setDoc(
        numOfFollowersRef,
        {
          numOfFollowers: increment(-1),
        },
        { merge: true } 
      );
      if (state.followingTo.indexOf(data) >= 0) {
        let followIndex = state.followingTo.indexOf(data);
        state.followingTo.splice(followIndex, 1);
      } else {
        state.followingTo.push(data);
      }
    }
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
          console.log("User: ", user.user);
          let profilePic = await getDownloadURL(storageRef(storage, `profilePics/${user.user.uid}`))
          commit("setUser", {
            id: user.user,
            likes: likedPosts,
            following: following,
            profilePic:profilePic,
          });
        }
      );
    },
  },
};
