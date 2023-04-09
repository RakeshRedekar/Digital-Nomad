import { createRouter, createWebHistory } from "vue-router";
import Feed from "../components/Feed.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "",
    name: "Wall",
    component: () => import("@/views/Wall.vue"),
    // meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        name: "feed",
        component: Feed,
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/components/Profile.vue"),
        // children: [
        //   {
        //     path: "",
        //     name: "overview",
        //     component: () => import("@/components/ProfileOverview.vue"),
        //   },
        //   {
        //     path: "posts",
        //     name: "posts",
        //     component: () => import("@/components/ProfilePosts.vue"),
        //   },
        // ],
      },
      {
        path: "/findbuddy",
        name: "find_buddy",
        component: () => import("@/views/FindBuddy.vue"),
      },
      {
        path: "/plans",
        name: "plans",
        component: () => import("@/views/Plans.vue"),
      },
      {
        path: "/users",
        name: "user",
        component: () => import("@/components/Profile.vue"),
      },
    ],
    
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/register"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("userToken");
//   if (authRequired && !loggedIn) {
//     next("/login");
//   } else {
//     next();
//   }
// });
export default router;
