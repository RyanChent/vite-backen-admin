import { defineComponent, resolveComponent, ref } from 'vue'
import './style'
const DialogPage = defineComponent({
    name: 'DialogPage',
    componentName: 'ManageDialogPage',
    setup() {
        const hasMaxMin = ref<boolean>(false)
        const ordinary = ref<boolean>(false)
        const dragModal = ref<boolean>(false)
        return {
            hasMaxMin,
            ordinary,
            dragModal
        }
    },
    render() {
        const Dialogs: any = resolveComponent('Dialogs')
        return <section class="dialogs-page-pc">
            <el-button onClick={() => { this.hasMaxMin = true }}>打开含最大化最小化弹窗</el-button>
            <Dialogs
                v-model={this.hasMaxMin}
                {...{
                    title: '最大最小化弹窗',
                    showMinimize: true,
                    showMaximize: true
                }}
            >
                <div>我是最大最小化弹窗</div>
            </Dialogs>
            <el-button onClick={() => { this.ordinary = true }}>打开弹窗</el-button>
            <Dialogs
                v-model={this.ordinary}
                {...{
                    title: '普通弹窗'
                }}
            >
                <div>我是普通弹窗</div>
            </Dialogs>
            <el-button onClick={() => { this.dragModal = true }}>打开能拖拽的弹窗</el-button>
            <Dialogs
                v-model={this.dragModal}
                {...{
                    title: '能拖拽的弹窗',
                    dragging: true
                }}
            >
                <div>我是能拖拽的弹窗</div>
            </Dialogs>
        </section>
    }
})

export default DialogPage