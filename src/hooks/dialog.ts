import { ref, computed } from 'vue'
import { pick } from '@/utils/props'
import { isNotEmptyString, isFunction } from '@/utils/types'

export const useDialogProps = (props: any, emit: any, component: any) => {
  const minimize = ref(false)
  const maximize = ref(false)
  const dialog = ref<any>(null)
  const customClass = isNotEmptyString(props.customClass) ? props.customClass + ' ' : ''
  /* 挂载默认的prop */
  const dialogProps = computed(() =>
    Object.assign(
      {},
      pick(props, Object.keys(component.props)),
      {
        customClass: `${customClass}animated ${props.enterTransition}`,
        onClose: () => {
          minimize.value = false
          maximize.value = false
          isFunction(props.onClose) && props.onClose()
          emit('update:modelValue', false)
        },
        'before-close': (done: Function) => {
          isFunction(props.beforeClose) && props.beforeClose()
          done()
        },
        'destroy-on-close': true
      },
      (props.showMinimize || props.showMaximize) && {
        'append-to-body': true,
        modalClass: `${!!maximize.value ? 'maximize ' : ' '}${!!minimize.value ? 'minimize ' : ' '}`
      }
    )
  )
  return {
    minimize,
    maximize,
    dialog,
    dialogProps
  }
}
