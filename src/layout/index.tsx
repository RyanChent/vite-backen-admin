import { defineComponent, onBeforeUnmount, provide, ref, onMounted, Transition, readonly } from "vue";
import NormalLayout from './NormalPage'
import UserLayout from './UserPage'
import { isMobile, isNotEmptyString } from "@/utils/types.ts";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import _ from "lodash";

const layout = defineComponent({
    name: 'Layout',
    componentName: 'ManageLayout',
    components: {
        NormalLayout,
        UserLayout
    },
    setup() {
        const isPhone = ref<any>(isMobile())
        const store = useStore()
        const router = useRouter()
        provide('isMobile', readonly(isPhone))
        const screenResize = _.debounce(() => {
            if (isPhone.value !== isMobile()) {
                store.dispatch('generateRoutes', store.state.user.roles).then(asyncRoutes => {
                    asyncRoutes.forEach((route: any) => {
                        router.addRoute(route)
                    })
                    const { name, path }: any = router.currentRoute.value
                    router.replace(router.hasRoute(name) ? path : '/')
                })
                isPhone.value = isMobile()
            }
        }, 500)
        onMounted(() => window.addEventListener('resize', screenResize))
        onBeforeUnmount(() => window.removeEventListener("resize", screenResize))
        return {
        }
    },
    render() {
        return <Transition enter-active-class="animated fadeIn">
            {isNotEmptyString((this as any).$store.state.user.token) ? <normal-layout /> : <user-layout />}
        </Transition>
    }
})

export default layout