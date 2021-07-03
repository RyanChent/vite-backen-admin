import { defineComponent, resolveComponent } from 'vue'
import { useFormItemDiy } from '@/hooks/form'
import { toCamel } from '@/utils/tool'
import excludeComponent from './include.json'
import { t } from '@/lang'
import './style'

const FormItemDiy = defineComponent({
  name: 'FormItemDiy',
  componentName: 'ManageFormItemDiy',
  emits: ['update:modelValue', 'confirm'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any, { emit }: any) {
    return useFormItemDiy(props, emit)
  },
  render() {
    const Dialogs: any = resolveComponent('Dialogs')
    if (!this.componentList.length) {
      const list = [
        ...(new Set(Object.keys(this.$.appContext.components).map(toCamel)) as any)
      ].filter((key: string) => excludeComponent.includes(toCamel(key)))
      this.componentList = list.map((key: string) => ({
        label: t(key),
        value: key
      }))
    }
    return (
      <Dialogs
        v-model={this.visible}
        title="自定义表单项"
        showMaximize
        dragging
        customClass="manage-diy-form-dialog"
        top="80px"
      >
        <el-form model={this.formItem} label-width="auto" label-suffix=" ：" status-icon ref="form">
          <el-form-item prop="label" label="表单项描述" required>
            <el-input v-model={this.formItem.label} placeholder="请输入表单项描述" clearable />
          </el-form-item>
          <el-form-item prop="content" label="表单项组件" required>
            <el-select
              modelValue={this.formItem.content}
              placeholder="请选择组件"
              clearable
              onChange={this.contentChange}
            >
              {this.componentList.map((item: any) => (
                <el-option {...item} key={item.value} />
              ))}
            </el-select>
          </el-form-item>
          {this.formItem.hasOwnProperty('slots') && (
            <el-form-item prop="slots" label="子组件">
              <el-input />
            </el-form-item>
          )}
          <el-form-item prop="prop" label="表单字段" required>
            <el-input v-model={this.formItem.prop} placeholder="请输入表单字段" clearable />
          </el-form-item>
          <el-form-item prop="attr" label="组件参数">
            <el-input clearable />
          </el-form-item>
          <el-form-item prop="rules" label="表单项校验">
            <el-input clearable />
          </el-form-item>
          <el-form-item prop="linkage" label="表单项联动">
            <el-input
              type="textarea"
              v-model={this.formItem.linkage}
              placeholder="请输入表单项联动处理"
              clearable
            />
          </el-form-item>
        </el-form>
        <footer class="form-footer">
          <el-button
            type="primary"
            plain
            round
            onClick={() => this.confirmItemDiy(this.$refs.form)}
          >
            确定
          </el-button>
          <el-button type="info" plain round onClick={this.cancelItemDiy}>
            取消
          </el-button>
        </footer>
      </Dialogs>
    )
  }
})

export default FormItemDiy
