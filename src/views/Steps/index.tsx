import { defineComponent, inject } from 'vue'
import PCSteps from './pc'
import MobileSteps from './mobile'
import './style.less'

const StepsPage = defineComponent({
    name: 'StepsPage',
    componentName: 'ManageStepsPage',
    setup() {
        const isMobile = inject<any>('isMobile')
        return () => !!isMobile.value ? <MobileSteps /> : <PCSteps />
    }
})

export default StepsPage