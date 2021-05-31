import { defineComponent } from 'vue'
import { trueType } from '@/utils/types'
import { t } from '@/lang'
import { useRenderEditor } from '@/hooks/jsonEditor'
import _ from 'lodash'
import './style'

const useRenderJson = (props: any) => {
  const renderhook = useRenderEditor(props, trueType(props.json))
  // 按数据类型返回对应组件
  const componentType = (prop: any, propKey: any) => {
    switch (prop.type || trueType(prop[propKey])) {
      case 'String':
      case 'Number':
        return (
          <el-input
            v-model={prop[propKey]}
            clearable
            size="mini"
            placeholder={t('please.input.something')}
            onClick={(e: MouseEvent) => e.stopPropagation()}
            onChange={_.debounce(() => renderhook.componentOnChange(prop, propKey), 200)}
          />
        )
      case 'Boolean':
        return (
          <el-radio-group
            v-model={prop[propKey]}
            onChange={() => renderhook.componentOnChange(prop, propKey)}
          >
            <el-radio label={true}>{t('true')}</el-radio>
            <el-radio label={false}>{t('false')}</el-radio>
          </el-radio-group>
        )
      case 'Function':
        return (
          <el-input
            v-model={prop[propKey]}
            clearable
            type="textarea"
            autosize={{
              minRows: 6,
              maxRows: 12
            }}
            placeholder={t('please.input.something')}
            onClick={(e: MouseEvent) => e.stopPropagation()}
            onChange={_.debounce(() =>  renderhook.componentOnChange(prop, propKey), 200)}
          />
        )
    }
  }
  return {
    componentType,
    ...renderhook
  }
}

const propertyNode = function (this: any, node: any, data: any) {
  if (!data.hasOwnProperty('origin')) {
    data.origin = data.label
  }
  return (
    <div class="json-row">
      <span class="json-key">
        {!['root', '}', ']'].includes(data.key) ? (
          <>
            <el-input
              size="mini"
              v-model={data.origin}
              onClick={(e: MouseEvent) => e.stopPropagation()}
              readonly={node.parent.data.type === 'Array'}
              onChange={_.debounce(() => this.propertyKeyChange(data.origin, node, data), 200)}
            />
            ：
          </>
        ) : (
          data.label
        )}
      </span>
      <div class="json-value">
        {!['root', '}', ']'].includes(data.key) ? (
          <>
            {data.desc ? (
              <span class="primary" style="font-style: oblique; padding-top: 2px">
                {data.desc}
              </span>
            ) : (
              this.componentType(data, 'value')
            )}
            <el-select
              v-model={data.type}
              style="margin-left: 10px; width: 150px"
              size="mini"
              onChange={() => this.propertyTypeChange(data)}
              placeholder={t('please.select.something')}
            >
              {this.valueType.map((item: string) => (
                <el-option label={t(item)} value={item} key={item} />
              ))}
            </el-select>
            {['Array', 'Object'].includes(data.type) && (
              <el-button
                type="text"
                icon="el-icon-circle-plus-outline"
                style="color: #67c23A"
                title="添加属性"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation()
                  this.addProperty(data, node)
                }}
              />
            )}
            <el-button
              type="text"
              icon="el-icon-remove-outline"
              title="移除属性"
              style="color: #F56C6C"
              onClick={(e: MouseEvent) => {
                e.stopPropagation()
                this.removeProperty(node.parent.data, data.key)
              }}
            />
          </>
        ) : (
          data.key === 'root' && (
            <div class="json-value">
              <el-button
                type="text"
                icon="el-icon-circle-plus-outline"
                style="color: #67c23A"
                title="添加属性"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation()
                  this.addProperty(data, node)
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}

const JsonEditor = defineComponent({
  name: 'JsonEditor',
  componentName: 'ManageJsonEditor',
  props: {
    json: {
      type: [Object, Array],
      default: () => ({})
    },
    showJson: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return useRenderJson(props)
  },
  render() {
    return (
      <section class="manage-json-render">
        <el-tree
          data={this.treeData}
          node-key="key"
          default-expanded-keys={['root']}
          draggable={this.draggable}
          highlight-current
          auto-expand-parent
          ref={(el: any) => el && (this.treeRef = el)}
          allow-drag={(node: any) =>
            !['root', '}', ']'].includes(node.data.key) && node.parent?.data?.type !== 'Array'
          }
          allow-drop={(drag: any, drop: any, type: string) =>
            !['root', '}', ']'].includes(drop.data.key) &&
            drag.parent?.data?.key === drop.parent?.data?.key &&
            type !== 'inner'
          }
          onNodeDrop={this.dragPropertyDrop}
        >
          {{
            default: ({ node, data }: any) => propertyNode.call(this, node, data)
          }}
        </el-tree>
        {this.showJson && (
          <div
            class="manage-json-show"
            onContextmenu={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <el-input
              type="textarea"
              modelValue={this.jsonString}
              readOnly
              autosize={{ minRows: 28, maxRows: 28 }}
            />
          </div>
        )}
      </section>
    )
  }
})

export default JsonEditor
