import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuex from "./store";
import "vant/lib/index.css";
import "./styles/index.less";
import { setDomFontSize } from "./utils/dom";
import "animate.css";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
setDomFontSize();

createApp(App).use(vuex).use(router).use(ElementPlus).mount("#app");
