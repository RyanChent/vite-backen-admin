import { defineComponent, Transition, inject } from "vue";
import pcLayout from "./PC";
import mobileLayout from "./Mobile";

const routerView = () => <router-view>
    {{
        default: ({ Component, route }: any) =>
            <Transition enter-active-class="animated fadeIn">
                {route.meta?.keepAlive ? <keep-alive><Component /></keep-alive> : <Component />}
            </Transition>
    }}
</router-view>


const layout = defineComponent({
    name: 'NormalLayout',
    componentName: 'ManageNormalLayout',
    components: {
        pcLayout,
        mobileLayout
    },
    setup() {
        const isMobile = inject('isMobile') as any
        return () => !isMobile.value ? <pc-layout >
            {{ default: routerView }}
        </pc-layout> : <mobile-layout >
            {{ default: routerView }}
        </mobile-layout>
    }
})

export default layout