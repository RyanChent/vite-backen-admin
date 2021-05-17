import { defineComponent, resolveComponent } from 'vue'
import getSteps from '@/data/steps.tsx'
const PCSteps = defineComponent({
    name: 'PCSteps',
    componentName: "ManagePCSteps",
    setup() {
        return {

        }
    },
    render() {
        const Steps = resolveComponent('Steps') as any
        return <Steps steps={(getSteps as Function)()} align-center/>
    }
})

export default PCSteps