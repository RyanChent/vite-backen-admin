import { defineComponent, computed, h } from 'vue'
import { t } from '@/lang'

const lanList = ['zh-cn', 'en']

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

const PCLoginPage = defineComponent({
  name: 'PCLogin',
  componentName: 'ManagePCLogin',
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
    const keyupToLogin = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.code.toLowerCase().includes('enter')) {
        emit('login')
      }
    }
    return {
      language: computed({
        get() {
          return props.tab
        },
        set(value) {
          emit('update:tab', value)
        }
      }),
      user: computed<any>({
        get() {
          return props.userObj
        },
        set(value) {
          emit('update:userObj', value)
        }
      }),
      keyupToLogin
    }
  },
  render() {
    return (
      <section class="manage-pc-login">
        <header class="login-header">
          <img src="/assets/logo.png" />
          <span>vite-backen-admin</span>
        </header>
        <div class="login-form">
          {new Array(8).fill(<span class="shinning" />)}
          <div class="row" style="justify-content: flex-end">
            <el-dropdown
              trigger="click"
              size="small"
              onCommand={(language: string) => {
                this.language = language
                this.$emit('tabClick')
              }}
            >
              {{
                default: () => <i class="iconfont vite-icon-i18n lan-select" />,
                dropdown: () => (
                  <el-dropdown-menu>
                    {lanList.map((lan) => (
                      <el-dropdown-item command={lan} key={lan}>
                        <span
                          class={{
                            primary: this.language === lan
                          }}
                          v-text={t(lan)}
                        />
                      </el-dropdown-item>
                    ))}
                  </el-dropdown-menu>
                )
              }}
            </el-dropdown>
          </div>
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
            <el-button type="text" icon="el-icon-question">
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
            <el-button class="special-button">{t('register')}</el-button>
          </div>
        </div>
      </section>
    )
  }
})

export default PCLoginPage
