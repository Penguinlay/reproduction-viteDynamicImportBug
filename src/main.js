import { createApp } from "vue";
import VueMarkdownIt from "vue3-markdown-it";
import App from "./App.vue";

createApp(App).use(VueMarkdownIt).mount("#app");
