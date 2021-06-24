import { defineComponent } from 'vue'
import PCRegister from './pc'
import MobileRegister from './mobile'
import { useRegisterProps } from '@/hooks/login'
import './style'

const Register = defineComponent({
  name: 'Register',
  componentName: 'ManageRegister',
  components: {
    PCRegister,
    MobileRegister
  },
  setup() {
    return useRegisterProps()
  },
  render() {
    return (
      <div class="manage-register-info">
        <el-page-header
          icon="el-icon-arrow-left"
          class={{
            'mobile-page-header': this.isMobile
          }}
          onBack={this.$router.back}
        />
        {!!this.isMobile ? (
          <MobileRegister
            {...{
              registerParam: this.param,
              loading: this.loading,
              onConfirm: () => this.registerConfirm(this.$message.error)
            }}
          />
        ) : (
          <PCRegister
            {...{
              registerParam: this.param,
              loading: this.loading,
              onConfirm: () => this.registerConfirm(this.$message.error)
            }}
          />
        )}
      </div>
    )
  }
})

export default Register
