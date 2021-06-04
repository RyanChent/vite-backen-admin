import { defineComponent, resolveComponent } from 'vue'
import './style'
const ChartsPage = defineComponent({
  name: 'ChartsPage',
  componentName: 'ManageChartsPage',
  setup() {
    return {}
  },
  render() {
    const Charts: any = resolveComponent('Echarts')
    return <Charts domId="vite-echarts" />
  }
})

export default ChartsPage
