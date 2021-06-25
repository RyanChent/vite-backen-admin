import { defineComponent, ref } from 'vue'
import { t } from '@/lang'
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
    return {
      password: ref<string>('password'),
      confirm: ref<string>('password')
    }
  },
  render() {
    return (
      <div class="manage-mobile-register">
        <div class="row">
          <van-field
            left-icon="envelop-o"
            clearable
            colon
            center
            required
            v-model={this.registerParam.email}
            placeholder="请输入邮箱"
            onClear={() => (this.registerParam.email = '')}
          />
        </div>
        <div class="row">
          <van-field
            left-icon="user-circle-o"
            clearable
            colon
            center
            required
            v-model={this.registerParam.username}
            placeholder={t('please.input.something') + t('username')}
            onClear={() => (this.registerParam.username = '')}
          />
        </div>
        <div class="row">
          <van-field
            clearable
            colon
            center
            required
            v-model={this.registerParam.passwords}
            type={this.password}
            placeholder={t('please.input.something') + t('passwords')}
            onClear={() => (this.registerParam.passwords = '')}
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
            v-model={this.registerParam.confirm}
            type={this.password}
            placeholder={t('please.input.something')}
            onClear={() => (this.registerParam.confirm = '')}
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
        <div class="row">
          <van-button
            type="primary"
            round
            color="linear-gradient(102deg,#50bad1 0%,#00779f 100%),linear-gradient(#00789f,#00789f)"
            text="确定"
            loading={this.loading}
            onTouchstart={() => this.$emit('confirm')}
          />
        </div>
      </div>
    )
  }
})

export default MobileRegister
