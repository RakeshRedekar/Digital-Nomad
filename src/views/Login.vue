<template>
  <div class="formContainer">
    <div class="formWrapper">
      <span class="logo">Lama Chat</span>
      <span class="title">Login</span>
      <form>
        <input v-model="email" type="email" placeholder="email" />
        <input v-model="password" type="password" placeholder="password" />
        <button @click="handleSubmit">Sign in</button>
        <div v-if="err">
          <el-icon :size="18" color="red"><Warning /></el-icon
          ><span>Something went wrong</span>
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
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../main";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "login",
  setup() {
    let err = ref(false);
    let email = ref("");
    let password = ref("");
    let store = useStore();
    const router = useRouter();
    const handleSubmit = (e) => {
      e.preventDefault();
      store
        .dispatch("loginModule/login", {
          email: email.value,
          password: password.value,
        })
        .then(() => {
          
          router.push("/home")})
        .catch((err) => console.log(err));
    };

    return { err, handleSubmit, email, password };
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
