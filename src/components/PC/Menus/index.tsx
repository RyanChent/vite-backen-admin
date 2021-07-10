import { defineComponent, computed, ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isNotEmptyString } from '@/utils/types'
import SubMenus from './subMenus'
import { t } from '@/lang'
import './style'

let resultMap: any = Object.create(null)

const wheelScroll = (e: any, ele: any) => {
  e.stopPropagation()
  const delD = e.wheelDelta ? e.wheelDelta : -e.detail * 40
  const move = delD > 0 ? -50 : 50
  ele.scrollLeft += move
}

const Menus = defineComponent({
  name: 'Menus',
  componentName: 'ManageMenus',
  __file: '@PC/Menus',
  components: {
    SubMenus
  },
  setup() {
    const store = useStore()
    const routes = computed(() => store.state.permission.routes)
    const router = useRouter()
    const route = router.currentRoute
    const defaultIndex = ref<string>(route.value.path)
    /* 监听route变动 */
    watch(
      () => route.value.path,
      () => {
        defaultIndex.value = route.value.path
      },
      { immediate: true }
    )

    const select = (index: string) => {
      if (['http', '//'].some((key) => index.startsWith(key))) {
        location.href = index
      } else {
        router.replace(index)
      }
    }

    const open = async (index: string) => {
      const selector = index.replaceAll('/', '-')
      const current: any = document.querySelector(`.horizontal-submenu${selector}`)
      const first = selector.indexOf('-')
      const last = selector.lastIndexOf('-')
      if (first !== last) {
        const parent: any = document.querySelector(`.horizontal-submenu${selector.slice(0, last)}`)
        await nextTick()
        const parentLi: any = parent.children[0].querySelector('li.el-submenu.is-opened')
        const left = parent.offsetLeft + parentLi.offsetLeft - parentLi.offsetWidth / 2
        const top = parent.offsetTop + parent.offsetHeight + 2
        current.style.cssText += `left:${left}px !important; top: ${top}px !important`
      }
    }

    /* 挂载el-menus */
    return () => (
      <el-menu
        defaultActive={defaultIndex.value}
        mode={store.state.config.navMode}
        onSelect={select}
        onOpen={open}
        unique-opened={store.state.config.uniqueOpen}
        collapse={store.state.config.collapse}
        menu-trigger="click"
      >
        {routes.value.map((route: any, index: number) => {
          if (Array.isArray(route.children) && route.children.length) {
            return (
              <sub-menus
                key={route.redirect || route.path || index}
                route={route}
                t={t}
                direction={store.state.config.navMode}
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
