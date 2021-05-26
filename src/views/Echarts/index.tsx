import { defineComponent, resolveComponent } from 'vue'
import './style'
const ChartsPage = defineComponent({
    name: 'ChartsPage',
    componentName: 'ManageChartsPage',
    setup() {

    },
    render() {
        const Charts = resolveComponent('Echarts') as any
        return <Charts />
    }
})

export default ChartsPage