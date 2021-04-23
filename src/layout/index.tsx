import { defineComponent, onBeforeUnmount, provide, ref, h, onMounted, Transition } from "vue";
import pcLayout from "./PC";
import mobileLayout from "./Mobile";
import { isMobile } from "@/utils/types.ts";
import * as _ from "lodash";

const routerView = () => <router-view>
    {{
        default: ({ Component, route }: any) =>
            <Transition enter-active-class="animated fadeIn">
                {route.meta?.keepAlive ? <keep-alive><Component /></keep-alive> : <Component />}
            </Transition>
    }}
</router-view>


const layout = defineComponent({
    name: 'Layout',
    componentName: 'ManageLayout',
    components: {
        pcLayout,
        mobileLayout
    },
    setup() {
        const isPhone = ref(isMobile())
        provide('isMobile', isPhone)
        onMounted(() => {
            window.addEventListener('resize', _.debounce(() => {
                isPhone.value = isMobile()
            }, 500))
        })
        onBeforeUnmount(() => {
            window.removeEventListener("resize", _.debounce(() => {
                isPhone.value = isMobile();
            }, 500));
        })
        return () => !isPhone.value ? <pc-layout >
            {routerView}
        </pc-layout> : <mobile-layout >
            {routerView}
        </mobile-layout>
    }
})

export default layout