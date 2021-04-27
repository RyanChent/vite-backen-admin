import { defineComponent, computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
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
        const router = computed(() => store.state.permission.routes);
        const route = useRoute()
        const defaultIndex = ref(
            isNotEmptyString(router.value[0].redirect) ? router.value[0].redirect : router.value[0].path
        );
        /* 监听route变动 */
        watch(() => route.path, () => {
            defaultIndex.value = route.path
        }, { immediate: true })
        /* 挂载el-menus */
        return () => <el-menu defaultActive={defaultIndex.value} router unique-opened collapse={props.collapse}>
            {router.value.map((route: any, index: number) => {
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