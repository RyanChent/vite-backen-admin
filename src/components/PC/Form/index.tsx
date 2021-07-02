import { defineComponent, resolveComponent } from 'vue'
import { useForm } from '@/hooks/form'
import { isFunction } from '@/utils/types'
import { toCamel } from '@/utils/tool'
import { pick } from '@/utils/props'
import Form from 'element-plus/lib/el-form'
import ArrayEditor from '../JsonEditor'
import DiyFormItem from './FormItemDiy'
import cascader from '@/data/cascaderOptions.json'
import slotsMap from './map.json'
import './style'

const excludeKeys = ['attr', 'content', 'label', 'linkage', 'hide', 'slots']

const renderContent = function (this: any, ...args: any) {
  const [contentComponent, item] = args
  let modelValue = this.getVModel(contentComponent)
  modelValue = modelValue.slice(modelValue.lastIndexOf(':') + 1)
  return (
    <div>
      {contentComponent ? (
        <contentComponent
          {...Object.assign({}, item.attr || {}, {
            [modelValue]: this.copyModel[item.prop],
            [`onUpdate:${modelValue}`]: (value: any) => {
              this.copyModel[item.prop] = value
              isFunction(item.linkage) && item.linkage(this.copyModel, this.copyItems)
            }
          })}
        >
          {Array.isArray(item.slots) &&
            item.slots
              .map((option: any) => {
                const Tag: any = resolveComponent((slotsMap as any)[toCamel(item.content)])
                if (Tag) {
                  return <Tag {...option}>{option.slot}</Tag>
                }
              })
              .filter(Boolean)}
        </contentComponent>
      ) : isFunction(item.content) ? (
        item.content({
          model: this.copyModel,
          item
        })
      ) : (
        <span v-html={this.copyModel[item.prop]} />
      )}
      {this.dynamic && (
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          onClick={(e: MouseEvent) => this.removeFormItem(e, item.prop)}
        />
      )}
    </div>
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
        placement="top"
      >
        {{
          default: () => (
            <CascaderPanel
              options={cascader}
              ref="cascader"
              v-slots={{
                level1: ({ data }: any) => (
                  <span
                    v-html={data.label}
                    onClick={(e: MouseEvent) => {
                      if (data.value === 'diy') {
                        this.showAddFormItem = false
                        this.showDiyFormItem = true
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
                    {/* {data.component.tag !== 'el-input' && (
                      <p>
                        <span>slots：</span>
                        <ArrayEditor json={data.component.slots} />
                      </p>
                    )} */}
                    <p style="margin-top: 30px; justify-content: center;">
                      <el-button
                        size="small"
                        type="primary"
                        plain
                        onClick={(e: MouseEvent) => {
                          this.quickAddConfirm(e, data)
                          this.showAddFormItem = false
                        }}
                      >
                        确定
                      </el-button>
                      <el-button
                        size="small"
                        type="info"
                        plain
                        onClick={() => (this.showAddFormItem = false)}
                      >
                        取消
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
      {isFunction(this.$slots.footer) && this.$slots.footer()}
    </footer>
  )
}

const DynamicForm = defineComponent({
  name: 'Form',
  componentName: 'ManagePCForm',
  emits: ['form-methods', 'validate', 'update:formItems', 'update:model'],
  props: Object.assign({}, Form.props, {
    formItems: {
      type: Array,
      default: () => []
    },
    dynamic: {
      type: Boolean,
      default: false
    },
    chaseError: {
      type: Boolean,
      default: false
    }
  }),
  components: {
    ArrayEditor,
    DiyFormItem
  },
  setup(props: any, { emit }: any) {
    return useForm(props, emit, Form)
  },
  render() {
    const slots: any = this.$slots
    return (
      <section class="manage-dynamic-form">
        <el-form
          model={this.copyModel}
          {...this.FormProps}
          ref={(el: any) => el && (this.form = el)}
        >
          {this.copyItems.map((item: any) => {
            const contentComponent: any = resolveComponent(toCamel(item.content))
            if (isFunction(slots[item.prop])) {
              return slots[item.prop]({ model: this.copyModel, item })
            } else {
              return (
                !item.hide && (
                  <el-form-item
                    {...pick(
                      item,
                      Object.keys(item).filter((key: string) => !excludeKeys.includes(key))
                    )}
                  >
                    {Object.assign(
                      {
                        label: isFunction(item.label)
                          ? item.label
                          : () => <span v-html={`${item.label} ：`} />,
                        default: renderContent.bind(this, contentComponent, item)
                      },
                      isFunction(item.error) && {
                        error: item.error
                      }
                    )}
                  </el-form-item>
                )
              )
            }
          })}
        </el-form>
        {this.dynamic ? renderFooter.call(this) : isFunction(slots.footer) && slots.footer()}
        <DiyFormItem
          v-model={this.showDiyFormItem}
          {...{
            onConfirm: (form: any) => {
              this.copyItems.push(form)
              this.copyModel[form.prop] = ''
            }
          }}
        />
      </section>
    )
  }
})

export default DynamicForm
