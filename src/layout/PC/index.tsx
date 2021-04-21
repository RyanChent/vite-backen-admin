import { defineComponent, h } from "vue";
import Menus from "@/PC/Menus/index.vue";
import globalHead from "@/PC/GlobalHeader/index.vue";
import { isFunction } from "@/utils/types";
import './style.less'

const PCLayout = defineComponent({
    name: "PCLayout",
    componentName: "ManagePClayout",
    props: {
        headHeight: {
            type: String,
            default: "50px",
        },
        sidebarWidth: {
            type: String,
            default: '220px'
        }
    },
    components: {
        Menus,
        globalHead,
    },
    setup(props, { slots }: any) {
        return () => <el-container class="backen-admin-pc" direction="vertical">
            <el-header class="backen-admin-pc-navbar" height={props.headHeight}>
                {isFunction(slots.head) ? slots.head() : <global-head />}
            </el-header>
            <el-container direction="horizontal" class="backen-admin-pc-main">
                <el-aside width={props.sidebarWidth} class="backen-admin-pc-sidebar">
                    {isFunction(slots.menu) ? slots.menu() : <Menus />}
                </el-aside>
                <el-container direction="vertical" class="backen-admin-pc-content">
                    <el-header></el-header>
                    <el-main>
                        {isFunction(slots.default) && slots.default()}
                    </el-main>
                    <el-footer></el-footer>
                </el-container>
            </el-container>
        </el-container >
    },
})

export default PCLayout