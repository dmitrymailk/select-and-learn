import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import { Storage } from "@capacitor/storage";
import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const app = createApp(App).use(IonicVue).use(router).use(store);

const checkAuth = async () => {
  const { value } = await Storage.get({ key: "access" });
  if (value) {
    console.log("VALUE commit", value);
    store.commit("AUTH_SUCCESS", value);
    router.push("/");
  }
};
const startApp = async () => {
  await checkAuth();
  const mountApp = async () => {
    router.isReady().then(async () => {
      app.mount("#app");
    });
  };
  await mountApp();
};

startApp();
