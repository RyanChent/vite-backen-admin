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
      formItems: ref<any[]>(formDemo),
      formMethods: ref<any>({})
    }
  },
  render() {
    const Form: any = resolveComponent('Form')
    return (
      <Form
        v-models={[
          [this.model, 'model'],
          [this.formItems, 'formItems']
        ]}
        dynamic
        chaseError
        onFormMethods={(methods: any) => (this.formMethods = methods)}
      >
        {{
          footer: () => (
            <>
              <el-button
                type="success"
                icon="el-icon-check"
                plain
                round
                onClick={() => {
                  this.formMethods.validateChaseError((success: boolean, fields: any) => {
                    console.log(success, fields, '在这里可以调接口')
                  })
                }}
              >
                提交
              </el-button>
            </>
          )
        }}
      </Form>
    )
  }
})

export default PCFormPage
