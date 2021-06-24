import { defineComponent } from 'vue'

const MobileRegister = defineComponent({
  name: 'MobileRegister',
  componentName: 'ManageMobileRegister',
  props: {
    registerParam: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm'],
  setup() {
    return {}
  },
  render() {
    return <div>123</div>
  }
})

export default MobileRegister
