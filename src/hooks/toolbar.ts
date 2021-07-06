import { ref, computed, onBeforeMount, watch, nextTick } from 'vue'
import { dragDom } from '@/utils/dom'
import { useStore } from 'vuex'

export const useToolBarProps = (props: any) => {
  const store = useStore()
  const expand = ref<boolean>(true)
  const toolBar = ref<any>(null)
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

  const dragToolBar = async () => {
    await nextTick()
    setTimeout(() => {
      const mainContent: any = document.querySelector('.backen-admin-pc-content')
      const minTop =
        (document.querySelector('.backen-admin-pc-navbar')?.clientHeight || 0) +
        (mainContent?.querySelector('.el-header')?.clientHeight || 0) +
        50
      const minLeft = document.querySelector('.backen-admin-pc-sidebar')?.clientWidth || 0
      dragDom(toolBar.value, minLeft, minTop)
    }, 500)
  }

  if (props.draggable) {
    watch(
      () => [store.state.config.collapse, store.state.config.navMode],
      ([collapse, navMode]) => {
        if (!collapse) {
          if (toolBar.value) {
            const left = parseInt(toolBar.value.style.left)
            left <= 220 && (toolBar.value.style.cssText = '')
          }
        }
        dragToolBar()
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  onBeforeMount(() => {
    document.onmouseup = document.onmousemove = null
  })

  return {
    expand,
    toolBar,
    expandIconClass,
    dragToolBar
  }
}
