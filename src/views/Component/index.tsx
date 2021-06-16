import { defineComponent, onActivated, onDeactivated } from 'vue'
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
    let navMode: undefined | string
    let collapse: undefined | boolean
    onActivated(() => {
      navMode = store.state.config.navMode
      collapse = store.state.config.collapse
      store.dispatch('changeNavMode', 'horizontal')
      store.dispatch('changeCollapse', false)
    })
    onDeactivated(() => {
      store.dispatch('changeNavMode', navMode)
      store.dispatch('changeCollapse', collapse)
    })
  },
  render() {
    return <ui-render />
  }
})

export default ComponentPage
