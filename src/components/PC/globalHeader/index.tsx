import { defineComponent } from "vue";
import { isFunction, isNotEmptyString } from "@/utils/types";
import './style.less'

const globalHeader = defineComponent({
    name: "Header",
    componentName: "ManageHeader",
    props: {
        logo: {
            type: [Node, String],
            default: "/assets/logo.png"
        },
        siteName: {
            type: [Node, String],
            default: 'vite-backen-admin'
        }
    },
    setup(props, { slots }: any) {
        const { logo, siteName }: any = props
        return () => <section class="global-header">
            {isFunction(slots.logo) ? slots.logo() : <div class="global-header-logo">
                {logo instanceof Node ? <logo /> : isNotEmptyString(logo) ? <img src={logo} /> : null}
                {siteName instanceof Node ? <siteName /> : <span>{siteName}</span>}
            </div>}
            {isFunction(slots.headmenu) && slots.headmenu()}
            {isFunction(slots.headright) ? slots.headright() : <div class="global-header-right-info">
            </div>}
        </section>
    },
})

export default globalHeader