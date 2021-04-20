import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuex from "./store";
import "vant/lib/index.css";
import "./styles/index.less";
import { setDomFontSize } from "./utils/dom";
import "animate.css";
import ElementPlus from "element-plus";
import vant from "vant";
import "element-plus/lib/theme-chalk/index.css";
import * as _ from "lodash";
import './permission'
setDomFontSize();
const setDomFontSizeDebounce = _.debounce(setDomFontSize, 400);
window.addEventListener("resize", setDomFontSizeDebounce);
createApp(App).use(vuex).use(router).use(vant).use(ElementPlus).mount("#app");
