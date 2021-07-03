import { defineComponent } from 'vue'
import PCForget from './pc'
import MobileForget from './mobile'
import { useForgetProps } from '@/hooks/login'
import './style'

const ForgetPwd = defineComponent({
  name: 'ForgetPwd',
  componentName: 'ManageForgetPwd',
  components: {
    PCForget,
    MobileForget
  },
  setup() {
    return useForgetProps()
  },
  render() {
    const props = {
      timeout: this.timeout,
      forgetParam: this.param,
      loading: this.loading,
      onGetCaptcha: () => this.handleGetCaptcha(this.param.email),
      onResetPwd: () =>
        this.handleShowResetPwd(this.isMobile ? this.$toast.fail : this.$message.error),
      onConfirm: () => this.handleResetPwd(this.isMobile ? this.$toast.fail : this.$message.error)
    }
    return (
      <div class="manage-forget-password">
        <el-page-header
          icon="el-icon-arrow-left"
          onBack={this.handleBack}
          class={{
            'mobile-page-header': this.isMobile
          }}
        />
        {this.isMobile ? (
          <MobileForget v-model={this.active} {...props} />
        ) : (
          <PCForget v-model={this.active} {...props} />
        )}
      </div>
    )
  }
})

export default ForgetPwd
