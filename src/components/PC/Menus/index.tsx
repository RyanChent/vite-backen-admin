import { defineComponent } from 'vue'
import { useMenuProps, useHandleMenus } from '@/hooks/menus'
import { isNotEmptyString } from '@/utils/types'
import SubMenus from './subMenus'
import { t } from '@/lang'
import './style'

const Menus = defineComponent({
  name: 'Menus',
  componentName: 'ManageMenus',
  __file: '@PC/Menus',
  components: {
    SubMenus
  },
  setup() {
    return useMenuProps()
  },
  render() {
    const store = (this as any).$store
    const { onSelect, onClose, onOpen } = useHandleMenus.call(this)
    return (
      <el-menu
        v-models={[
          [this.defaultIndex, 'defaultActive'],
          [this.defaultOpen, 'defaultOpeneds']
        ]}
        {...{
          mode: store.state.config.navMode,
          uniqueOpened: store.state.config.uniqueOpen,
          collapse: store.state.config.collapse,
          menuTrigger: 'click',
          onSelect,
          onOpen,
          onClose
        }}
        ref="manage-menu"
      >
        {this.routes.map((route: any, index: number) => {
          if (Array.isArray(route.children) && route.children.length) {
            return (
              <sub-menus
                key={route.redirect || route.path || index}
                route={route}
                t={t}
                direction={store.state.config.navMode}
                onClose={onClose}
              />
            )
          } else {
            return (
              !route.hidden && (
                <el-menu-item key={route.path || index} index={route.path}>
                  {{
                    default: () =>
                      route.meta &&
                      isNotEmptyString(route.meta.icon) && <i class={route.meta.icon} />,
                    title: () =>
                      route.meta && isNotEmptyString(route.meta.title) && t(route.meta.title)
                  }}
                </el-menu-item>
              )
            )
          }
        })}
      </el-menu>
    )
  }
})

export default Menus
