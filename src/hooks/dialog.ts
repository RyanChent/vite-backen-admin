import { ref, computed } from 'vue'
import { pick } from '@/utils/props'
import { isNotEmptyString } from '@/utils/types'

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
        customClass: `${customClass}animated ${
          !!props.modelValue ? props.enterTransition : props.fadeTransition
        }`,
        onClosed: () => {
          emit('update:modelValue', false)
        }
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
