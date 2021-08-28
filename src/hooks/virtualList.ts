import { ref, computed } from 'vue'

export const useVirtualList = (props: any, emit: any) => {
  const current = ref<number>(0)
  const pageList = computed(() =>
    props.list.slice(current.value * props.size, (current.value + 1) * props.size)
  )

  return {
    current,
    pageList
  }
}
