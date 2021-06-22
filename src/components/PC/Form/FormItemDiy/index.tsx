import { defineComponent, resolveComponent } from 'vue'
import { useFormItemDiy } from '@/hooks/form'
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
    console.log(this.$.appContext.components)
    return <Dialogs
      v-model={this.visible}
      title="自定义表单项"
      showMaximize
      dragging
      customClass="manage-diy-form-dialog"
      top="80px"
    >
      <el-form
        model={this.formItem}
        label-width="auto"
        label-suffix=" ："
      >
        <el-form-item prop="label" label="表单项描述" required>
          <el-input v-model={this.formItem.label} placeholder="请输入表单项描述" />
        </el-form-item>
        <el-form-item prop="content" label="表单项组件">
          <el-select />
        </el-form-item>
        <el-form-item prop="prop" label="表单字段" required>
          <el-input v-model={this.formItem.prop} placeholder="请输入表单字段" />
        </el-form-item>
        <el-form-item prop="attr" label="组件参数">
          <el-input />
        </el-form-item>
        <el-form-item prop="rules" label="表单项校验">
          <el-input />
        </el-form-item>
        <el-form-item prop="linkage" label="表单项联动">
          <el-input type="textarea" v-model={this.formItem.linkage} placeholder="请输入表单项联动处理" />
        </el-form-item>
      </el-form>
      <footer class="form-footer">
        <el-button type="primary" plain round>确定</el-button>
        <el-button type="info" plain round>取消</el-button>
      </footer>
    </Dialogs>
  }
})

export default FormItemDiy
