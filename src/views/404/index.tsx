import { defineComponent, onMounted, onUnmounted, resolveComponent } from 'vue'
import './style.less'

const _404Page = defineComponent({
    name: '404Page',
    componentName: 'Manage404Page',
    setup() {
        onMounted(() => {
            document.oncontextmenu = () => false
        })
        onUnmounted(() => {
            document.oncontextmenu = () => true
        })
        return {
        }
    },
    render() {
        const SvgIcon: any = resolveComponent('SvgIcon')
        return <section class="manage-404-page">
            <div class="left-svg">
                <SvgIcon name="404" />
            </div>
            <div class="right-desc">
                <h1>404</h1>
                <h2>UH OH! 页面丢失</h2>
                <p>您所寻找的页面不存在。你可以点击下面的按钮，返回上一页。</p>
                <el-button class="back-button primary" onClick={this.$router.back}>返回上一页</el-button>
            </div>
        </section>
    }
})

export default _404Page