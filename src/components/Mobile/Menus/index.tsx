import { computed, defineComponent, watch } from 'vue'
import { isNotEmptyString, isFunction } from '@/utils/types'
import Menus from '@PC/Menus'
import { useRoute } from 'vue-router'
import './style'
const mobileMenus = defineComponent({
  name: 'MobileMenus',
  componentName: 'ManageMobileMenus',
  __file: '@Mobile/Menus',
  components: {
    Menus
  },
  props: {
    t: {
      type: Function,
      default: () => function () {}
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    logo: {
      type: [Node, String],
      default: '/assets/logo.png'
    },
    siteName: {
      type: [Node, String],
      default: 'vite-backen-admin'
    }
  },
  setup(props: any, { emit }: any) {
    const route = useRoute()
    const show = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })

    watch(
      () => route.path,
      () => {
        show.value = false
      },
      { immediate: true }
    )

    return {
      show
    }
  },
  render() {
    const slots: any = this.$slots
    const { logo, siteName }: any = this
    return (
      <van-popup
        v-model={[this.show, 'show']}
        position="left"
        overlay={false}
        safe-area-inset-bottom
        teleport={document.body}
        class="left-popup-menu"
        close-on-popstate
      >
        <div class="menu-panel">
          {isFunction(slots.logo) ? (
            slots.logo()
          ) : (
            <header>
              {logo instanceof Node ? <logo /> : isNotEmptyString(logo) && <img src={logo} />}
              {siteName instanceof Node ? (
                <siteName />
              ) : (
                isNotEmptyString(siteName) && <span>{siteName}</span>
              )}
            </header>
          )}
          <Menus />
        </div>
      </van-popup>
    )
  }
})

export default mobileMenus
