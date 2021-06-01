import { defineComponent, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isNotEmptyString } from '@/utils/types'
import SubMenus from './subMenus'
import { t } from '@/lang'

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
    const defaultIndex = ref(
      isNotEmptyString(routes.value[0].redirect) ? routes.value[0].redirect : routes.value[0].path
    )
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
    /* 挂载el-menus */
    return () => (
      <el-menu
        defaultActive={defaultIndex.value}
        onSelect={select}
        unique-opened={store.state.config.uniqueOpen}
        collapse={store.state.config.collapse}
      >
        {routes.value.map((route: any, index: number) => {
          if (Array.isArray(route.children) && route.children.length) {
            return <sub-menus key={route.redirect || route.path || index} route={route} t={t} />
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
