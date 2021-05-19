import { defineComponent, Transition, inject, KeepAlive } from "vue";
import pcLayout from "./PC";
import mobileLayout from "./Mobile";
import keepAliveComponent from '@/data/keepAlive.json'
const routerView = () => <router-view v-slots={{
    default: ({ Component, route }: any) =>
        <Transition enter-active-class="animated fadeIn">
            {route.meta?.keepAlive ?
                <KeepAlive include={keepAliveComponent}>
                    <Component />
                </KeepAlive>
                : <Component />
            }
        </Transition>
}}>
</router-view>


const layout = defineComponent({
    name: 'NormalLayout',
    componentName: 'ManageNormalLayout',
    components: {
        pcLayout,
        mobileLayout
    },
    setup() {
        const isMobile = inject<any>('isMobile')
        return () => !isMobile.value ?
            <pc-layout v-slots={{ default: routerView }} /> :
            <mobile-layout v-slots={{ default: routerView }} />
    }
})

export default layout