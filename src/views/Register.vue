<template>
  <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Lama Chat</span>
      <span className="title">Register</span>
      <form @submit="handleSubmit">
        <input
          required
          v-model="displayName"
          type="text"
          placeholder="display name"
        />
        <input v-model="email" required type="email" placeholder="email" />
        <input
          v-model="password"
          required
          type="password"
          placeholder="password"
        />
        <!-- <input required style={{ display: "none" }} type="file" id="file" /> -->
        <!-- <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add an avatar</span>
        </label> -->
        <button>Sign up</button>
        <div v-if="err">
          <el-icon :size="18" color="red"><Warning /></el-icon
          ><span>Something went wrong</span>
        </div>
      </form>
      <p>
        You do have an account?<span class="register"
          ><router-link to="/login">Login</router-link></span
        >
      </p>
    </div>
  </div>
</template>
<script>
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../main";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
// import { ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
export default {
  name: "register",
  setup() {
    let email = ref("");
    let displayName = ref("");
    let password = ref("");
    const router = useRouter();
    onMounted(() => {});
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let registerRef = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        await updateProfile(auth.currentUser, {
          displayName: displayName.value,
        });
        await setDoc(doc(db, "users", registerRef.user.uid), {
          displayName: displayName.value,
          uid: registerRef.user.uid,
          email: email.value,
          numOfFollowers: 0,
        });
        router.push("/login");
      } catch (err) {
        console.log(err);
      }
    };

    return { email, password, handleSubmit, displayName };
  },
};
</script>
<style scoped lang="scss">
.title {
  font-weight: bold;
}
form > div > span {
  color: red;
  font-size: 16px;
}
form > div {
  display: flex;
  align-items: center;
  width: 175px;
  justify-content: space-between;
}
.register {
  font-size: larger;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
}
</style>
