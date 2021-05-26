import { defineComponent, inject, ref, reactive } from 'vue'
import PCSteps from './pc'
import MobileSteps from './mobile'
import getSteps from '@/data/steps'
import './style'

const StepsPage = defineComponent({
    name: 'StepsPage',
    componentName: 'ManageStepsPage',
    setup() {
        const isMobile = inject<any>('isMobile')
        const active = ref<number>(0)
        const steps = reactive((getSteps as Function)())
        return {
            active,
            steps,
            isMobile
        }
    },
    render() {
        return !!this.isMobile ? <MobileSteps v-model={this.active} steps={this.steps} /> : <PCSteps v-model={this.active} steps={this.steps} />
    }
})

export default StepsPage