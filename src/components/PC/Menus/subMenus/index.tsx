import { defineAsyncComponent, defineComponent } from "vue";
import { isNotEmptyString, isFunction } from "@/utils/types";

const SubMenus = defineComponent({
    name: 'SubMenus',
    __file: '@PC/Menus/subMenus',
    components: {
        SubMenus: defineAsyncComponent(() => import("@PC/Menus/subMenus")),
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
        t: {
            type: Function
        }
    },
    setup(props: any, { slots }: any) {
        return () => isFunction(slots[`menu-${props.depth}`]) ? slots[`menu-${props.depth}`](props) : <>
            {Array.isArray(props.route.children) && props.route.children.length ? <el-submenu index={props.route.redirect || props.route.path}>
                {{
                    title: () => <>
                        {Boolean(props.route.meta && isNotEmptyString(props.route.meta.icon)) && <i class={props.route.meta.icon} />}
                        {props.route.meta && <span>{props.t(props.route.meta.title)}</span>}
                    </>,
                    default: () => props.route.children.map((subroute: any, index: number) => !subroute.hidden && <sub-menus route={subroute} key={subroute.redirect || subroute.path || index} depth={props.depth + 1} t={props.t} />)
                }}
            </el-submenu> : !props.route.hidden && <el-menu-item index={props.route.path}>
                {{
                    title: () => <>
                        {Boolean(props.route.meta && isNotEmptyString(props.route.meta.icon)) && <i class={props.route.meta.icon} />}
                        {props.t(props.route.meta.title)}
                    </>
                }}
            </el-menu-item>
            }
        </>
    }
})

export default SubMenus