import { defineComponent, resolveComponent, computed } from 'vue'
import { isNotEmptyString } from '@/utils/types'

const ForgetPCPwd = defineComponent({
  name: 'ForgetPCPwd',
  componentName: 'ManageForgetPCPwd',
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
    const Steps: any = resolveComponent('Steps')
    return (this as any).active < this.steps.length ? (
      <Steps
        {...{
          steps: this.steps,
          'align-center': true,
          'show-footer': false,
          'permit-click': false,
          'finish-status': 'success'
        }}
        v-model={[this.active, 'active']}
      >
        {{
          step0: () => (
            <>
              <div class="row">
                <el-input
                  v-model={this.forgetParam.email}
                  placeholder="请输入邮箱"
                  clearable
                  prefix-icon="el-icon-message"
                />
              </div>
              <div class="row">
                <el-input
                  v-model={this.forgetParam.verify}
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-picture-outline-round"
                >
                  {{
                    suffix: () => (
                      <el-button
                        type="primary"
                        disabled={this.timeout > 0 && this.timeout < 60}
                        loading={this.loading}
                        onClick={(e: MouseEvent) => {
                          e.stopPropagation()
                          const Reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
                          const { email } = this.forgetParam
                          if (isNotEmptyString(email) && Reg.test(email)) {
                            this.$emit('get-captcha')
                          } else {
                            ;(this as any).$message.error('请检查邮箱是否合法')
                          }
                        }}
                      >
                        {this.timeout > 0 && this.timeout < 60
                          ? `剩余 ${this.timeout} 秒`
                          : '获取验证码'}
                      </el-button>
                    )
                  }}
                </el-input>
              </div>
              <div class="row" style="margin-top: 40px">
                <el-button
                  type="primary"
                  plain
                  round
                  style="min-width: 120px;"
                  onClick={() => this.$emit('reset-pwd')}
                >
                  重置密码
                </el-button>
              </div>
            </>
          ),
          step1: () => (
            <>
              <div class="row">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model={this.forgetParam.passwords}
                  placeholder="请输入密码"
                  show-password
                />
              </div>
              <div class="row">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model={this.forgetParam.confirm}
                  placeholder="请再次输入密码"
                  show-password
                />
              </div>
              <div class="row" style="margin-top: 40px">
                <el-button
                  type="primary"
                  plain
                  round
                  loading={this.loading}
                  style="min-width: 120px;"
                  onClick={() => this.$emit('confirm')}
                >
                  确定
                </el-button>
              </div>
            </>
          )
        }}
      </Steps>
    ) : (
      <el-result icon="success" title="修改成功" subTitle="密码已重置，正在登陆中..." />
    )
  }
})

export default ForgetPCPwd
