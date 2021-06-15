import { defineComponent, markRaw, ref, inject, resolveComponent } from 'vue'
import ColorPicker from '../colorPicker'
import { deepClone } from '@/utils/data'

const useProps = (props: any, emit: any) => {
  const copyUser = ref<any>(deepClone(markRaw(props.user)))
  const panel = inject<any>('panel')
  const backPreview = () => (panel.value = 'preview')
  const editPanel = ref<string>('basic')
  const handleAvatar = (file: any) => {
    const filereader = new FileReader()
    filereader.onload = (e: any) => (copyUser.value.avatar = e.target.result)
    filereader.readAsDataURL(file)
  }

  const confirmInfo = () => {
    emit('update:user', copyUser.value)
    backPreview()
  }
  return {
    copyUser,
    backPreview,
    editPanel,
    handleAvatar,
    confirmInfo
  }
}

const InfoEdit = defineComponent({
  name: 'InfoEdit',
  componentName: 'ManageInfoEdit',
  components: {
    ColorPicker
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }: any) {
    return useProps(props, emit)
  },
  render() {
    const Upload: any = resolveComponent('Upload')
    return (
      <section class="edit-panel">
        <el-tabs tab-position="left" v-model={this.editPanel} stretch>
          <el-tab-pane label="基本信息" name="basic">
            <p class="edit-row image">
              <el-avatar src={this.copyUser.avatar} />
              <Upload
                action=""
                accept=".png, .jpeg, .jpg, .gif"
                showFileList={false}
                beforeUpload={this.handleAvatar}
              >
                {{
                  default: () => (
                    <el-button
                      type="primary"
                      plain
                      style="margin-top: 20px"
                      size="small"
                      icon="el-icon-edit"
                    >
                      更换头像
                    </el-button>
                  ),
                  tip: () => null
                }}
              </Upload>
            </p>
            <p class="edit-row">
              <span>
                <i class="el-icon-message" />
                邮箱：
              </span>
              <el-input v-model={this.copyUser.email} clearable size="small" />
            </p>
            <p class="edit-row">
              <span>
                <i class="el-icon-user" />
                用户名：
              </span>
              <el-input v-model={this.copyUser.username} clearable size="small" />
            </p>
            <p class="edit-row">
              <span>
                <i class="el-icon-edit" />
                个性签名：
              </span>
              <el-input v-model={this.copyUser.signature} clearable size="small" />
            </p>
          </el-tab-pane>
          <el-tab-pane label="配置信息" name="config">
            <p class="edit-row">
              <span>
                <i class="el-icon-s-custom" />
                角色：
              </span>
              <el-select size="mini" v-model={this.copyUser.role}>
                <el-option label="管理员" value="admin" />
                <el-option label="普通用户" value="customer" />
              </el-select>
            </p>
            <p class="edit-row">
              <span>
                <i class="iconfont vite-icon-i18n" />
                语言：
              </span>
              <el-select size="mini" v-model={this.copyUser.lang}>
                <el-option label="中文" value="zh-cn" />
                <el-option label="English" value="en" />
              </el-select>
            </p>
            <p class="edit-row">
              <span>
                <i class="el-icon-magic-stick" />
                主题：
              </span>
              <ColorPicker v-model={[this.copyUser.theme, 'color']} />
            </p>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="pwd">
            <p class="edit-row">
              <span>新密码：</span>
              <el-input v-model={this.copyUser.newpwd} clearable size="small" />
            </p>
            <p class="edit-row">
              <span> 确认密码：</span>
              <el-input v-model={this.copyUser.confirm} clearable size="small" />
            </p>
            <p class="edit-row">
              <span>验证码：</span>
              <div style="flex: 1;">
                <el-input v-model={this.copyUser.verify} clearbale size="small" />
              </div>
            </p>
          </el-tab-pane>
        </el-tabs>
        <footer>
          <el-button type="info" plain onClick={this.backPreview} size="small">
            返回
          </el-button>
          <el-button type="primary" plain onClick={this.confirmInfo} size="small">
            确定
          </el-button>
        </footer>
      </section>
    )
  }
})

export default InfoEdit
