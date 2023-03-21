<template>
  <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Lama Chat</span>
      <span className="title">Register</span>
      <form @submit="handleSubmit">
        <input required type="text" placeholder="display name" />
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../main";
import { onMounted, ref } from "vue";
export default {
  name: "register",
  setup() {
    let email = ref("");
    let password = ref("");
    onMounted(() => {});
    const handleSubmit = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email.value, password.value).then(
        (signUp) => {
          console.log("signup: ", signUp);
        }
      );
    };

    return { email, password, handleSubmit };
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
