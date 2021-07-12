import { createApp } from 'vue'
import App from './App'
import router from './router'
import vuex from './store'
import { setDomFontSize } from './utils/dom'
import ElementPlus from 'element-plus'
import { debounce } from './utils/tool'
import './permission'
import registerVant from './plugins/vant-next'
import registerDirectives from './directive'
import registerComponents from './components'
import registerI18n from './lang'
import './plugins/styles'
window.addEventListener('resize', debounce(setDomFontSize, 500, true))
const app = createApp(App)

/**
 * 注册全局指令
 */
registerDirectives(app)
/**
 * 注册全局组件
 */
registerComponents(app)
/**
 * 注册国际化
 */
registerI18n(app, ElementPlus)
/**
 * 注册vant
 */
registerVant(app)

app.use(vuex).use(router)
router
  .isReady()
  .catch(console.log)
  .finally(() => app.mount('#app'))
