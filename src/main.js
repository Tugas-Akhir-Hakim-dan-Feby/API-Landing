import "./style.css";

import { createApp } from "vue";

import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

import router from "./router";
import store from "./store";

import App from "./App.vue";

createApp(App).use(router).use(store).use(VueChartkick).mount("#app");
