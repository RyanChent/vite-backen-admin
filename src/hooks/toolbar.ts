import { ref, computed } from 'vue'

export const useToolBarProps = (props: any, emit: any) => {
  const expand = ref<boolean>(false)
  const expandIconClass = computed<any>(() =>
    Object.assign(
      {},
      props.direction === 'row' && {
        'el-icon-caret-right': !expand.value,
        'el-icon-caret-left': expand.value
      },
      props.direction === 'column' && {
        'el-icon-caret-bottom': !expand.value,
        'el-icon-caret-top': expand.value
      }
    )
  )

  return {
    expand,
    expandIconClass
  }
}
