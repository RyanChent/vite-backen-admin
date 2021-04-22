import { defineComponent, ref, resolveComponent } from 'vue'

const PCHome = defineComponent({
    name: 'PCHome',
    componentName: 'ManagePCHome',
    setup() {
        const hasMaxMin = ref(false)
        const ordinary = ref(false)
        const Dialogs = resolveComponent('Dialogs') as any
        return () => <section class="dialogs-page-pc">
            <el-button onClick={() => { hasMaxMin.value = true }}>打开含最大化最小化弹窗</el-button>
            <Dialogs
                ElDialogProps={{
                    'model-value': hasMaxMin.value,
                    title: '最大最小化弹窗'
                }}
                showMinimize
                showMaximize
                onClosed={(visible: boolean) => {
                    hasMaxMin.value = visible
                }}
            >
                <div>我是最大最小化弹窗</div>
            </Dialogs>
            <el-button onClick={() => { ordinary.value = true }}>打开弹窗</el-button>
            <Dialogs
                ElDialogProps={{
                    'model-value': ordinary.value,
                    title: '普通弹窗'
                }}
                onClosed={(visible: boolean) => {
                    ordinary.value = visible
                }}
            >
                <div>我是普通弹窗</div>
            </Dialogs>
        </section>
    }
})

export default PCHome