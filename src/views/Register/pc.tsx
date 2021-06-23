import { defineComponent } from 'vue'

const PCRegister = defineComponent({
  name: 'PCRegister',
  componentName: 'ManagePCRegister',
  props: {
    registerParam: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['confirm'],
  setup() {},
  render() {
    return (
      <div class="manage-pc-register">
        <div class="row">
          <el-input
            prefix-icon="el-icon-message"
            v-model={this.registerParam.email}
            placeholder="请输入邮箱"
            clearable
          />
        </div>
        <div class="row">
          <el-input
            prefix-icon="el-icon-user"
            v-model={this.registerParam.username}
            placeholder="请输入用户昵称"
            clearable
          />
        </div>
        <div class="row">
          <el-input
            prefix-icon="el-icon-lock"
            v-model={this.registerParam.passwords}
            placeholder="请输入密码"
            show-password
            clearable
          />
        </div>
        <div class="row">
          <el-input
            prefix-icon="el-icon-lock"
            v-model={this.registerParam.confirm}
            placeholder="请再次输入密码"
            show-password
            clearable
          />
        </div>
        <div class="row">
          <el-button
            type="primary"
            plain
            round
            style="min-width: 120px"
            onClick={() => this.$emit('confirm')}
          >
            确定
          </el-button>
        </div>
      </div>
    )
  }
})

export default PCRegister
