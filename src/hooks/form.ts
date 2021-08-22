import { ref, computed, onMounted } from 'vue'
import { pick } from '@/utils/props'
import { buttonBlur } from '@/utils/dom'
import { isNotEmptyString, trueType, isFunction } from '@/utils/types'
import ElMessageBox from 'element-plus/lib/el-message-box'

export const useForm = (props: any, emit: any, component: any) => {
  const FormProps = computed(() =>
    Object.assign(
      {},
      pick(
        props,
        Object.keys(component.props).filter((key: string) => key !== 'model')
      ),
      {
        'status-icon': true,
        'label-width': 'auto',
        onValidate(prop: string, validate: boolean, error: any) {
          emit('validate', prop, validate, error)
        }
      }
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

  const copySchema = computed<any>({
    get() {
      return props.schema
    },
    set(value) {
      emit('update:schema', value)
    }
  })

  const showAddFormItem = ref<boolean>(false)
  const showDiyFormItem = ref<boolean>(false)

  const form = ref<any>(null)

  onMounted(() => {
    const { clearValidate, resetFields, validate, validateField } = form.value
    const methods: any = {
      clearValidate,
      resetFields,
      validate,
      validateField,
      el: form.value?.$el
    }
    if (props.chaseError) {
      methods.validateChaseError = validateChaseError
    }
    emit('form-methods', methods)
  })

  return {
    copyModel,
    copySchema,
    FormProps,
    showAddFormItem,
    showDiyFormItem,
    form,
    ...useHandleFormItem(copyModel, copySchema)
  }
}

const validateChaseError = function (this: any, callback: any) {
  if (this.el instanceof HTMLElement) {
    const validateCallBack = (success: boolean, fields: any) => {
      if (!success) {
        const firstKey = Object.keys(fields || {})[0]
        if (isNotEmptyString(firstKey)) {
          const selector = this.el.querySelector(`label[for=${firstKey}]`)
          this.el.scrollTo({
            behavior: 'smooth',
            top: selector.offsetTop - selector.offsetHeight - 100
          })
        }
      }
      isFunction(callback) && callback(success, fields)
    }
    this.validate(validateCallBack)
  }
}

const useHandleFormItem = (model: any, schema: any) => {
  const quickAddConfirm = (e: MouseEvent, data: any) => {
    const { component = {} } = data
    const must = isNotEmptyString(component.label) && isNotEmptyString(component.prop)
    if (must) {
      if (component.tag !== 'el-input') {
        Array.isArray(component.slots) && component.slots.length > 0 && addFormItem(e, component)
      } else {
        addFormItem(e, component)
      }
    }
  }
  const addFormItem = (e: MouseEvent, data: any) => {
    buttonBlur(e)
    const { name, label, prop, attr, type, required = true, slots } = data
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
      if (prop in schema.value) {
        schema.value[prop] = {
          props: {
            label,
            required
          },
          component: {
            name,
            attr,
            slots
          }
        }
      }
    }
  }
  const removeFormItem = (e: MouseEvent, prop: string) => {
    buttonBlur(e)
    ElMessageBox.confirm(`此操作将删除表单项 ${prop}，是否继续？`, '提示', {
      type: 'warning'
    }).then(() => {
      if (prop in schema.value) {
        delete schema.value[prop]
        delete model.value[prop]
      }
    })
  }
  const getVModel = (component: any): string => {
    const { emits = [] } = component
    return (
      (
        {
          Array: emits.find((key: string) => key.startsWith('update')),
          Object: Object.keys(emits).find((key: string) => key.startsWith('update'))
        } as any
      )[trueType(emits)] || ''
    )
  }
  const initModel = () => {
    const props = Object.keys(schema).filter(Boolean)
    props.forEach((item: any) => {
      if (Array.isArray(item)) {
        item.forEach((prop: string) => {
          if (!model.value.hasOwnProperty(prop)) {
            model.value[prop] = null
          }
        })
      } else {
        if (!model.value.hasOwnProperty(item)) {
          model.value[item] = null
        }
      }
    })
  }
  initModel()
  return {
    addFormItem,
    removeFormItem,
    getVModel,
    quickAddConfirm,
    initModel
  }
}

export const useFormItemDiy = (props: any, emit: any) => {
  const visible = computed<boolean>({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const formItem = ref<any>({
    label: '',
    name: '',
    prop: '',
    attr: {},
    rules: [],
    linkage: ''
  })

  const componentList = ref<any[]>([])

  return {
    visible,
    formItem,
    componentList,
    ...handleFormItemDiy(visible, formItem, emit)
  }
}

const handleFormItemDiy = (visible: any, formItem: any, emit: any) => {
  const contentChange = (value: string) => {
    formItem.value.name = value
  }
  const confirmItemDiy = (form: any) => {
    if (form) {
      const methods = {
        el: form.$el,
        validate: form.validate
      }
      validateChaseError.call(methods, (success: boolean, fields: any[]) => {
        if (success) {
          emit('confirm', formItem.value)
          cancelItemDiy()
        }
      })
    }
  }
  const cancelItemDiy = () => {
    visible.value = false
    formItem.value = {
      label: '',
      name: '',
      prop: '',
      attr: {},
      rules: [],
      linkage: ''
    }
  }
  return {
    confirmItemDiy,
    cancelItemDiy,
    contentChange
  }
}
