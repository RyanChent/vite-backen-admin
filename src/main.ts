import { createApp } from "vue";
import App from "./App";
import router from "./router";
import vuex from "./store";
import "vant/lib/index.css";
import "./styles/index.less";
import { setDomFontSize } from "./utils/dom";
import "animate.css";
import vant from "vant";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import _ from "lodash";
import "./permission";
import "./lang/index";
import registerDirectives from "./directive";
import registerComponents from "./components";
import registerI18n from "./lang";
setDomFontSize();
window.addEventListener("resize", _.debounce(setDomFontSize, 500));
const app = createApp(App);

/**
 * 注册全局指令
 */
registerDirectives(app);
/**
 * 注册全局组件
 */
registerComponents(app);
/**
 * 注册国际化
 */
registerI18n(app, ElementPlus);
app.use(vuex).use(router).use(vant);
router
  .isReady()
  .catch(console.log)
  .finally(() => app.mount("#app"));