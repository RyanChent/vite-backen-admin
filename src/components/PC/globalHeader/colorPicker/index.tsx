import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { isNotEmptyString } from '@/utils/types'
import { changeColor, changeHexToRgba } from '@/utils/tool'

const useColorProps = (props: any, store: any) => {
  const color = computed(({
    get() {
      return store.state.config.primaryColor
    },
    set(value: string) {
      if (isNotEmptyString(value)) {
        store.dispatch('changePrimaryColor', value)
        document.body.style.setProperty('--primary-color', value)
        document.body.style.setProperty('--primary-bg-color', changeHexToRgba(changeColor(value, 35)))
      }
    }
  }))
  return {
    color
  }
}

const colorPicker = defineComponent({
  name: 'ColorPicker',
  componentName: 'ManageColorPicker',
  setup(props) {
    const store = useStore()
    const { color } = useColorProps(props, store)
    return {
      color
    }
  },
  render() {
    return <el-color-picker
      v-model={this.color}
      size="small"
    />
  }
})

export default colorPicker
