import { createApp } from "vue";
import App from "./App";
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
import "./permission";
import registerDirectives from "./directive";
import registerComponents from "./components";
setDomFontSize();
const setDomFontSizeDebounce = _.debounce(setDomFontSize, 500);
window.addEventListener("resize", setDomFontSizeDebounce);
const app = createApp(App);

/**
 * 注册全局指令
 */
registerDirectives(app);
/**
 * 注册全局组件
 */
registerComponents(app);

app.use(vuex).use(router).use(vant).use(ElementPlus);
router.isReady().then(() => app.mount("#app"));
