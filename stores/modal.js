import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    showModal: false,
    showWidget: false,
    isChatting: true,
    isSuggestion: true,
  }),
  actions: {
    toggleWidget() {
      this.showWidget = !this.showWidget;
      this.showModal = false;
    },

    closeWidget() {
      this.showWidget = false;
      this.isChatting = false;
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleSuggestion() {
      this.isSuggestion = false;
    },
    closeChatting() {
      this.isChatting = false;
    },
  },
});
