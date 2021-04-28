import { defineComponent } from "vue";
import { isFunction } from '@/utils/types.ts';
import './style.less'
const PCUserLayout = defineComponent({
    name: 'PCUserLayout',
    componentName: 'ManageUserPCLayout',
    setup(props, { slots }: any) {
        return () => <section class="vite-backen-pc-login">
            {isFunction(slots.default) && slots.default()}
        </section>
    }
})

export default PCUserLayout