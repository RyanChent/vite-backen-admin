import { defineComponent, ref, resolveComponent } from 'vue'

const PCHome = defineComponent({
    name: 'PCHome',
    componentName: 'ManagePCHome',
    setup() {
        const hasMaxMin = ref(false)
        const ordinary = ref(false)
        const dragModal = ref(false)
        const Dialogs = resolveComponent('Dialogs') as any
        return () => <section class="dialogs-page-pc">
            <el-button onClick={() => { hasMaxMin.value = true }}>打开含最大化最小化弹窗</el-button>
            <Dialogs
                v-model={hasMaxMin.value}
                {...{
                    title: '最大最小化弹窗',
                    showMinimize: true,
                    showMaximize: true
                }}
            >
                <div>我是最大最小化弹窗</div>
            </Dialogs>
            <el-button onClick={() => { ordinary.value = true }}>打开弹窗</el-button>
            <Dialogs
                v-model={ordinary.value}
                {...{
                    title: '普通弹窗'
                }}
            >
                <div>我是普通弹窗</div>
            </Dialogs>
            <el-button onClick={() => { dragModal.value = true }}>打开能拖拽的弹窗</el-button>
            <Dialogs
                v-model={dragModal.value}
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

export default PCHome