import { defineComponent, KeepAlive, onActivated, onDeactivated } from 'vue'
import UiRender from '@PC/UIRender'
import { useStore } from 'vuex'
import './style'

const ComponentPage = defineComponent({
  name: 'ComponentPage',
  componentName: 'ManageComponentPage',
  components: {
    UiRender
  },
  setup() {
    const store = useStore()
    onActivated(() => {
      store.dispatch('changeCollapse', true)
    })
    onDeactivated(() => {
      store.dispatch('changeCollapse', false)
    })
  },
  render() {
    return <ui-render />
  }
})

export default ComponentPage
