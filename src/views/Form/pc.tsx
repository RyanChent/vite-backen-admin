import { defineComponent, resolveComponent, ref } from 'vue'

const PCFormPage = defineComponent({
  name: 'PCFormPage',
  componentName: 'ManagePCFormPage',
  setup() {
    return {
      model: ref<any>({
        test1: 123
      }),
      formItems: ref<any[]>([
        {
          label: '测试1',
          content: 'el-input',
          prop: 'test1',
          required: true,
          attr: {}
        }
      ])
    }
  },
  render() {
    const Form: any = resolveComponent('Form')
    return <Form v-model={[this.model, 'model']} vModel={[this.formItems, 'formItems']} dynamic />
  }
})

export default PCFormPage
