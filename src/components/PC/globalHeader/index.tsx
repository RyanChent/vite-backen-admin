import { defineComponent, nextTick, Transition, watch, ref, onBeforeUnmount } from 'vue'
import { isFunction, isNotEmptyString } from '@/utils/types'
import FullScreen from './fullScreen'
import i18nSwitch from './locale'
import rightNav from './rightNav'
import topSearch from '../Search'
import colorPicker from './colorPicker'
import configuration from './configuration'
import messageList from './messageList'
import Menus from '../Menus'
import { useStore } from 'vuex'
import { useHandleScrollMenu } from '@/hooks/multitab'
import './style'

const useHandleMenu = () => {
  const store = useStore()
  const { headMenu, wheelScroll } = useHandleScrollMenu()
  watch(
    () => store.state.config.navMode,
    async () => {
      if (store.state.config.navMode === 'horizontal') {
        await nextTick()
        headMenu.value.$el.addEventListener('wheel', wheelScroll)
      }
    },
    { immediate: true }
  )
  return {
    headMenu
  }
}

const globalHeader = defineComponent({
  name: 'Header',
  componentName: 'ManageHeader',
  __file: '@PC/globalHeader',
  components: {
    FullScreen,
    i18nSwitch,
    rightNav,
    topSearch,
    colorPicker,
    configuration,
    messageList,
    Menus
  },
  props: {
    logo: {
      type: [Node, String],
      default: '/assets/logo.png'
    },
    siteName: {
      type: [Node, String],
      default: 'vite-backen-admin'
    }
  },
  setup() {
    const { headMenu } = useHandleMenu()
    return {
      headMenu
    }
  },
  render() {
    const slots: any = this.$slots
    const { logo, siteName, $store }: any = this
    return (
      <section class="global-header">
        {isFunction(slots.logo) ? (
          slots.logo()
        ) : (
          <div
            class="global-header-logo"
            onClick={() => {
              this.$router.replace('/')
            }}
            title="首页"
          >
            {logo instanceof Node ? <logo /> : isNotEmptyString(logo) && <img src={logo} />}
            {siteName instanceof Node ? <siteName /> : <span>{siteName}</span>}
          </div>
        )}
        <Transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
          {isFunction(slots.headmenu)
            ? slots.headmenu($store.state.permission.routes)
            : $store.state.config.navMode === 'horizontal' && (
                <Menus ref={(el: any) => el && (this.headMenu = el)} />
              )}
        </Transition>
        {isFunction(slots.headright) ? (
          slots.headright()
        ) : (
          <div class="global-header-right-info">
            <top-search />
            <message-list />
            <color-picker />
            <full-screen />
            <i18n-switch />
            <right-nav />
            <configuration />
          </div>
        )}
      </section>
    )
  }
})

export default globalHeader
