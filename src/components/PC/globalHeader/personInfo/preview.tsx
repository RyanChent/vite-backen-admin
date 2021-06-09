import { defineComponent, inject } from 'vue'
import { parseTime } from '@/utils/tool'
const InfoPreview = defineComponent({
  name: 'InfoPreview',
  componentName: 'ManageInfoPreview',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
      role: inject<any>('role'),
      lang: inject<any>('lang')
    }
  },
  render() {
    return (
      <section class="preview-panel">
        <el-card header="About Me" class="info-card">
          <div class="top-info">
            <el-avatar src={this.user.avatar} />
            <p>
              <span>{this.user.username}</span>({this.user.email})
            </p>
            <p>{this.user.signature}</p>
          </div>
          <el-divider content-position="center">配置信息</el-divider>
          <ul>
            <li>
              <i class="el-icon-user" />
              角色：{({ admin: '管理员', custom: '普通用户' } as any)[this.role]}
            </li>
            <li>
              <i class="iconfont vite-icon-i18n" />
              语言：{({ 'zh-cn': '中', en: '英' } as any)[this.lang]}
            </li>
            <li>
              <i class="el-icon-magic-stick" />
              主题：
              <div
                style={{
                  backgroundColor: this.user.theme,
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  display: 'inline-block'
                }}
              />
            </li>
          </ul>
          <el-divider content-position="center">其他信息</el-divider>
          <ul>
            <li>
              <i class="el-icon-date" />
              创建日期：{parseTime(this.user.createDate)}
            </li>
            <li>
              <i class="el-icon-date" />
              修改日期：{parseTime(this.user.updateDate)}
            </li>
          </ul>
        </el-card>
        <el-card class="other-info-card"></el-card>
      </section>
    )
  }
})

export default InfoPreview
