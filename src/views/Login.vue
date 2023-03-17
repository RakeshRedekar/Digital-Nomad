<template>
  <div class="formContainer">
    <div class="formWrapper">
      <span class="logo">Lama Chat</span>
      <span class="title">Login</span>
      <form>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button @click="handleSubmit">Sign in</button>
        <div>
          <el-icon :size="18" color="red"><Warning /></el-icon
          ><span v-if="err">Something went wrong</span>
        </div>
      </form>
      <p>
        You don't have an account?
        <span class="login_register"
          ><router-link to="/register">Register</router-link></span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../main";
import { useRouter } from "vue-router";
export default {
  name: "login",
  setup() {
    let err = ref(true);
    let email = ref("");
    let password = ref("");
    const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push("/");
      } catch (err) {
        err.value = true;
      }
    };
    return { err, handleSubmit };
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
.login_register {
  font-size: larger;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
}
</style>
