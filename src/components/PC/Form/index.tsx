import { defineComponent, resolveComponent } from 'vue'
import { useForm } from '@/hooks/form'
import { isFunction, isNotEmptyString, isObject } from '@/utils/types'
import { toCamel } from '@/utils/tool'
import { pick } from '@/utils/props'
import Form from 'element-plus/lib/el-form'
import DiyFormItem from './FormItemDiy'
import cascader from '@/data/cascaderOptions.json'
import slotsMap from './map.json'
import './style'

const renderContent = function (this: any, ...args: any) {
  const [uiComponent, formKey, formItem] = args
  const {
    component: { attr, events, name, slots },
    linkage
  } = formItem || { component: {} }
  let modelValue = this.getVModel(uiComponent)
  modelValue = modelValue.slice(modelValue.lastIndexOf(':') + 1)
  return (
    <div>
      {uiComponent ? (
        <uiComponent
          {...Object.assign(
            {},
            attr || {},
            isNotEmptyString(modelValue)
              ? {
                  [modelValue]: this.copyModel[formKey],
                  [`onUpdate:${modelValue}`]: (value: any) => {
                    this.copyModel[formKey] = value
                    isFunction(linkage) && linkage(this.copyModel, this.copySchema)
                  }
                }
              : isObject(events) &&
                  Object.entries(events).reduce((self: any, [key, value]: any) => {
                    self[`on${toCamel(key)}`] = value?.bind?.(this)
                    return self
                  }, {})
          )}
        >
          {Array.isArray(slots) &&
            slots
              .map((option: any) => {
                const cName = (slotsMap as any)[toCamel(name)]
                if (['El', 'Van'].some((key) => cName.startsWith(key))) {
                  const Tag: any = resolveComponent(cName)
                  return <Tag {...option}>{option.slot}</Tag>
                } else {
                  return <span v-html={option} />
                }
              })
              .filter(Boolean)}
        </uiComponent>
      ) : isFunction(name) ? (
        name({
          model: this.copyModel,
          item: formItem
        })
      ) : (
        <span v-html={this.copyModel[formKey]} />
      )}
      {this.dynamic && (
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          onClick={(e: MouseEvent) => this.removeFormItem(e, formKey)}
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
                        placeholder="请输入schema label"
                      />
                    </p>
                    <p>
                      <span>prop：</span>
                      <el-input
                        v-model={data.component.prop}
                        size="small"
                        placeholder="请输入schema prop"
                      />
                    </p>
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
  emits: ['form-methods', 'validate', 'update:schema', 'update:model'],
  props: Object.assign({}, Form.props, {
    schema: {
      type: Object,
      default: () => {}
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
          {Object.entries(this.copySchema).map(([key, formItem]: any) => {
            const { component, props } = formItem
            const uiComponent: any = resolveComponent(toCamel(component.name))
            if (isFunction(slots[key])) {
              return slots[key]({ model: this.copyModel, item: formItem })
            } else {
              return (
                !props.hide && (
                  <el-form-item
                    {...pick(
                      formItem,
                      Object.keys(props || {}).filter((key: string) => key !== 'label')
                    )}
                  >
                    {Object.assign(
                      {
                        default: renderContent.bind(this, uiComponent, key, formItem)
                      },
                      'label' in (props || {}) && {
                        label: () =>
                          isFunction(props.label)
                            ? props.label()
                            : isNotEmptyString(props.label) && <span v-html={`${props.label} ：`} />
                      },
                      isFunction(props.error) && {
                        error: props.error
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
              // this.copyItems.push(form)
              // this.copyModel[form.prop] = ''
            }
          }}
        />
      </section>
    )
  }
})

export default DynamicForm
