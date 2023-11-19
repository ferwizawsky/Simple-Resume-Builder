import { createRouter, createWebHistory } from "vue-router";
import { useOption } from "@/stores/option";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      public: true,
    },
    component: () => import("@/pages/Index.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    meta: {
      public: true,
    },
    redirect: "/admin/dashboard",
    component: () => import("@/pages/admin/Main.vue"),
    children: [
      {
        path: "dashboard",
        name: "Admin Dashboard",
        component: () => import("@/pages/admin/Dashboard.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name + " | " + useOption().name;
  const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role_id");

  // if (to.name == "Login" && token) {
  //   if (role == "2") next("/dash");
  //   else next("/");
  // }
  //   if (to.name != "Login" && !token) next("/login");
  //   else next();
  console.log(to);
  next();
});

export default router;
