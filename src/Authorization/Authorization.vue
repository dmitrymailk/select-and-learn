<template lang="pug">
ion-page
  ion-header
    ion-toolbar
      ion-title Select and Learn! (extension)
  ion-content(:fullscreen="true")
    .authorization.px-3.mt-5
      .btn.btn-secondary(@click="switchType")
        |Switch
      LoginForm(v-if="type == 'Login'")
      RegisterForm(v-else)
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default {
  data() {
    return {
      type: "Login",
    };
  },
  methods: {
    switchType() {
      if (this.type == "Login") this.type = "Register";
      else this.type = "Login";
    },
  },
  computed: {
    switchedType: function () {
      let type = "";
      if (this.type == "Login") type = "Register";
      else type = "Login";
      return type;
    },
  },
  components: {
    LoginForm,
    RegisterForm,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  },
};
</script>
