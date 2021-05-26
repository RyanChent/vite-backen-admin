import { defineComponent } from "vue";
import { isFunction } from '@/utils/types'
import './style'
const MobileUserLayout = defineComponent({
    name: 'MobileUserLayout',
    componentName: 'ManageUserMobileLayout',
    setup(props, { slots }: any) {
        return () => <section class="vite-backen-mobile-login blur">
            {isFunction(slots.default) && slots.default()}
        </section>
    }
})

export default MobileUserLayout