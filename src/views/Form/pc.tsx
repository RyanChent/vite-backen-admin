import { defineComponent, resolveComponent, ref } from 'vue'
import formDemo from '@/data/formDemo'

const PCFormPage = defineComponent({
  name: 'PCFormPage',
  componentName: 'ManagePCFormPage',
  setup() {
    return {
      model: ref<any>({
        test1: 123,
        test2: [],
        test3: '',
        test4: [],
        test5: ''
      }),
      formItems: ref<any[]>(formDemo)
    }
  },
  render() {
    const Form: any = resolveComponent('Form')
    return <Form v-model={[this.model, 'model']} vModel={[this.formItems, 'formItems']} dynamic />
  }
})

export default PCFormPage
