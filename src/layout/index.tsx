import { defineComponent, onBeforeUnmount, provide, ref, onMounted } from "vue";
import NormalLayout from './NormalPage'
import UserLayout from './UserPage'
import { isMobile, isNotEmptyString } from "@/utils/types.ts";
import { useStore } from 'vuex'
import _ from "lodash";


const layout = defineComponent({
    name: 'Layout',
    componentName: 'ManageLayout',
    components: {
        NormalLayout,
        UserLayout
    },
    setup() {
        const isPhone = ref(isMobile())
        const store = useStore()
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
        return () => isNotEmptyString(store.state.user.token) ? <normal-layout /> : <user-layout />
    }
})

export default layout