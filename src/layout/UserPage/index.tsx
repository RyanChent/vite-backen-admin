import { defineComponent, Transition, inject, onMounted, onUnmounted } from "vue";
import pcLayout from './PC'
const routerView = () => <router-view>
    {{
        default: ({ Component, route }: any) =>
            <Transition enter-active-class="animated fadeIn">
                {route.meta?.keepAlive ? <keep-alive><Component /></keep-alive> : <Component />}
            </Transition>
    }}
</router-view>


const layout = defineComponent({
    name: 'UserLayout',
    componentName: 'ManageUserLayout',
    components: {
        pcLayout
    },
    setup() {
        onMounted(() => {
            document.oncontextmenu = () => false
        })
        onUnmounted(() => {
            document.oncontextmenu = () => true
        })
        const isMobile = inject('isMobile') as any
        return () => !isMobile.value ? <pc-layout >
            {{ default: routerView }}
        </pc-layout> : <mobile-layout >
            {{ default: routerView }}
        </mobile-layout>
    }
})

export default layout