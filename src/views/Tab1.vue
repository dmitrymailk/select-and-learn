<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <h2>Content - {{ clipboardData }}</h2>
      <ion-button color="primary" @click="getClipboard">Paste</ion-button>
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
