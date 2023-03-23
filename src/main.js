import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.scss";
import { store } from "./store";

let app = createApp(App);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc9McJW0KemV0ZXC9TrccfAjJGi6LA3Lg",
  authDomain: "digitalnomad-4956f.firebaseapp.com",
  projectId: "digitalnomad-4956f",
  storageBucket: "digitalnomad-4956f.appspot.com",
  messagingSenderId: "364622158823",
  appId: "1:364622158823:web:2f5516c75732b2970f7b42",
};

// Initialize Firebase
const firebaseAuth = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseAuth);
export const storage = getStorage();
export const db = getFirestore();

app.use(router);
app.use(store);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
