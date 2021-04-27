import { defineComponent, onBeforeUnmount, provide, ref, onMounted, computed } from "vue";
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
        const hasToken = computed(() => isNotEmptyString(store.state.user.token))
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
        return () => hasToken ? <normal-layout /> : <user-layout />
    }
})

export default layout