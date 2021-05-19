import { defineComponent, computed, ref, watch } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isNotEmptyString } from "@/utils/types.ts";
import SubMenus from "./subMenus/index.tsx";
import { t } from "@/lang/index.ts";

const Menus = defineComponent({
    name: "Menus",
    componentName: "ManageMenus",
    components: {
        SubMenus,
    },
    props: {
        collapse: Boolean,
    },
    setup(props) {
        const store = useStore()
        const routes = computed(() => store.state.permission.routes);
        const router = useRouter()
        const route = router.currentRoute
        const defaultIndex = ref(
            isNotEmptyString(routes.value[0].redirect) ? routes.value[0].redirect : routes.value[0].path
        );
        /* 监听route变动 */
        watch(() => route.value.path, () => {
            defaultIndex.value = route.value.path
        }, { immediate: true })

        const select = (index: string) => {
            if (['http', '//'].some(key => index.startsWith(key))) {
                location.href = index
            } else {
                router.replace(index)
            }
        }
        /* 挂载el-menus */
        return () => <el-menu defaultActive={defaultIndex.value} onSelect={select} unique-opened collapse={props.collapse}>
            {routes.value.map((route: any, index: number) => {
                if (Array.isArray(route.children) && route.children.length) {
                    return <sub-menus key={route.redirect || route.path || index} route={route} t={t} />
                } else {
                    return !route.hidden && <el-menu-item key={route.path || index} index={route.path}>
                        {{
                            title: () => <>
                                {Boolean(route.meta && isNotEmptyString(route.meta.icon)) && <i class={route.meta.icon} />}
                                {t(route.meta.title)}
                            </>
                        }}
                    </el-menu-item>
                }
            })}
        </el-menu>
    },
})

export default Menus