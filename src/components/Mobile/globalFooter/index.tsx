import { defineComponent, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const globalFooter = defineComponent({
    name: 'MobileFooter',
    componentName: 'ManageMobileFooter',
    __file: '@Mobile/globalFooter/index.tsx',
    setup() {
        const router = useRouter()
        const route = ref<any>('/')
        watch(() => router.currentRoute.value.path, (newpath) => {
            if (newpath !== '/me' && newpath !== '/login') {
                route.value = newpath
            }
        }, { immediate: true })
        onUnmounted(() => {
            router.push(route.value)
        })
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