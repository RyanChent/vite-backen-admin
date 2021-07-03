import { defineComponent } from 'vue'
import pcLogin from './pc'
import mobileLogin from './mobile'
import { useLoginProps } from '@/hooks/login'
import './style'

const LoginPage = defineComponent({
  name: 'Login',
  componentName: 'ManageLogin',
  components: {
    pcLogin,
    mobileLogin
  },
  setup() {
    return useLoginProps()
  },
  render() {
    const props = {
      onTabClick: this.tabClick,
      onLogin: this.userLogin,
      logining: this.logining
    }
    return this.isMobile ? (
      <mobile-login
        v-models={[
          [this.tab, 'tab'],
          [this.userObj, 'userObj']
        ]}
        {...props}
      />
    ) : (
      <pc-login
        v-models={[
          [this.tab, 'tab'],
          [this.userObj, 'userObj']
        ]}
        {...props}
      />
    )
  }
})

export default LoginPage
