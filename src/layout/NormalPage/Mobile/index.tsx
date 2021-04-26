import { defineComponent, h } from "vue";
import { isFunction } from "@/utils/types.ts";
import './style.less'
const MobileLayout = defineComponent({
    name: 'mobileLayout',
    componentName: 'ManageMobileLayout',
    setup(props, { slots }: any) {
        return () => <section class="backen-admin-mobile">
            <header></header>
            <main>
                {isFunction(slots.default) && slots.default()}
            </main>
            <footer></footer>
        </section>
    }
})

export default MobileLayout