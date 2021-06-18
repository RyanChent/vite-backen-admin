import { ref, computed } from 'vue'
import { pick } from '@/utils/props'
import { buttonBlur } from '@/utils/dom'
import { isNotEmptyString } from '@/utils/types'
import ElMessageBox from 'element-plus/lib/el-message-box'

export const useForm = (props: any, emit: any, component: any) => {
  const FormProps = computed(() =>
    Object.assign(
      {},
      pick(
        props,
        Object.keys(component.props).filter((key: string) => key !== 'model')
      )
    )
  )

  const copyModel = computed({
    get() {
      return props.model
    },
    set(value) {
      emit('update:model', value)
    }
  })

  const copyItems = computed({
    get() {
      return props.formItems
    },
    set(value) {
      emit('update:formItems', value)
    }
  })

  const showAddFormItem = ref<boolean>(false)
  return {
    copyModel,
    copyItems,
    FormProps,
    showAddFormItem,
    ...useHandleFormItem(copyModel, copyItems)
  }
}

const useHandleFormItem = (model: any, items: any) => {
  const addFormItem = (e: MouseEvent, data: any) => {
    buttonBlur(e)
    const { tag, label, prop, attr, type, required = true, slots } = data
    if (isNotEmptyString(prop)) {
      switch (type) {
        case 'Boolean':
        case 'String':
        case 'Number':
          model[prop] = ''
          break
        case 'Array':
          model[prop] = []
          break
        case 'Object':
          model[prop] = {}
          break
      }
      if (!items.value.some((item: any) => item.prop === prop)) {
        items.value.push({
          prop,
          required,
          attr,
          label,
          content: tag,
          slots
        })
      }
    }
  }
  const removeFormItem = (e: MouseEvent, prop: string) => {
    buttonBlur(e)
    ElMessageBox.confirm(`此操作将删除表单项 ${prop}，是否继续？`, '提示', {
      type: 'warning'
    }).then(() => {
      const formIndex = items.value.findIndex((formItem: any) => formItem.prop === prop)
      if (formIndex > -1) {
        items.value.splice(formIndex, 1)
        delete model.value[prop]
      }
    })
  }

  return {
    addFormItem,
    removeFormItem
  }
}
