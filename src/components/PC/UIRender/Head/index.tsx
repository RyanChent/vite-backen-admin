import { defineComponent } from 'vue'
import { t } from '@/lang'
import { useRenderHeadProps } from '@/hooks/uiRender'
import './style'

const UIRenderHead = defineComponent({
  name: 'UIRenderHead',
  componentName: 'ManageUIRenderHead',
  props: {
    renderStr: {
      type: Array,
      default: () => []
    },
    importStr: {
      type: Array,
      default: () => []
    }
  },
  setup(props: any) {
    return useRenderHeadProps(props)
  },
  render() {
    return (
      <header class="ui-render-head-tool">
        <el-button onClick={() => this.$emit('reset')}>重置</el-button>
        <el-popover
          trigger="click"
          placement="bottom"
          width={300}
          popper-class="source-config-popover"
        >
          {{
            default: () => (
              <>
                <div class="input-row">
                  <span class="label-key">文件名：</span>
                  <div class="content">
                    <el-input
                      v-model={this.vueName}
                      clearable
                      size="small"
                      placeholder={t('please.input.something')}
                    />
                  </div>
                </div>
                <div class="input-row">
                  <span class="label-key">类型：</span>
                  <div class="content">
                    <el-radio v-model={this.vueType} label={true}>
                      Composition
                    </el-radio>
                    <el-radio v-model={this.vueType} label={false}>
                      Options
                    </el-radio>
                  </div>
                </div>
                <div style="text-align: center">
                  <el-button
                    type="primary"
                    size="small"
                    onClick={() => this.generateVue(this.vueName, this.vueType)}
                  >
                    确定
                  </el-button>
                </div>
              </>
            ),
            reference: () => <el-button type="success">保存源码</el-button>
          }}
        </el-popover>
        <el-popover trigger="click" placement="bottom" width={250}>
          {{
            default: () => (
              <div style="display: flex; justify-content: space-between; align-item: center">
                <el-input
                  v-model={this.htmlName}
                  clearable
                  size="small"
                  placeholder={t('please.input.something')}
                />
                <el-button
                  type="primary"
                  size="small"
                  style="margin-left: 20px;"
                  onClick={() => this.generateHTML(this.htmlName)}
                >
                  确定
                </el-button>
              </div>
            ),
            reference: () => <el-button type="primary">保存构建后代码</el-button>
          }}
        </el-popover>
      </header>
    )
  }
})

export default UIRenderHead
