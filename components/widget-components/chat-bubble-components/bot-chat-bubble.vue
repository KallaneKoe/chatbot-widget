<template class="relative">
  <span class="mt-2">
    <img
      src="assets/images/avatar.png"
      class="h-6 w-6 inline-block mb-2 mr-1"
    />
    <p class="text-md inline-block mb-2 ml-1">Chatbot</p>
  </span>

  <div
    class="bg-white p-2 rounded-tl-sm rounded-r-lg rounded-b-lg text-md mt-2"
    v-for="(item, index) in props.message"
    v-if="Array.isArray(props.message)"
  >
    <p>{{ item }}</p>
  </div>
  <div
    class="bg-white p-2 rounded-tl-sm rounded-r-lg rounded-b-lg text-md mt-2"
    v-if="Array.isArray(props.message)"
    v-for="(item, index) in props.urls"
  >
    <a :href="item" target="_blank" class="underline">{{ item }}</a>
  </div>
  <div
    class="bg-white p-2 rounded-tl-sm rounded-r-lg rounded-b-lg text-md mt-2"
    v-for="(item, index) in props.images"
    v-if="Array.isArray(props.images)"
  >
    <p>{{ item }}</p>
  </div>
  <div
    class="bg-white p-2 rounded-tl-sm rounded-r-lg rounded-b-lg text-md mt-2"
    v-for="(item, index) in props.videos"
    v-if="Array.isArray(props.videos)"
  >
    <p>{{ item }}</p>
  </div>

  <span class="flex flex-row justify-between flex-wrap">
    <p
      class="text-[12px] mt-1 mb-2 text-gray-400"
      v-if="props.timeStamp !== 'NaN ngày trước'"
    >
      {{ props.timeStamp }}
    </p>
    <div
      v-if="
        props.flag &&
        modalStore.isChatting &&
        props.timeStamp !== 'NaN ngày trước'
      "
    >
      <button class="mr-1 cursor-pointer" @click="Like()">
        <i v-if="!reviewStateLike" class="fa-regular fa-thumbs-up text-md"></i>
        <i
          v-if="reviewStateLike"
          class="fa-solid fa-thumbs-up text-md text-orange-500"
        ></i>
      </button>
      <button class="ml-1 cursor-pointer" @click="Dislike()">
        <i
          v-if="!reviewStateDislike"
          class="fa-regular fa-thumbs-down text-md fa-flip-horizontal"
        ></i>
        <i
          v-if="reviewStateDislike"
          class="fa-solid fa-thumbs-down text-md fa-flip-horizontal text-orange-500"
        ></i>
      </button>
      <div
        class="absolute bottom-[40px] left-[25%] right-[25%] bg-[#4caf50] p-4 rounded-lg text-white zIndex"
        v-if="snackBarStore.snackBarVisible"
        id="snackbar"
        :class="snackBarStore.snackBarClass"
      >
        <p>{{ snackBarStore.message }}</p>
      </div>
    </div>
  </span>
  <div
    v-show="modalStore.showModal"
    class="z-50 bg-black rounded-lg w-[100%] h-[100%] p-2 bg-opacity-60 flex absolute items-center justify-center top-0 left-0"
  >
    <div class="bg-white rounded-lg p-4">
      <h1 class="text-bold text-2xl text-center">
        Câu trả lời chưa tốt với bạn?
      </h1>

      <textarea
        name="message"
        rows="10"
        cols="30"
        class="rounded-lg shadow-dm w-full p-4 border-2 border-gray-200 my-2 focus:outline-none"
        placeholder="Bạn hãy cho biết lý do câu trả lời chưa tốt và nên được cải thiện như thế nào?"
        v-model="inputValue"
      ></textarea>
      <div class="flex justify-between">
        <button
          class="p-4 border-orange-500 border-2 text-orange-500 w-[120px] rounded-md hover:text-white hover:bg-orange-500"
          @click="modalStore.toggleModal"
        >
          Đóng
        </button>

        <button
          class="p-4 border-2 border-gray-300 text-gray-400 bg-gray-300 w-[120px] rounded-md"
          v-if="inputValue === ''"
        >
          Gửi yêu cầu
        </button>
        <button
          class="p-4 border-2 border-orange-500 text-white bg-orange-500 w-[120px] rounded-md hover:text-orange-500 hover:bg-white"
          v-if="inputValue !== ''"
          @click="
            () => {
              modalStore.toggleModal();
              messageStore.messageEvaluate(
                false,
                inputValue,
                props.chatID,
                props.userID
              );
              snackBarStore.showSnackbar();
            }
          "
        >
          Gửi yêu cầu
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from "vue";

import MovieList from "./movie-list.vue";
import RecommendList from "./recommend-list.vue";
import { useModalStore } from "~/stores/modal";
import {useSnackBarStore} from "~/stores/snackbar"
import { useMessage } from "~/stores/messages";
import { useFormatDateTime } from "../../../composables/useFormatDateTime";

defineOptions({
  inheritAttrs: false
});

const props = defineProps({
  message: Array,
  timeStamp:String,
  chatID:String,
  userID:String,
  flag: Boolean,
  videos:Array,
  images:Array,
  contents:Array,  urls:Array
});


const {timeAgo} = useFormatDateTime()
const modalStore = useModalStore();
const snackBarStore = useSnackBarStore();
const messageStore = useMessage();
const inputValue = ref("")


let reviewStateLike = ref(false);
let reviewStateDislike = ref(false);


function Like() {
  reviewStateLike.value = !reviewStateLike.value;
  reviewStateDislike.value = false;
  if(reviewStateLike.value){
    snackBarStore.showSnackbar()
  }
  messageStore.messageEvaluate(true, "", props.chatID,props.userID )

}
function Dislike() {
  reviewStateDislike.value = !reviewStateDislike.value;
  reviewStateLike.value = false;
  if(reviewStateDislike.value){
    modalStore.toggleModal();
  }

}
</script>

<style>
.zIndex {
  z-index: 1000;
}
</style>
