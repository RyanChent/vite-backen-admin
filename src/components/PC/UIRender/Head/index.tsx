import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import GenerateFile from '@/utils/file'
import { getSource, getComponents } from '@/utils/component'
import { isNotEmptyString } from '@/utils/types'
import { t } from '@/lang'
import './style'
let generate: any

const useHandleDownload = (props: any, message: any) => {
  const addBracketsSpace = (str: string, symbol: string): string => {
    switch (symbol) {
      case '(':
        return str.replaceAll('(', '( ').replaceAll(')', ' )')
      case '{':
        return str.replaceAll('{', '{ ').replaceAll('}', ' }')
      case '[':
        return str.replaceAll('[', '[ ').replaceAll(']', ' ]')
      default:
        return str
    }
  }
  const generateVue = (name: string, type: boolean) => {
    if (isNotEmptyString(name)) {
      generate.generateFile({
        name,
        composition: type,
        renderStr: props.renderStr
          .map((Cstr: any) => getSource(Cstr.key, Cstr.prop, Cstr.slots, Cstr.emits))
          .join('\n'),
        importStr: props.importStr
          .filter(isNotEmptyString)
          .map((str: any) => (str.includes('{') ? addBracketsSpace(str, '{') : str))
          .join('\n'),
        componentStr: getComponents(props.importStr)
      })
      name = ''
    } else {
      message.error(t('please.input.something'))
    }
  }
  const generateHTML = (name: string) => {
    if (isNotEmptyString(name)) {
      generate.generateFile({
        name,
        domstr: document.querySelector('.ui-render-content .render-panel')?.innerHTML,
        composition: false,
        source: false
      })
      name = ''
    } else {
      message.error(t('please.input.something'))
    }
  }
  return {
    generateVue,
    generateHTML
  }
}

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
    const {
      proxy: { $message }
    }: any = getCurrentInstance()
    const { generateVue, generateHTML } = useHandleDownload(props, $message)
    const vueName = ref<any>('')
    const vueType = ref<any>(true)
    const htmlName = ref<any>('')
    onMounted(() => {
      generate = new GenerateFile()
    })
    onBeforeUnmount(() => {
      generate = null
    })
    return {
      generateVue,
      generateHTML,
      vueName,
      vueType,
      htmlName
    }
  },
  render() {
    return (
      <header class="ui-render-head-tool">
        <el-button onClick={() => this.$emit('reset')}>重置</el-button>
        <el-popover
          trigger="click"
          placement="top"
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
        <el-popover trigger="click" placement="top" width={250}>
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
