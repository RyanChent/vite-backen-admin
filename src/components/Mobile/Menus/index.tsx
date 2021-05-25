import { computed, defineComponent, watch } from 'vue'
import { isNotEmptyString } from '@/utils/types.ts'
import './style.less'
import { isFunction } from '@/utils/types.ts'
import Menus from '@PC/Menus/index.tsx'
import { useRoute } from 'vue-router'
const mobileMenus = defineComponent({
    name: 'MobileMenus',
    componentName: 'ManageMobileMenus',
    __file: '@Mobile/Menus/index.tsx',
    components: {
        Menus
    },
    props: {
        t: {
            type: Function,
            default: () => function () { }
        },
        modelValue: {
            type: Boolean,
            default: false
        },
        logo: {
            type: [Node, String],
            default: "/assets/logo.png"
        },
        siteName: {
            type: [Node, String],
            default: 'vite-backen-admin'
        }
    },
    setup(props: any, { emit }: any) {
        const route = useRoute()
        const show = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })

        watch(() => route.path, () => {
            show.value = false
        }, { immediate: true })

        return {
            show
        }
    },
    render() {
        const slots: any = this.$slots
        const { logo, siteName }: any = this
        return <van-popup
            v-model={[this.show, 'show']}
            position="left"
            overlay={false}
            safe-area-inset-bottom
            teleport={document.body}
            class="left-popup-menu"
            close-on-popstate
        >
            <div class="menu-panel">
                {isFunction(slots.logo) ? slots.logo() : <header>
                    {logo instanceof Node ? <logo /> : isNotEmptyString(logo) ? <img src={logo} /> : null}
                    {siteName instanceof Node ? <siteName /> : isNotEmptyString(siteName) ? <span>{siteName}</span> : null}
                </header>}
                <Menus />
            </div>
        </van-popup>
    }
})

export default mobileMenus