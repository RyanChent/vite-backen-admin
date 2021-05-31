import { defineComponent, Transition, inject, onMounted, onUnmounted } from 'vue'
import pcLayout from './PC'
import mobileLayout from './Mobile'
const routerView = () => (
  <router-view>
    {{
      default: ({ Component, route }: any) => (
        <Transition enter-active-class="animated fadeIn">
          {route.meta?.keepAlive ? (
            <keep-alive>
              <Component />
            </keep-alive>
          ) : (
            <Component />
          )}
        </Transition>
      )
    }}
  </router-view>
)

const layout = defineComponent({
  name: 'UserLayout',
  componentName: 'ManageUserLayout',
  components: {
    pcLayout,
    mobileLayout
  },
  setup() {
    onMounted(() => {
      document.oncontextmenu = () => false
    })
    onUnmounted(() => {
      document.oncontextmenu = () => true
    })
    const isMobile = inject('isMobile') as any
    return () => (
      <Transition enter-active-class="animated fadeIn">
        {!isMobile.value ? (
          <pc-layout>{{ default: routerView }}</pc-layout>
        ) : (
          <mobile-layout>{{ default: routerView }}</mobile-layout>
        )}
      </Transition>
    )
  }
})

export default layout
