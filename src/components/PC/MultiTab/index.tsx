import { t } from '@/lang/index.ts'
import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { isNotEmptyString } from '@/utils/types.ts'
import './style.less'

const MultiTab = defineComponent({
    name: 'MultiTab',
    componentName: 'ManageMultiTab',
    props: {
        multiTab: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const openRoutes = ref<any>([])
        const router = useRouter()
        const route = router.currentRoute
        const webPageFull = ref<any>(false)
        watch(() => route.value.path, () => {
            const isDulipicate = openRoutes.value.some((item: any) => item.path === route.value.path)
            if (!isDulipicate && route.value.path !== '/login') {
                openRoutes.value.push({
                    title: route.value.meta?.title || '',
                    path: route.value.path
                })
            }
        }, { immediate: true })
        const closeTag = (index: number, path: string) => {
            if (isNotEmptyString(path)) {
                openRoutes.value.splice(index, 1)
            }
            const lastIndex = Math.max(0, openRoutes.value.length - 1)
            clickTag(openRoutes.value[lastIndex]?.path)
        }
        const clickTag = (path: string) => {
            router.replace(path)
        }
        const togglePageFull = () => {
            const page = document.querySelector('.backen-admin-pc-content') as HTMLElement
            page.classList.toggle('manage-page-full')
            nextTick(() => {
                webPageFull.value = !webPageFull.value
            })
        }
        onBeforeUnmount(() => {
            const page = document.querySelector('.backen-admin-pc-content') as HTMLElement
            page.classList.remove('manage-page-full')
            webPageFull.value = false
        })
        return {
            openRoutes,
            closeTag,
            clickTag,
            webPageFull,
            togglePageFull
        }
    },
    render() {
        return <section class="manage-head-multitab">
            <div class="left-tags">
                {this.openRoutes.map((item: { title: string, path: string }, index: number) =>
                    <el-tag
                        key={item.path}
                        closable={index > 0}
                        onClose={() => this.closeTag(index, item.path)}
                        onClick={() => this.clickTag(item.path)}
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
                    onClick={this.togglePageFull}
                />
            </div>
        </section>
    }
})

export default MultiTab