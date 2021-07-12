import { defineAsyncComponent, defineComponent } from 'vue'
import { isNotEmptyString, isFunction } from '@/utils/types'
import './style'

const SubMenus = defineComponent({
  name: 'SubMenus',
  __file: '@PC/Menus/subMenus',
  components: {
    SubMenus: defineAsyncComponent(() => import('@PC/Menus/subMenus'))
  },
  emits: ['close'],
  props: {
    depth: {
      type: Number,
      default: 1
    },
    route: {
      type: [Array, Object],
      default: () => []
    },
    t: {
      type: Function
    },
    direction: {
      type: String,
      default: 'vertical'
    }
  },
  render() {
    const slots: any = this.$slots
    const route: any = this.route
    const t: any = this.t
    return isFunction(slots[`menu-${this.depth}`]) ? (
      slots[`menu-${this.depth}`](this)
    ) : Array.isArray(route.children) && route.children.length ? (
      <el-submenu
        {...Object.assign(
          {
            index: route.path,
            'popper-append-to-body': true
          },
          this.direction === 'horizontal' && {
            'popper-class': `horizontal-submenu${route.path.replaceAll('/', '-')}`
          }
        )}
        v-click-outside={() => this.$emit('close', route.path)}
      >
        {{
          title: () => (
            <>
              {Boolean(route.meta && isNotEmptyString(route.meta.icon)) && (
                <i class={route.meta.icon} />
              )}
              {route.meta && <span>{t(route.meta.title)}</span>}
            </>
          ),
          default: () =>
            route.children.map(
              (subroute: any, index: number) =>
                !subroute.hidden && (
                  <sub-menus
                    route={subroute}
                    key={subroute.redirect || subroute.path || index}
                    depth={this.depth + 1}
                    t={t}
                    direction={this.direction}
                    onClose={(path: string) => this.$emit('close', path)}
                  />
                )
            )
        }}
      </el-submenu>
    ) : (
      !route.hidden && (
        <el-menu-item index={route.path}>
          {{
            title: () => (
              <>
                {Boolean(route.meta && isNotEmptyString(route.meta.icon)) && (
                  <i class={route.meta.icon} />
                )}
                {t(route.meta.title)}
              </>
            )
          }}
        </el-menu-item>
      )
    )
  }
})

export default SubMenus
