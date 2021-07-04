import { defineComponent } from 'vue'
import './style'

const ToolBar = defineComponent({
  name: 'ToolBar',
  componentName: 'ManageToolBar',
  props: {
    barList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }: any) {},
  render() {
    return <div>123</div>
  }
})

export default ToolBar
