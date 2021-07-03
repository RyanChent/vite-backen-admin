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
    const props = {
      registerParam: this.param,
      loading: this.loading,
      onConfirm: () => this.registerConfirm(this.isMobile ? this.$toast.fail : this.$message.error)
    }
    return (
      <div class="manage-register-info">
        <el-page-header
          icon="el-icon-arrow-left"
          class={{
            'mobile-page-header': this.isMobile
          }}
          onBack={this.$router.back}
        />
        {!!this.isMobile ? <MobileRegister {...props} /> : <PCRegister {...props} />}
      </div>
    )
  }
})

export default Register
