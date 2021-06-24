import { defineComponent, computed, resolveComponent } from 'vue'
import { isNotEmptyString } from '@/utils/types'

const ForgetMobilePwd = defineComponent({
  name: 'ForgetMobilePwd',
  componentName: 'ManageForgetMobilePwd',
  props: {
    timeout: {
      type: Number,
      default: 60
    },
    forgetParam: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ['get-captcha', 'reset-pwd', 'update:modelValue', 'confirm'],
  setup(props: any, { emit }: any) {
    return {
      active: computed({
        get() {
          return props.modelValue
        },
        set(value) {
          emit('update:modelValue', value)
        }
      }),
      steps: [
        {
          title: '01',
          icon: 'el-icon-message',
          description: '验证邮箱'
        },
        {
          title: '02',
          icon: 'el-icon-edit',
          description: '重置密码'
        }
      ]
    }
  },
  render() {
    const MobileSteps: any = resolveComponent('MobileSteps')
    return (
      <MobileSteps
        v-model={[this.active, 'active']}
        {...{
          'show-footer': false,
          'permit-click': false,
          steps: this.steps
        }}
      >
        {{
          step0: () => <div>123</div>,
          step1: () => <div>234</div>
        }}
      </MobileSteps>
    )
  }
})

export default ForgetMobilePwd
