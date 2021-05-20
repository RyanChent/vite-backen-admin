import { defineComponent, watch } from 'vue'
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
        watch(() => route.path, () => {
            emit('update:modelValue', false)
        }, { immediate: true })
        return {

        }
    },
    render() {
        const slots = this.$slots as any
        const { logo, siteName }: any = this
        return <van-popup
            show={this.modelValue}
            position="left"
            overlay={false}
            safe-area-inset-bottom
            teleport={document.body}
            class="left-popup-menu"
            close-on-popstate {...{
                'onUpdate:show': (value: boolean) => this.$emit('update:modelValue', value)
            }}
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