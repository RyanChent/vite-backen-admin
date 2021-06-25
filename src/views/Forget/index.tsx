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
    return (
      <div class="manage-forget-password">
        <el-page-header
          icon="el-icon-arrow-left"
          onBack={this.handleBack}
          class={{
            'mobile-page-header': this.isMobile
          }}
        />
        {!!this.isMobile ? (
          <MobileForget
            v-model={this.active}
            {...{
              timeout: this.timeout,
              forgetParam: this.param,
              loading: this.loading,
              onGetCaptcha: () => this.handleGetCaptcha(this.param.email),
              onResetPwd: () => this.handleShowResetPwd(this.$toast.fail),
              onConfirm: () => this.handleResetPwd(this.$toast.fail)
            }}
          />
        ) : (
          <PCForget
            v-model={this.active}
            {...{
              timeout: this.timeout,
              forgetParam: this.param,
              loading: this.loading,
              onGetCaptcha: () => this.handleGetCaptcha(this.param.email),
              onResetPwd: () => this.handleShowResetPwd(this.$message.error),
              onConfirm: () => this.handleResetPwd(this.$message.error)
            }}
          />
        )}
      </div>
    )
  }
})

export default ForgetPwd
