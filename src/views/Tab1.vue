<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Select and Learn! (extension)</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Select and Learn! (extension)</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-button color="primary" @click="getClipboard">Paste</ion-button>
      <!-- <ion-button color="primary" @click="clearStorage">Clear Storage</ion-button> -->
      <p>Content - {{ clipboardData }}</p>
    </ion-content>
  </ion-page>
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
import { Clipboard } from "@capacitor/clipboard";
import { Storage } from "@capacitor/storage";

export default {
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  },
  data() {
    return {
      clipboardData: "",
    };
  },
  async mounted() {
    const { value } = await Storage.get({ key: "selectedSentence" });
    this.clipboardData = value;
  },
  methods: {
    async getClipboard() {
      const clip = await Clipboard.read();
      const setName = async () => {
        await Storage.set({
          key: "selectedSentence",
          value: clip.value,
        });
      };
      await setName();
      this.clipboardData = clip.value;
    },
  },
};
</script>
