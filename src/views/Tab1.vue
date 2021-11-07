<template lang="pug">
ion-page
  ion-header
    ion-toolbar
      ion-title Select and Learn! 
  ion-content(:fullscreen="true")
    ion-header(collapse="condense")
      ion-toolbar
        ion-title Select and Learn! 
      

    .add-text.px-2.mt-2(v-if="textTokens.length")
      ion-button(color="primary", @click="getSelectedText") Paste
      h4
        |Your selected text:
      p.add-text__text
        span.add-text__text-token(
          v-for="item in textTokens"
          @click="addToken(item)"
          )
          |{{item}} 
      .add-text__title.font-weight-bold(v-if="getSelectedTokens.length")
        |Your selected words:
      .add-text__text(v-if="getSelectedTokens.length")
        span.add-text__text-token(
          v-for="item in getSelectedTokens"
          @click="deleteToken(item)")
          |{{item}},
      .server-button.mt-3(v-if="getSelectedTokens.length")
        ion-button(color="primary").mr-3(@click="sendToServer" ) 
          |Send to server
        .spinner-border.text-dark.spinner-button(role="status" v-if="sendStatus == 1")
        span.badge.badge-success(role="status" v-else-if="sendStatus == 2") Ok
        span.badge.badge-danger(role="status" v-else-if="sendStatus == 3") Error
    .info-block.h3(v-else)
      |You have not selected any text


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
import { apiServer } from "../utils/api";

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
      originalText: "",
      textTokens: [],
      selectedTokens: new Set([]),
      getSelectedTokens: [],
      sendStatus: 0,
      wordsStatus: 0,
    };
  },
  async mounted() {
    await this.getSelectedText();
  },
  methods: {
    addToken(token) {
      token = token.toLowerCase();
      this.selectedTokens.add(token);
      this.getSelectedTokens = [...this.selectedTokens];
    },
    deleteToken(token) {
      token = token.toLowerCase();
      this.selectedTokens.delete(token);
      this.getSelectedTokens = [...this.selectedTokens];
    },
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
    async getSelectedText() {
      await this.getClipboard();
      let selectedText = await Storage.get({ key: "selectedSentence" });
      selectedText = selectedText.value;

      if (selectedText) {
        this.originalText = selectedText;
        this.textTokens = this.processTokens(selectedText.split(" "));
      }
    },
    processTokens(tokens) {
      let processTokens = [];
      tokens.forEach((element) => {
        element = element.replace(/[^A-Za-z0-9-]/g, "");
        processTokens.push(element);
      });
      return processTokens;
    },
    sendToServer() {
      console.log("SEND TO SERVER", this.originalText, [...this.selectedTokens]);
      const newWords = {
        sentence: this.originalText,
        words: [...this.selectedTokens],
      };
      this.sendStatus = 1;
      apiServer({
        url: "select-learn/add-words/",
        data: newWords,
        method: "POST",
      })
        .then((res) => {
          console.log("OK", res);
          this.sendStatus = 2;
          // chrome.storage.local.set({ selectedText: "" });
          Storage.remove({ key: "selectedText" });
        })
        .catch((rej) => {
          console.log("ERROR", rej);
          if (401 === rej.response.status) {
            this.$store.dispatch("AUTH_LOGOUT");
            this.$router.push("/");
          }
          this.sendStatus = 3;
        });
    },
  },
};
</script>
<style lang="sass">
.add-text
  max-width: 600px
  &__text
    font-size: 16px
    &-token
      display: inline-flex
      align-items: center
      justify-content: center
      margin: 2px
      margin-right: 2px
      &:hover
        background: rgba(0, 0, 0, 0.1)
        cursor: pointer
        border-radius: 4px

.server-button
  margin-bottom: 200px

.spinner-button
  height: 20px
  width: 20px

.info-block
  display: flex
  justify-self: center
  align-self: center
  margin-top: 120px
</style>
