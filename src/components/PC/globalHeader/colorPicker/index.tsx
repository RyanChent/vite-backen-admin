import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { isNotEmptyString } from '@/utils/types'
import { changeColor, changeHexToRgba } from '@/utils/tool'

const useColorProps = (props: any, emit: any) => {
  const store = useStore()
  const color = computed({
    get() {
      let value = ''
      if (isNotEmptyString(props.color) && props.color.startsWith('#')) {
        value = props.color
      } else {
        value = store.state.config.primaryColor
      }
      document.body.style.setProperty('--primary-color', value)
      document.body.style.setProperty('--primary-bg-color', changeHexToRgba(changeColor(value, 35)))
      return value
    },
    set(value: string) {
      if (isNotEmptyString(value)) {
        isNotEmptyString(props.color) && emit('update:color', value)
        store.dispatch('changePrimaryColor', value)
        document.body.style.setProperty('--primary-color', value)
        document.body.style.setProperty(
          '--primary-bg-color',
          changeHexToRgba(changeColor(value, 35))
        )
      }
    }
  })
  return {
    color
  }
}

const colorPicker = defineComponent({
  name: 'ColorPicker',
  componentName: 'ManageColorPicker',
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }: any) {
    const { color } = useColorProps(props, emit)
    return {
      color
    }
  },
  render() {
    return <el-color-picker v-model={this.color} size="mini" />
  }
})

export default colorPicker
