import {
  defineComponent,
  onBeforeUnmount,
  provide,
  ref,
  onMounted,
  Transition,
  readonly
} from 'vue'
import NormalLayout from './NormalPage'
import UserLayout from './UserPage'
import { isMobile, isNotEmptyString } from '@/utils/types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import _ from 'lodash'

const useLayoutProps = () => {
  const isPhone = ref<any>(isMobile())
  const store = useStore()
  const router = useRouter()

  const updateRoutes = () => {
    store.dispatch('generateRoutes', store.state.user.roles).then((asyncRoutes) => {
      asyncRoutes.forEach((route: any) => {
        router.addRoute(route)
      })
      const { name, path }: any = router.currentRoute.value
      router.replace(router.hasRoute(name) ? path : '/')
    })
  }

  const screenResize = _.debounce(() => {
    if (isPhone.value !== isMobile()) {
      updateRoutes()
      isPhone.value = isMobile()
    }
  }, 500)

  return {
    isPhone,
    updateRoutes,
    screenResize
  }
}

const layout = defineComponent({
  name: 'Layout',
  componentName: 'ManageLayout',
  components: {
    NormalLayout,
    UserLayout
  },
  setup() {
    const { isPhone, updateRoutes, screenResize } = useLayoutProps()
    provide('isMobile', readonly(isPhone))
    provide('updateRoutes', updateRoutes)
    onMounted(() => window.addEventListener('resize', screenResize))
    onBeforeUnmount(() => window.removeEventListener('resize', screenResize))
    return {}
  },
  render() {
    return (
      <Transition enter-active-class="animated fadeIn">
        {isNotEmptyString((this as any).$store.state.user.token) ? (
          <normal-layout />
        ) : (
          <user-layout />
        )}
      </Transition>
    )
  }
})

export default layout
