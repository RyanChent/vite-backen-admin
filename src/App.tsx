import { defineComponent, onBeforeUnmount, provide, ref, h, onMounted } from "vue";
import layout from "./layout/index";
import { isMobile } from "./utils/types";
import * as _ from "lodash";

const App = defineComponent({
    name: 'App',
    components: {
        layout
    },
    setup() {
        const isPhone = ref(isMobile())
        provide('isMobile', () => isPhone)
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
        return () => <layout isMobile={isPhone.value} >
            <router-view v-slots={{
                default: ({ Component }: any) => <transition enter-active-class="animated fadeIn">
                    <Component />
                </transition>
            }}
            />
        </layout>
    }
})

export default App