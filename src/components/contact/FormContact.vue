<template>
  <div class="contact-form">
    <form
      @submit.prevent="submitForm"
      class="flex flex-col gap-4"
      id="contact-form"
    >
      <div class="flex flex-col sm:flex-row sm:gap-4">
        <div class="flex flex-col flex-1">
          <label for="firstname" class="text-sm font-medium mb-2">{{
            t("contact.first-name")
          }}</label>
          <input
            type="text"
            id="firstname"
            v-model="formData.firstname"
            class="border-b border-black py-2 focus:border-primary focus:outline-none"
            placeholder="John"
            required
          />
        </div>
        <div class="flex flex-col flex-1">
          <label for="name" class="text-sm font-medium mb-2">{{
            t("contact.last-name")
          }}</label>
          <input
            type="text"
            id="name"
            v-model="formData.lastname"
            class="border-b border-black py-2 focus:border-primary focus:outline-none"
            placeholder="Doe"
            required
          />
        </div>
      </div>
      <div class="flex flex-col">
        <label for="mail" class="text-sm font-medium mb-2">{{
          t("contact.email")
        }}</label>
        <input
          @keyup="wakeUp()"
          type="email"
          id="mail"
          v-model="formData.email"
          class="border-b border-black py-2 focus:border-primary focus:outline-none"
          placeholder="john.doe@example.com"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="message" class="text-sm font-medium mb-2">{{
          t("contact.message")
        }}</label>
        <textarea
          id="message"
          v-model="formData.message"
          class="border-b border-black py-2 focus:border-primary focus:outline-none"
          placeholder="Lorem ipsum ..."
          rows="4"
          required
        ></textarea>
      </div>
      <div class="flex items-center justify-end my-4">
        <input
          type="checkbox"
          id="rgpd"
          v-model="formData.rgpd"
          class="mr-2"
          required
        />
        <label for="rgpd" class="mb-0 text-sm font-medium">{{
          t("contact.rgpd")
        }}</label>
      </div>
      <div class="flex justify-end items-center ">
        <div v-if="isWakingUp" class="w-10 h-10 mr-4 relative group">
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {{ t("contact.server-waiting") }}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#D3ACFF"></stop><stop offset=".3" stop-color="#D3ACFF" stop-opacity=".9"></stop><stop offset=".6" stop-color="#D3ACFF" stop-opacity=".6"></stop><stop offset=".8" stop-color="#D3ACFF" stop-opacity=".3"></stop><stop offset="1" stop-color="#D3ACFF" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#D3ACFF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
        </div>
        <div v-if="isSuccess" class="h-5 w-5 bg-lime-600 mr-4 rounded-xl relative group">
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {{ t("contact.server-ready") }}
          </div>
        </div>
        <div v-if="!isSuccess && !isWakingUp && isAttempted" class="h-5 w-5 bg-red-600 mr-4 rounded-xl relative group">
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {{ t("contact.server-ko") }}
          </div>
        </div>
        <button
          type="submit"
          :disabled="!isSuccess"
          class="btn cursor-pointer text-sm secondary rounded-2xl flex border-2 border-[#AEB4BD] items-center bg-[#0E161B] py-2 px-12 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ t("contact.send") }}
        </button>
      </div>
      <div>
        <Altcha v-model:payload="altchaPayload" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Altcha from "./Altcha.vue";

interface Translation {
  [key: string]: string;
}

const isAttempted = ref(false);
const isSuccess = ref(false);
const isWakingUp = ref(false);

const props = defineProps<{
  translations: Translation;
}>();

const altchaPayload = ref("");

const formData = ref({
  firstname: "",
  lastname: "",
  email: "",
  message: "",
  rgpd: false,
  altcha: "",
});

const t = (key: string) => {
  return props.translations[key] || key;
};

function wakeUp() {
  if (isAttempted.value || isSuccess.value) {
    return;
  }
  isWakingUp.value = true;
  isAttempted.value = true;
  fetch("https://contact.jonathanmourier.fr").then((response) => {
    isWakingUp.value = false;
    console.log(response);
    if (response.ok) {
      isSuccess.value = true;
    } else {
      isSuccess.value = false;
    }
  });
}

function submitForm() {
 
  formData.value.altcha = altchaPayload.value;

  console.log("Form submitted:", formData.value);

  fetch("https://contact.jonathanmourier.fr", {
    method: "POST",
    body: JSON.stringify(formData.value),
  })
    .then((response) => {
      if (response.ok) {
        alert("Form submitted successfully!");
        isAttempted.value = false;
        isSuccess.value = false;
      } else {
        alert("Failed to submit the form.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    });
}
</script>

<style scoped>
.contact-form {
  width: 100%;
  margin: 0 auto;
}
</style>
