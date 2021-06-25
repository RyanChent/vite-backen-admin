import { defineComponent, computed, resolveComponent, ref } from 'vue'
import { isNotEmptyString } from '@/utils/types'
import { t } from '@/lang'

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
      password: ref<string>('password'),
      confirm: ref<string>('password'),
      steps: [
        {
          title: () => <p style="margin-left: -10px;">1.验证邮箱</p>,
          icon: () => <van-icon name="envelop-o" />
        },
        {
          title: () => <p style="margin-right: -10px;">2.重置密码</p>,
          icon: () => <van-icon name="closed-eye" />
        }
      ]
    }
  },
  render() {
    const MobileSteps: any = resolveComponent('MobileSteps')
    return (this as any).active < this.steps.length ? (
      <MobileSteps
        v-model={[this.active, 'active']}
        {...{
          'show-footer': false,
          'permit-click': false,
          steps: this.steps
        }}
      >
        {{
          step0: () => (
            <>
              <div class="row">
                <van-field
                  left-icon="envelop-o"
                  clearable
                  colon
                  center
                  required
                  v-model={this.forgetParam.email}
                  placeholder="请输入邮箱"
                  onClear={() => (this.forgetParam.email = '')}
                />
              </div>
              <div class="row">
                <van-field
                  left-icon="qr"
                  clearable
                  colon
                  center
                  required
                  v-model={this.forgetParam.verify}
                  placeholder="请输入验证码"
                  onClear={() => (this.forgetParam.verify = '')}
                >
                  {{
                    button: () => (
                      <van-button
                        type="primary"
                        disabled={this.timeout > 0 && this.timeout < 60}
                        loading={this.loading}
                        loading-text={`剩余 ${this.timeout} 秒`}
                        icon="sign"
                        size="small"
                        text="获取验证码"
                        onClick={(e: TouchEvent) => {
                          e.stopPropagation()
                          const Reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
                          const { email } = this.forgetParam
                          if (isNotEmptyString(email) && Reg.test(email)) {
                            this.$emit('get-captcha')
                          } else {
                            ;(this as any).$toast.fail('邮箱不合法')
                          }
                        }}
                      />
                    )
                  }}
                </van-field>
              </div>
              <div class="row">
                <van-button
                  type="primary"
                  round
                  color="linear-gradient(102deg,#50bad1 0%,#00779f 100%),linear-gradient(#00789f,#00789f)"
                  text="重置密码"
                  onTouchstart={() => this.$emit('reset-pwd')}
                />
              </div>
            </>
          ),
          step1: () => (
            <>
              <div class="row">
                <van-field
                  clearable
                  colon
                  center
                  required
                  v-model={this.forgetParam.passwords}
                  type={this.password}
                  placeholder={t('please.input.something') + t('passwords')}
                  onClear={() => (this.forgetParam.passwords = '')}
                >
                  {{
                    'left-icon': () => (
                      <van-icon
                        name={this.password === 'password' ? 'closed-eye' : 'eye-o'}
                        onTouchstart={(e: TouchEvent) => {
                          e.stopPropagation()
                          this.password = this.password === 'password' ? 'text' : 'password'
                        }}
                      />
                    )
                  }}
                </van-field>
              </div>
              <div class="row">
                <van-field
                  clearable
                  colon
                  center
                  required
                  v-model={this.forgetParam.confirm}
                  type={this.password}
                  placeholder={t('please.input.something')}
                  onClear={() => (this.forgetParam.confirm = '')}
                >
                  {{
                    'left-icon': () => (
                      <van-icon
                        name={this.confirm === 'password' ? 'closed-eye' : 'eye-o'}
                        onTouchstart={(e: TouchEvent) => {
                          e.stopPropagation()
                          this.confirm = this.confirm === 'password' ? 'text' : 'password'
                        }}
                      />
                    )
                  }}
                </van-field>
              </div>
              <div class="row" style="margin-top: 40px">
                <van-button
                  type="primary"
                  round
                  color="linear-gradient(102deg,#50bad1 0%,#00779f 100%),linear-gradient(#00789f,#00789f)"
                  text="确定"
                  loading={this.loading}
                  onTouchstart={() => this.$emit('confirm')}
                />
              </div>
            </>
          )
        }}
      </MobileSteps>
    ) : (
      <el-result icon="success" title="修改成功" subTitle="密码已重置，正在登陆中..." />
    )
  }
})

export default ForgetMobilePwd
