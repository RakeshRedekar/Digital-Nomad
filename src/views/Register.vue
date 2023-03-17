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
        <span>Something went wrong</span>
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      console.log("auth", auth);
    };

    return { email, password, handleSubmit };
  },
};
</script>
<style scoped>
.register {
  font-size: larger;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
}
</style>
