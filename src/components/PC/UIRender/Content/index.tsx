import { defineComponent } from 'vue'
import { isObject, isFunction, trueType } from '@/utils/types'
import { t } from '@/lang'
import { useHandleContent } from '@/hooks/uiRender'
import RightContextMenu from '@PC/ContextMenus'
import JsonEditor from '@PC/JsonEditor'
import './style'

const componentType = (prop: any, propKey: any): any => {
  switch (trueType(prop[propKey])) {
    case 'String':
    case 'Number':
      return (
        <div class="prop-value">
          <el-input v-model={prop[propKey]} clearable placeholder={t('please.input.something')} />
        </div>
      )
    case 'Boolean':
      return (
        <div class="prop-value">
          <el-radio v-model={prop[propKey]} label={true}>
            {t('true')}
          </el-radio>
          <el-radio v-model={prop[propKey]} label={false}>
            {t('false')}
          </el-radio>
        </div>
      )
    case 'Array':
      return <JsonEditor json={prop[propKey]} />
    case 'Function':
      return (
        <div class="prop-value">
          <el-input
            type="textarea"
            v-model={prop[propKey]}
            autosize={{
              minRows: 6,
              maxRows: 10
            }}
            clearable
            placeholder={t('please.input.something')}
          />
        </div>
      )
    case 'Object':
      return <JsonEditor json={prop[propKey]} />
    default:
      return null
  }
}

const popoverDefault = (item: any) => (
  <el-tabs type="border-card" v-model={item.tab}>
    {isObject(item.prop) && Object.keys(item.prop).length > 0 && <el-tab-pane name="prop" label="组件配置">
      {Object.keys(item.prop).map((propKey: any) => (
        <div class="input-row">
          <span title={t(propKey)} class="prop-key">
            {t(propKey)}
          </span>
          {componentType(item.prop, propKey)}
        </div>
      ))}
    </el-tab-pane>
    }
    <el-tab-pane name="style" label="样式配置">
      <el-input
        type="textarea"
        v-model={item.style}
        autosize={{
          minRows: 10,
          maxRows: 20
        }}
      />
    </el-tab-pane>
    {isObject(item.slots) && Object.keys(item.slots).length > 0 && (
      <el-tab-pane name="slots" label="子组件">
        <div>子组件</div>
      </el-tab-pane>
    )}
  </el-tabs>
)

const renderComponent = function (this: any) {
  const handle = (list: any) => {
    if (Array.isArray(list)) {
      return list.map((item) => {
        if (!item.hasOwnProperty('showConfig')) {
          item.showConfig = false
        }
        return (
          <el-popover
            trigger="manual"
            placement="right"
            v-model={[item.showConfig, 'visible']}
            offset={-200}
            title={t(item.key)}
            popper-class="component-config-popover"
          >
            {{
              reference: () => (
                <div
                  style="width: fit-content;"
                  onContextmenu={(e: MouseEvent) => this.contextMenuComponent(e, item)}
                  onClick={(e: MouseEvent) => this.clickComponent(e, item) }
                >
                  <item.component {...item.prop} style="pointer-events: none">
                    {isObject(item.slots) &&
                      Object.entries(item.slots).reduce(
                        (self: any, [slotKey, slotValue]: any) => {
                          if (isFunction(slotValue)) {
                            self[slotKey] = slotValue
                          } else if (isObject(slotValue)) {
                            self[slotKey] = handle(Object.values(slotValue))
                          }
                          return self
                        },
                        {}
                      )}
                  </item.component>
                </div>
              ),
              default: () => popoverDefault(item)
            }}
          </el-popover>
        )
      })
    }
    return list
  }
  return handle(this.renderStr)
}

const UIRenderContent = defineComponent({
  name: 'UIRenderContent',
  componentsName: 'ManageUIRenderContent',
  components: {
    RightContextMenu: defineComponent(RightContextMenu),
    JsonEditor: defineComponent(JsonEditor)
  },
  props: {
    renderStr: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    return useHandleContent(props)
  },
  render() {
    return (
      <section
        class="ui-render-content"
        onContextmenu={(e: MouseEvent) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <div class="render-panel">{renderComponent.call(this)}</div>
        <right-context-menu
          v-model={[this.visible, 'visible']}
          {...{
            top: this.top,
            left: this.left,
            menus: this.rightMenus
          }}
        />
      </section>
    )
  }
})

export default UIRenderContent
