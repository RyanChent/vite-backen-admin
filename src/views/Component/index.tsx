import { defineComponent, onActivated } from 'vue'
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
      if (store.state.config.navMode === 'vertical') {
        store.dispatch('changeCollapse', true)
      }
    })
  },
  render() {
    return <ui-render />
  }
})

export default ComponentPage
