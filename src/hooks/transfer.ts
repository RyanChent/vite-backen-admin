import { ref, computed } from 'vue'
import { pick } from '@/utils/props'

export const useTransferProps = (props: any, emit: any, component: any) => {
  const transferRef = ref<any>(null)
  const transferKeys = computed<any>({
    get() {
      return props.selectedKeys
    },
    set(value) {
      emit('update:selectedKeys', value)
    }
  })
  const transferProps = computed(() =>
    Object.assign(
      { buttonTexts: ['移除', '添加'] },
      pick(
        props,
        Object.keys(component.props).filter((key) => key !== 'modelValue')
      )
    )
  )

  return {
    transferProps,
    transferRef,
    transferKeys
  }
}
