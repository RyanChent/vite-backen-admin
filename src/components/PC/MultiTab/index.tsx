import { t } from '@/lang/index.ts'
import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { isNotEmptyString } from '@/utils/types.ts'
import RightContextMenu from '@PC/ContextMenus/index.tsx'
import './style.less'

const useHandleTag = (router: any) => {
    const openRoutes = ref<any>([])
    const top = ref<any>(0)
    const left = ref<any>(0)
    const visible = ref<any>(false)
    const currentTag = ref<any>({ title: '', path: '' })

    const closeTag = (index: number, path: string) => {
        if (isNotEmptyString(path)) {
            openRoutes.value.splice(index, 1)
        }
        const lastIndex = Math.max(0, openRoutes.value.length - 1)
        router.replace(openRoutes.value[lastIndex]?.path || '/')
    }

    const rightClickTag = (e: MouseEvent, item: object) => {
        e.preventDefault()
        e.stopPropagation()
        const { clientX, clientY } = e
        top.value = clientY
        left.value = clientX
        currentTag.value = item
        visible.value = true
    }

    return {
        openRoutes,
        closeTag,
        rightClickTag,
        top,
        left,
        visible,
        currentTag
    }
}

const useHandleRightbutton = () => {
    const webPageFull = ref<any>(false)
    const togglePageFull = (pageClass: string) => {
        const page = document.querySelector(`.${pageClass}`) as HTMLElement
        page.classList.toggle('manage-page-full')
        nextTick(() => {
            webPageFull.value = !webPageFull.value
        })
    }
    return {
        webPageFull,
        togglePageFull
    }
}

const MultiTab = defineComponent({
    name: 'MultiTab',
    componentName: 'ManageMultiTab',
    __file: '@PC/MultiTab/index.tsx',
    components: {
        RightContextMenu
    },
    props: {
        multiTab: {
            type: Boolean,
            default: false
        },
        pageClass: {
            type: String,
            default: 'backen-admin-pc-content'
        }
    },
    setup(props) {
        const router = useRouter()
        const route = router.currentRoute
        const { openRoutes, top, left, visible, currentTag, closeTag, rightClickTag } = useHandleTag(router)
        const { webPageFull, togglePageFull } = useHandleRightbutton()
        const menus = [
            {
                title: 'close',
                click: () => {
                    if (openRoutes.value.length > 1) {
                        const currentIndex = openRoutes.value.findIndex((item: any) => item.path === currentTag.value.path)
                        const now = openRoutes.value[currentIndex]
                        const prev = openRoutes.value[currentIndex - 1]
                        openRoutes.value.splice(currentIndex, 1)
                        if (prev) {
                            now.path === route.value.path && router.replace(prev.path || '/')
                        }
                    }
                }
            },
            {
                title: 'close-right',
                click: () => {
                    const currentIndex = openRoutes.value.findIndex((item: any) => item.path === currentTag.value.path)
                    openRoutes.value = openRoutes.value.slice(0, currentIndex + 1)
                    router.replace(currentTag.value.path || '/')
                }
            },
            {
                title: 'close-other',
                click: () => {
                    openRoutes.value = [currentTag.value]
                    router.replace(currentTag.value.path || '/')
                }
            }
        ]

        watch(() => route.value.path, () => {
            const isDulipicate = openRoutes.value.some((item: any) => item.path === route.value.path)
            if (!isDulipicate && route.value.path !== '/login') {
                openRoutes.value.push({
                    title: route.value.meta?.title || '',
                    path: route.value.path
                })
            }
        }, { immediate: true })

        onBeforeUnmount(() => {
            const page = document.querySelector(`.${props.pageClass}`) as HTMLElement
            page.classList.remove('manage-page-full')
            webPageFull.value = false
        })
        return {
            openRoutes,
            closeTag,
            webPageFull,
            togglePageFull,
            rightClickTag,
            top,
            left,
            menus,
            visible,
            currentTag
        }
    },
    render() {
        return <section class="manage-head-multitab">
            <RightContextMenu
                v-model={[this.visible, 'visible']}
                {
                ...{
                    top: this.top,
                    left: this.left,
                    menus: this.menus
                }
                }
            />
            <div class="left-tags" >
                {this.openRoutes.map((item: { title: string, path: string }, index: number) =>
                    <el-tag
                        key={item.path}
                        closable={index > 0}
                        onClose={() => this.closeTag(index, item.path)}
                        onClick={() => this.$router.replace(item.path)}
                        onContextmenu={(e: MouseEvent) => this.rightClickTag(e, item)}
                        title={t(item.title)}
                        class={{
                            selected: this.$route.path === item.path
                        }}
                    >
                        {t(item.title)}
                    </el-tag>
                )}
            </div>
            <div class="right-buttons">
                <i
                    class={{
                        'el-icon': true,
                        iconfont: true,
                        'vite-icon-webfull-reset': this.webPageFull,
                        'vite-icon-webfull': !this.webPageFull
                    }}
                    title={this.webPageFull ? '还原' : '网页全屏'}
                    onClick={() => this.togglePageFull(this.pageClass)}
                />
            </div>
        </section >
    }
})

export default MultiTab