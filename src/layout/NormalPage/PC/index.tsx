import { defineComponent } from "vue";
import Menus from "@PC/Menus/index.tsx";
import globalHead from "@PC/globalHeader/index.tsx";
import globalFooter from "@PC/globalFooter/index.tsx"
import multiTab from "@PC/MultiTab/index.tsx"
import { isFunction } from "@/utils/types.ts";
import './style.less'
import { useRoute } from "vue-router";

const PCLayout = defineComponent({
    name: "PCLayout",
    componentName: "ManagePClayout",
    props: {
        headHeight: {
            type: String,
            default: "60px",
        },
        sidebarWidth: {
            type: String,
            default: '220px'
        },
        footerHeight: {
            type: String,
            default: '60px'
        }
    },
    components: {
        Menus,
        globalHead,
        globalFooter,
        multiTab
    },
    setup(props, { slots }: any) {
        const route = useRoute()
        return () => <el-container class="backen-admin-pc" direction="vertical">
            {route.path != '/404' ?
                <><el-header class="backen-admin-pc-navbar" height={props.headHeight}>
                    {isFunction(slots.head) ? slots.head() : <global-head />}
                </el-header>
                    <el-container direction="horizontal" class="backen-admin-pc-main">
                        <el-aside width={props.sidebarWidth} class="backen-admin-pc-sidebar">
                            {isFunction(slots.menu) ? slots.menu() : <Menus />}
                        </el-aside>
                        <el-container direction="vertical" class="backen-admin-pc-content">
                            <el-header height='40px'>
                                {isFunction(slots.tab) ? slots.tab() : <multi-tab />}
                            </el-header>
                            <el-main>
                                {isFunction(slots.default) && slots.default()}
                            </el-main>
                            <el-footer height={props.footerHeight}>
                                {isFunction(slots.footer) ? slots.footer() : <global-footer />}
                            </el-footer>
                        </el-container>
                    </el-container>
                </>
                : isFunction(slots.default) && slots.default()
            }
        </el-container >
    },
})

export default PCLayout