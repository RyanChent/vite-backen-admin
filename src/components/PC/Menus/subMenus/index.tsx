import { defineAsyncComponent, defineComponent, inject } from "vue";
import { isNotEmptyString, isFunction } from "@/utils/types.ts";

const RouteShow = (route: any, isMobile: boolean) => !route.hidden && (!route.meta?.hasOwnProperty('showMobile') || route.meta?.showMobile === isMobile)

const SubMenus = defineComponent({
    name: 'SubMenus',
    __file: '@PC/Menus/subMenus/index.tsx',
    components: {
        SubMenus: defineAsyncComponent(() => import("@PC/Menus/subMenus/index.tsx")),
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
        const isMobile = inject<any>('isMobile')
        return () => isFunction(slots[`menu-${props.depth}`]) ? slots[`menu-${props.depth}`](props) : <>
            {Array.isArray(props.route.children) && props.route.children.length ? <el-submenu index={props.route.redirect || props.route.path}>
                {{
                    title: () => <>
                        {Boolean(props.route.meta && isNotEmptyString(props.route.meta.icon)) && <i class={props.route.meta.icon} />}
                        {props.route.meta && <span>{props.t(props.route.meta.title)}</span>}
                    </>,
                    default: () => props.route.children.map((subroute: any, index: number) => RouteShow(subroute, isMobile.value) && <sub-menus route={subroute} key={subroute.redirect || subroute.path || index} depth={props.depth + 1} t={props.t} />)
                }}
            </el-submenu> : RouteShow(props.route, isMobile.value) && <el-menu-item index={props.route.path}>
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