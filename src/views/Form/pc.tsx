import { defineComponent, resolveComponent, ref, computed } from 'vue'
import formDemo from '@/data/formDemo'

const PCFormPage = defineComponent({
  name: 'PCFormPage',
  componentName: 'ManagePCFormPage',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props: any, { emit }: any) {
    return {
      model: computed({
        get() {
          return props.modelValue
        },
        set(value) {
          emit('update:modelValue', value)
        }
      }),
      formItems: ref<any[]>(formDemo)
    }
  },
  render() {
    const Form: any = resolveComponent('Form')
    return (
      <Form
        v-model={[this.model, 'model']}
        vModel={[this.formItems, 'formItems']}
        dynamic
        chaseError
      />
    )
  }
})

export default PCFormPage
