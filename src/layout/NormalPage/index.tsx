import { defineComponent, Transition, inject, KeepAlive, h } from 'vue'
import pcLayout from './PC'
import mobileLayout from './Mobile'
import keepAliveComponent from '@/data/keepAlive'

const layout = defineComponent({
  name: 'NormalLayout',
  componentName: 'ManageNormalLayout',
  components: {
    pcLayout,
    mobileLayout
  },
  setup() {
    const isMobile = inject<any>('isMobile')
    const routeView = () => (
      <router-view
        v-slots={{
          default: ({ Component, route }: any) => (
            <Transition enterActiveClass="animated fadeIn">
              {route.meta?.keepAlive ? (
                <KeepAlive include={keepAliveComponent}>
                  <Component />
                </KeepAlive>
              ) : (
                <Component />
              )}
            </Transition>
          )
        }}
      />
    )
    const backTop = () => <el-backtop bottom={100} right={40} />
    return () =>
      !isMobile.value ? (
        <pc-layout
          v-slots={{
            default: () => (
              <>
                {routeView()}
                {backTop()}
              </>
            )
          }}
        />
      ) : (
        <mobile-layout
          v-slots={{
            default: () => (
              <>
                {routeView()}
                {backTop()}
              </>
            )
          }}
        />
      )
  }
})

export default layout
