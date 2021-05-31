import { ref } from 'vue'
export const useActionHandle = () => {
  const showActionSheet = ref<boolean>(false)
  const tag = ref<any>('')
  const actions = ref<Array<any>>([])
  const touchToShowAction = (e: MouseEvent, newActions: Array<any>, newTag: string) => {
    e.stopPropagation()
    actions.value = newActions
    tag.value = newTag
    showActionSheet.value = true
  }

  return {
    showActionSheet,
    actions,
    touchToShowAction,
    tag
  }
}
