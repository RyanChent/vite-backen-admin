import { defineComponent, Transition } from 'vue'
import { isFunction, isNotEmptyString } from '@/utils/types'
import { useRouter } from 'vue-router'
import FullScreen from './fullScreen'
import i18nSwitch from './locale'
import rightNav from './rightNav'
import topSearch from '../Search'
import colorPicker from './colorPicker'
import configuration from './configuration'
import Menus from '../Menus'
import './style'
import { useStore } from 'vuex'

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
  setup(props, { slots }: any) {
    const { logo, siteName }: any = props
    const router = useRouter()
    const store = useStore()
    return () => (
      <section class="global-header">
        {isFunction(slots.logo) ? (
          slots.logo()
        ) : (
          <div
            class="global-header-logo"
            onClick={() => {
              router.replace('/')
            }}
          >
            {logo instanceof Node ? <logo /> : isNotEmptyString(logo) ? <img src={logo} /> : null}
            {siteName instanceof Node ? <siteName /> : <span>{siteName}</span>}
          </div>
        )}
        <Transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
          {isFunction(slots.headmenu) ? slots.headmenu() : (store.state.config.navMode === 'horizontal' && <Menus />)}
        </Transition>
        {isFunction(slots.headright) ? (
          slots.headright()
        ) : (
          <div class="global-header-right-info">
            <top-search />
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
