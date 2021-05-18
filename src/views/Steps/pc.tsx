import { defineComponent, resolveComponent, ref, reactive } from 'vue'
import getSteps from '@/data/steps.tsx'
const PCSteps = defineComponent({
    name: 'PCSteps',
    componentName: "ManagePCSteps",
    setup() {
        const active = ref<number>(0)
        const steps = reactive((getSteps as Function)())
        return {
            active,
            steps
        }
    },
    render() {
        const Steps: any = resolveComponent('Steps')
        const message = (this as any).$message
        return <Steps
            steps={this.steps}
            align-center
            finish-status="success"
            v-model={[this.active, 'active']}
            class="manage-pc-steps-demo"
            confirm={() => message.success('我到底了')}
        >
            {
                new Array(this.steps.length).fill(null).reduce((self: any, item: undefined, index: number) => {
                    self[`step${index}`] = () => <div key={index} class="test-panel">测试面板{index}</div>
                    return self
                }, {})
            }
        </Steps>
    }
})

export default PCSteps