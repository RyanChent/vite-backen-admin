import { defineComponent } from 'vue'
import UiRenderHead from './Head'
import UiRenderTool from './Tools'
import UiRenderContent from './Content'
import UiRenderTree from './Node'
import { useHandleComponent } from '@/hooks/uiRender'
import './style'

const UIRender = defineComponent({
  name: 'UIRender',
  componentName: 'ManageUIRender',
  components: {
    UiRenderHead,
    UiRenderTool,
    UiRenderContent,
    UiRenderTree
  },
  setup() {
    return useHandleComponent()
  },
  render() {
    return (
      <section class="manage-ui-render-page">
        <div class="ui-render-tree">
          <ui-render-tree renderStr={this.vueRenderStr} />
        </div>
        <div class="ui-render-show">
          <ui-render-head
            renderStr={this.vueRenderStr}
            importStr={Object.values(this.vueScriptStr)}
            onReset={() => {
              this.vueRenderStr = []
              this.vueScriptStr = {}
            }}
          />
          <ui-render-content renderStr={this.vueRenderStr} />
        </div>
        <div class="ui-render-right-tools">
          <ui-render-tool onRender={this.handleComponentClick} />
        </div>
      </section>
    )
  }
})

export default UIRender
