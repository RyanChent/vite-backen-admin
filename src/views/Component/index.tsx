import { defineComponent, onActivated } from 'vue'
import UiRender from '@PC/UIRender'
import { useStore } from 'vuex'
import './style'

const ComponentPage = defineComponent({
  name: 'ComponentPage',
  componentName: 'ManageComponentPage',
  components: {
    UiRender: defineComponent(UiRender)
  },
  setup() {
    const store = useStore()
    onActivated(() => {
      store.dispatch('changeNavMode', 'horizontal')
      store.dispatch('changeCollapse', false)
    })
  },
  render() {
    return <ui-render />
  }
})

export default ComponentPage
