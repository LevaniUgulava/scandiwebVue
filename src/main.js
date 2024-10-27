import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const api = axios.create({
  baseURL: "https://scandiweb12.000.pe", // Your backend URL
  withCredentials: true, // Important for including cookies or credentials
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

app.config.globalProperties.$api = api;

createApp(App).use(router).mount("#app");
