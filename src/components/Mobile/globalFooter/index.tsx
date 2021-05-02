import { defineComponent, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const globalFooter = defineComponent({
    name: 'mobileFooter',
    componentName: 'ManageMobileFooter',
    setup() {
        const router = useRouter()
        const store = useStore()
        const route = ref<any>('/')
        watch(() => router.currentRoute.value.path, (newpath) => {
            if (newpath !== '/me' && newpath !== '/login') {
                route.value = newpath
            }
        }, { immediate: true })
        onUnmounted(() => {
            store.dispatch('getInfo', [])
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