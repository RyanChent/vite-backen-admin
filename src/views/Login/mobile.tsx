import { defineComponent, computed, ref, inject } from 'vue'
import { t } from '@/lang'
const mobileLoginPage = defineComponent({
  name: 'mobileLogin',
  componentName: 'ManageMobileLogin',
  props: {
    tab: String,
    userObj: {
      type: Object,
      default: () => ({})
    },
    logining: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }: any) {
    const language = computed({
      get() {
        return props.tab
      },
      set(value) {
        emit('update:tab', value)
      }
    })
    const user = computed<any>({
      get() {
        return props.userObj
      },
      set(value) {
        emit('update:userObj', value)
      }
    })
    const [verify, useHandleVerify]: any = inject('refreshCaptcha')
    return {
      language,
      user,
      verify,
      useHandleVerify,
      password: ref<any>('password')
    }
  },
  render() {
    return (
      <div style="display: flex; flex-direction: column">
        <div class="row">
          <van-radio-group
            v-model={this.language}
            onChange={() => this.$emit('tabClick')}
            direction="horizontal"
          >
            <van-radio name="zh-cn">{t('zh-cn')}</van-radio>
            <van-radio name="en">{t('en')}</van-radio>
          </van-radio-group>
        </div>
        <div class="row" style="margin-top: 20px;">
          <van-field
            left-icon="user-circle-o"
            clearable
            colon
            center
            required
            v-model={this.user.username}
            placeholder={t('please.input.something') + t('username')}
            onClear={() => (this.user.username = '')}
          />
        </div>
        <div class="row">
          <van-field
            clearable
            colon
            center
            required
            v-model={this.user.passwords}
            type={this.password}
            placeholder={t('please.input.something') + t('passwords')}
            onClear={() => (this.user.passwords = '')}
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
            left-icon="qr"
            clearable
            colon
            center
            required
            v-model={this.user.verify}
            placeholder={t('please.input.something') + t('verify')}
            onClear={() => (this.user.verify = '')}
          >
            {{
              button: () => (
                <span
                  v-html={this.verify}
                  title="验证码"
                  onTouchstart={(e) => {
                    e.stopPropagation()
                    this.useHandleVerify()
                  }}
                />
              )
            }}
          </van-field>
        </div>
        <div
          class="row"
          style={{
            marginBottom: '-20px',
            marginTop: '5px',
            justifyContent: 'space-between'
          }}
        >
          <van-checkbox v-model={this.user.noLogin} shape="square" icon-size="16px">
            7天内免登陆
          </van-checkbox>
          <div onTouchstart={() => this.$router.push('/forget')} class="forget-pwd">
            <van-icon name="question" />
            忘记密码
          </div>
        </div>
        <div class="row">
          <van-button
            color="linear-gradient(102deg,#50bad1 0%,#00779f 100%),linear-gradient(#00789f,#00789f)"
            text={t('login')}
            round
            loading={this.logining}
            loading-text="登陆中..."
            icon="sign"
            onTouchstart={() => this.$emit('login', (this as any).$toast)}
          />
          <van-button
            color="linear-gradient(102deg,#50bad1 0%,#00779f 100%),linear-gradient(#00789f,#00789f)"
            text={t('register')}
            round
            icon="sign"
            style="margin-left: 20px"
            onTouchstart={() => this.$router.push('/register')}
          />
        </div>
      </div>
    )
  }
})

export default mobileLoginPage
