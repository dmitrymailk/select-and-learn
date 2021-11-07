import { createRouter, createWebHistory } from "@ionic/vue-router";
import Tabs from "../views/Tabs.vue";
import Authorization from "../Authorization/Authorization.vue";

const routes = [
  {
    path: "/",
    component: Tabs,
  },
  {
    path: "/login",
    component: Authorization,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

import store from "../store/index";

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  store.commit("UPDATE_LINK", from.fullPath);
  const publicPages = ["/login"];
  const isPrivatePage = !publicPages.includes(to.path);
  console.log("isPrivatePage", isPrivatePage);
  if (isPrivatePage) {
    if (store.getters.isAuthenticated) {
      // set link for next usage
      next();
      return;
    }
    next("/login");
    store.commit("AUTH_ERROR");
  } else {
    next();
  }
});

export default router;
