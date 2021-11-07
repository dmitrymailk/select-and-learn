<template>
  <ion-app>
    <ion-tabs>
      <ion-router-outlet />
    </ion-tabs>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonTabs } from "@ionic/vue";
import { defineComponent } from "vue";

// import store from "./store/index";
import "./assets/style/bootstrap.min.css";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonTabs,
  },
});
</script>
