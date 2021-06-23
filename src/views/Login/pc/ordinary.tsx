import { defineComponent } from 'vue'
import { t } from '@/lang'

const fields = [
  {
    key: 'username',
    icon: 'el-icon-s-custom'
  },
  {
    key: 'passwords',
    icon: 'el-icon-lock'
  },
  {
    key: 'verify',
    icon: 'el-icon-picture-outline-round'
  }
]

const ordinary = defineComponent({
  name: 'OrdinaryLogin',
  componentName: 'ManageOrdinaryLogin',
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    logining: {
      type: Boolean,
      default: false
    }
  },
  emits: ['login'],
  setup(props: any, { emit }: any) {
    const keyupToLogin = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.code.toLowerCase().includes('enter')) {
        emit('login')
      }
    }
    return {
      keyupToLogin
    }
  },
  render() {
    return (
      <>
        {fields.map((field: { key: string; icon: string }) => (
          <div class="row" key={field.key}>
            <el-input
              prefix-icon={field.icon}
              v-model={this.user[field.key]}
              onKeyup={this.keyupToLogin}
              placeholder={t('please.input.something') + t(field.key)}
              show-password={field.key === 'passwords'}
            />
          </div>
        ))}
        <div
          class="row"
          style={{
            marginBottom: '-20px',
            marginTop: '0px',
            justifyContent: 'space-between'
          }}
        >
          <el-checkbox v-model={this.user.noLogin}>7天内免登陆</el-checkbox>
          <el-button
            type="text"
            icon="el-icon-question"
            onClick={() => this.$router.push('/forget')}
          >
            忘记密码
          </el-button>
        </div>
        <div class="row">
          <el-button
            loading={this.logining}
            onClick={() => this.$emit('login')}
            class="special-button"
          >
            {t('login')}
          </el-button>
          <el-button
            class="special-button"
            onClick={() => this.$router.push('/register')}
          >
            {t('register')}
          </el-button>
        </div>
      </>
    )
  }
})

export default ordinary
