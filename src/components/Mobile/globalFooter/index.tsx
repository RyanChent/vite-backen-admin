import { defineComponent, ref, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const globalFooter = defineComponent({
    name: 'mobileFooter',
    componentName: 'ManageMobileFooter',
    setup() {
        const router = useRouter()
        const route = ref<any>('/')
        router.addRoute('UserPage', {
            path: '/me',
            name: 'UserPage',
            hidden: true,
            meta: {
                title: 'user-page'
            },
            component: () => import('@/views/User/index.tsx')
        } as any)
        onUnmounted(() => {
            router.push(route.value)
            router.removeRoute('UserPage')
        })
        watch(() => router.currentRoute.value.path, (newpath) => {
            if (newpath !== '/me' && newpath !== '/login') {
                route.value = newpath
            }
        }, { immediate: true })
        return {
            route
        }
    },
    render() {
        return <van-tabbar placeholder route >
            <van-tabbar-item icon="apps-o" replace to={this.route}>应用</van-tabbar-item>
            <van-tabbar-item icon="user-circle-o" replace to='/me'>我</van-tabbar-item>
        </van-tabbar>
    }
})

export default globalFooter