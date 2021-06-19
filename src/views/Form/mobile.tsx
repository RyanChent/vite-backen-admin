import { defineComponent } from 'vue'

const MobileFormPage = defineComponent({
  name: 'MobileFormPage',
  componentName: 'ManageMobileFormPage',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup() {
    return {}
  },
  render() {
    return <div>123</div>
  }
})

export default MobileFormPage
