import { defineComponent, resolveComponent } from 'vue'
import { useForm } from '@/hooks/form'
import { isFunction, isNotEmptyString } from '@/utils/types'
import { toCamel } from '@/utils/tool'
import { pick } from '@/utils/props'
import Form from 'element-plus/lib/el-form'
import ArrayEditor from '../JsonEditor'
import cascader from '@/data/cascaderOptions.json'
import './style'

const renderContent = function (this: any, ...args: any) {
  const [contentComponent, item] = args
  return (
    <>
      {contentComponent ? (
        <contentComponent
          v-model={this.copyModel[item.prop]}
          {...Object.assign({}, item.attr || {})}
        />
      ) : isFunction(item.content) ? (
        item.content({
          model: this.copyModel,
          item
        })
      ) : (
        <span v-html={item.content} />
      )}
      {this.dynamic && (
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="small"
          onClick={(e: MouseEvent) => this.removeFormItem(e, item.prop)}
        />
      )}
    </>
  )
}

const renderFooter = function (this: any) {
  const CascaderPanel: any = resolveComponent('CascaderPanel')
  return (
    <footer class="manage-dynamic-form-footer">
      <el-popover
        popper-class="manage-dynamic-form-content"
        show-arrow={false}
        trigger="manual"
        v-model={[this.showAddFormItem, 'visible']}
        placement="bottom-end"
      >
        {{
          default: () => (
            <CascaderPanel
              options={cascader}
              ref="cascader"
              v-click-outside={() => {
                this.showAddFormItem = false
                if (!this.showAddFormItem) {
                  this.$refs.cascader.currentClick = []
                }
              }}
              v-slots={{
                level1: ({ data }: any) => (
                  <span
                    v-html={data.label}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation()
                      if (!Array.isArray(data.children)) {
                        console.log(data)
                      }
                    }}
                  />
                ),
                lastOne: (data: any) => (
                  <div class="quick-config-panel">
                    <p>
                      <span>label：</span>
                      <el-input
                        v-model={data.component.label}
                        size="small"
                        placeholder="请输入formItem label"
                      />
                    </p>
                    <p>
                      <span>prop：</span>
                      <el-input
                        v-model={data.component.prop}
                        size="small"
                        placeholder="请输入formItem prop"
                      />
                    </p>
                    {data.component.tag !== 'el-input' && (
                      <p>
                        <span>slots：</span>
                        <ArrayEditor json={data.component.slots} />
                      </p>
                    )}
                    <p style="margin-top: 30px; justify-content: center;">
                      <el-button
                        size="small"
                        type="primary"
                        plain
                        onClick={(e: MouseEvent) => {
                          if (
                            isNotEmptyString(data.component.label) &&
                            isNotEmptyString(data.component.prop)
                          ) {
                            this.addFormItem(e, data.component)
                            this.showAddFormItem = false
                          }
                        }}
                      >
                        确定
                      </el-button>
                    </p>
                  </div>
                )
              }}
            />
          ),
          reference: () => (
            <el-button
              type="primary"
              icon="el-icon-plus"
              plain
              round
              onClick={(e: MouseEvent) => {
                e.stopPropagation()
                this.showAddFormItem = true
              }}
            >
              新增表单项
            </el-button>
          )
        }}
      </el-popover>
    </footer>
  )
}

const DynamicForm = defineComponent({
  name: 'Form',
  componentName: 'ManagePCForm',
  props: Object.assign({}, Form.props, {
    formItems: {
      type: Array,
      default: () => []
    },
    dynamic: {
      type: Boolean,
      default: false
    }
  }),
  components: {
    ArrayEditor
  },
  setup(props: any, { emit }: any) {
    return useForm(props, emit, Form)
  },
  render() {
    const slots: any = this.$slots
    return (
      <section class="manage-dynamic-form">
        <el-form model={this.copyModel} {...this.FormProps}>
          {this.copyItems.map((item: any) => {
            const contentComponent: any = resolveComponent(toCamel(item.content))
            return (
              <el-form-item
                {...pick(
                  item,
                  Object.keys(item).filter(
                    (key: string) => !['label', 'content', 'attr'].includes(key)
                  )
                )}
              >
                {Object.assign(
                  {
                    label: isFunction(item.label) ? item.label : () => <span v-html={item.label} />,
                    default: renderContent.bind(this, contentComponent, item)
                  },
                  isFunction(item.error) && {
                    error: item.error
                  }
                )}
              </el-form-item>
            )
          })}
        </el-form>
        {this.dynamic ? renderFooter.call(this) : isFunction(slots.footer) && slots.footer()}
      </section>
    )
  }
})

export default DynamicForm
