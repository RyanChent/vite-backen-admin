import { ref, onMounted, onBeforeUnmount } from 'vue'
import { loadScript } from '@/utils/dom'

export const useDashBoardProps = (props: any) => {
  const footerScript = ref<any>(null)
  const performanceShow = ref<any>({
    white: performance.timing.domComplete - performance.timing.connectStart
  })
  onMounted(() => {
    if (!footerScript.value) {
      footerScript.value = loadScript('/js/busuanzi.pure.mini.js')
    }
  })
  onBeforeUnmount(() => {
    document.body.removeChild(footerScript.value)
  })
  return {
    performanceShow
  }
}
