import { defineComponent } from "vue";
import { isFunction, isNotEmptyString } from "@/utils/types.ts";
import { useRouter } from 'vue-router'
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
        const router = useRouter()
        return () => <section class="global-header">
            {isFunction(slots.logo) ? slots.logo() : <div class="global-header-logo" onClick={() => { router.push('/') }}>
                {logo instanceof Node ? <logo /> : isNotEmptyString(logo) ? <img src={logo} /> : null}
                {siteName instanceof Node ? <siteName /> : <span>{siteName}</span>}
            </div>}
            {isFunction(slots.headmenu) && slots.headmenu()}
            {isFunction(slots.headright) ? slots.headright() : <div class="global-header-right-info">
                <i class="el-icon-full-screen" />
                <span>中</span>
                <el-dropdown size="small">
                    {
                        {
                            dropdown: () => isFunction(slots.dropdown) ? slots.dropdown() : <el-dropdown-menu>
                                <el-dropdown-item>个人信息</el-dropdown-item>
                                <el-dropdown-item divided>退出登录</el-dropdown-item>
                            </el-dropdown-menu>,
                            default: () => <div class="person-info">
                                <el-avatar src="/assets/avatar.jpg" />
                                <span>Jarry Chen</span>
                            </div>
                        }
                    }
                </el-dropdown>
            </div>}
        </section>
    },
})

export default globalHeader