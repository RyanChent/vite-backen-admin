import { ref, onMounted, onBeforeUnmount } from 'vue'
import { loadScript } from '@/utils/dom'

export const useDashBoardProps = (props: any) => {
  const footerScript = ref<any>(null)
  onMounted(() => {
    if (!footerScript.value) {
      footerScript.value = loadScript('/js/busuanzi.pure.mini.js')
    }
  })
  onBeforeUnmount(() => {
    document.body.removeChild(footerScript.value)
  })
  return {
  }
}
