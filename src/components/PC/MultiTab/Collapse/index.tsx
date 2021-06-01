import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const Collapse = defineComponent({
  name: 'Collapse',
  componentName: 'ManagePCCollapse',
  setup() {
    const store = useStore()
    const route = useRoute()
    const collapse = computed({
      get() {
        return store.state.config.collapse
      },
      set(value) {
        store.dispatch('changeCollapse', value)
      }
    })
    const clickCollapse = () => {
      if (route.path === '/component') {
        collapse.value = true
      } else {
        collapse.value = !collapse.value
      }
    }
    return {
      collapse,
      clickCollapse
    }
  },
  render() {
    return (
      <el-button
        type="text"
        icon={this.collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'}
        title={this.collapse ? '展开' : '折叠'}
        onClick={this.clickCollapse}
        class="collapse-button"
      />
    )
  }
})

export default Collapse
