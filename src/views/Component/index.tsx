import { defineComponent } from 'vue'
import UiRender from '@PC/UIRender/index.tsx'
import './style.less'

const ComponentPage = defineComponent({
    name: 'ComponentPage',
    componentName: 'ManageComponentPage',
    components: {
        UiRender
    },
    render() {
        return <ui-render />
    }
})

export default ComponentPage