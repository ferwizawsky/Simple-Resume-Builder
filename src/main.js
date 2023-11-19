import { createApp } from "vue";
import { createPinia } from "pinia";
import VueHtml2pdf from "vue3-html2pdf";

import "./style.css";
import App from "./App.vue";
import router from "@/router";

const pinia = createPinia();
const app = createApp(App);

app.use(VueHtml2pdf);
app.use(router);
app.use(pinia);
app.mount("#app");
