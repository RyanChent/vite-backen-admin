import { ref, onMounted } from 'vue'
import { snapShot } from '@/utils/dom'
import { uuid } from '@/utils/tool'

export const useSnapShots = (props: any, emit: any) => {
  const { target, type } = props
  const img = ref<string>('')
  const renderFinish = ref<boolean>(false)
  const domid = ref<string>(type === 'VNode' ? `${target}-${uuid(4)}` : '')
  onMounted(async () => {
    let el: any
    if (type === 'dom') {
      el = document.querySelector(target)
    } else if (type === 'VNode') {
      el = document.getElementById(domid.value)
    }
    const { printable } = await snapShot(el)
    img.value = printable
  })

  return {
    img,
    renderFinish,
    domid
  }
}
