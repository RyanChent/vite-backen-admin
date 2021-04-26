import { defineComponent } from "vue";
import { isFunction, isNotEmptyString } from "@/utils/types.ts";
import { useRouter } from 'vue-router'
import FullScreen from './fullScreen'
import i18nSwitch from './locale'
import rightNav from './rightNav'
import './style.less'

const globalHeader = defineComponent({
    name: "Header",
    componentName: "ManageHeader",
    components: {
        FullScreen,
        i18nSwitch,
        rightNav
    },
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
        const router = useRouter()
        return () => <section class="global-header">
            {isFunction(slots.logo) ? slots.logo() : <div class="global-header-logo" onClick={() => { router.push('/') }}>
                {logo instanceof Node ? <logo /> : isNotEmptyString(logo) ? <img src={logo} /> : null}
                {siteName instanceof Node ? <siteName /> : <span>{siteName}</span>}
            </div>}
            {isFunction(slots.headmenu) && slots.headmenu()}
            {isFunction(slots.headright) ? slots.headright() : <div class="global-header-right-info">
                <full-screen />
                <i18n-switch />
                <right-nav />
            </div>}
        </section>
    }
})

export default globalHeader