import { defineComponent } from "vue";
import { isNotEmptyString, isFunction } from "@/utils/types.ts";

const SubMenus = defineComponent({
    name: 'SubMenus',
    components: {
        SubMenus: () => import("@/PC/Menus/subMenus/index.tsx"),
    },
    props: {
        depth: {
            type: Number,
            default: 1,
        },
        route: {
            type: [Array, Object],
            default: () => [],
        },
    },
    setup(props: any, { slots }: any) {
        return () => isFunction(slots[`menu-${props.depth}`]) ? slots[`menu-${props.depth}`](props.route, props.depth) : <>
            {Array.isArray(props.route.children) && props.route.children.length ? <el-submenu index={props.route.redirect}>
                {{
                    title: () => <>
                        {Boolean(props.route.meta && isNotEmptyString(props.route.meta.icon)) && <i class={props.route.meta.icon} />}
                        {props.route.meta && <span>{props.route.meta.title}</span>}
                    </>,
                    default: () => props.route.children.map((subroute: any, index: number) => <sub-menus route={subroute} key={subroute.redirect || subroute.path || index} depth={props.depth + 1} />)
                }}
            </el-submenu> : <el-menu-item index={props.route.path}>
                {{
                    title: () => <>
                        {Boolean(props.route.meta && isNotEmptyString(props.route.meta.icon)) && <i class={props.route.meta.icon} />}
                        {props.route.meta.title}
                    </>
                }}
            </el-menu-item>
            }
        </>
    }
})

export default SubMenus