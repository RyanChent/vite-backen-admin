import { defineComponent, Transition } from 'vue'
import Menus from '@PC/Menus'
import globalHead from '@PC/globalHeader'
import globalFooter from '@PC/globalFooter'
import multiTab from '@PC/MultiTab'
import breadCrumb from '@PC/BreadCrumb'
import { isFunction } from '@/utils/types'
import { useRoute } from 'vue-router'
import './style'
import { useStore } from 'vuex'

const PCLayout = defineComponent({
  name: 'PCLayout',
  componentName: 'ManagePClayout',
  props: {
    headHeight: {
      type: String,
      default: '60px'
    },
    sidebarWidth: {
      type: String,
      default: '220px'
    },
    footerHeight: {
      type: String,
      default: '60px'
    }
  },
  components: {
    Menus,
    globalHead,
    globalFooter,
    multiTab,
    breadCrumb
  },
  setup(props, { slots }: any) {
    const route = useRoute()
    const store = useStore()
    return () => (
      <el-container class="backen-admin-pc" direction="vertical">
        {route.path != '/404' ? (
          <>
            <el-header
              class={{
                'backen-admin-pc-navbar': true,
                'fix-head': store.state.config.fixHead
              }}
              height={props.headHeight}
            >
              {isFunction(slots.head) ? slots.head() : <global-head />}
            </el-header>
            <el-container direction="horizontal" class="backen-admin-pc-main">
              <Transition
                enterActiveClass="animated fadeInLeft"
                leaveActiveClass="animated fadeOutLeft"
              >
                {store.state.config.navMode === 'vertical' && (
                  <el-aside
                    width={store.state.config.collapse ? '65px' : props.sidebarWidth}
                    class={{
                      'backen-admin-pc-sidebar': true,
                      'fix-side': store.state.config.fixSide
                    }}
                  >
                    {isFunction(slots.menu) ? slots.menu(store.state.permission.routes) : <Menus />}
                  </el-aside>
                )}
              </Transition>
              <el-container direction="vertical" class="backen-admin-pc-content">
                <el-header
                  height="40px"
                  onContextmenu={(e: MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  {isFunction(slots.tab) ? slots.tab() : <multi-tab />}
                </el-header>
                <el-main>
                  {!['/docs', '/'].includes(route.path) && (
                    <bread-crumb breadCrumb={route.matched} />
                  )}
                  {isFunction(slots.default) && slots.default()}
                </el-main>
                <el-footer height={props.footerHeight}>
                  {isFunction(slots.footer) ? slots.footer() : <global-footer />}
                </el-footer>
              </el-container>
            </el-container>
          </>
        ) : (
          isFunction(slots.default) && slots.default()
        )}
      </el-container>
    )
  }
})

export default PCLayout
