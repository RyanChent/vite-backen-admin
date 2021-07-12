import { computed, ref, watch, nextTick, provide, readonly } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

let resultMap: any = Object.create(null)

const wheelScroll = (e: any, ele: any) => {
  e.stopPropagation()
  const delD = e.wheelDelta ? e.wheelDelta : -e.detail * 40
  const move = delD > 0 ? -50 : 50
  ele.scrollLeft += move
}

export const useMenuProps = () => {
  const router = useRouter()
  const store = useStore()
  const routes = computed(() => store.state.permission.routes)
  const route = router.currentRoute
  const defaultIndex = ref<string>(route.value.path)
  const defaultOpen = ref<string[]>([])

  /* 监听route变动 */
  watch(
    () => route.value.path,
    () => {
      defaultIndex.value = route.value.path
    },
    { immediate: true }
  )

  return {
    defaultIndex,
    defaultOpen,
    routes
  }
}

export const useHandleMenus = function (this: any) {
  const select = (index: string) => {
    if (['http', '//'].some((key) => index.startsWith(key))) {
      location.href = index
    } else {
      this.$router.push(index)
    }
  }

  const open = async (index: string) => {
    this.defaultOpen.push(index)
    const selector = index.replaceAll('/', '-')
    const current: any = document.querySelector(`.horizontal-submenu${selector}`)
    const first = selector.indexOf('-')
    const last = selector.lastIndexOf('-')
    if (first !== last) {
      const parent: any = document.querySelector(`.horizontal-submenu${selector.slice(0, last)}`)
      await nextTick()
      const parentLi: any = parent.children[0].querySelector('li.el-submenu.is-opened')
      const left = parent.offsetLeft + parentLi.offsetLeft - parentLi.offsetWidth / 2
      const top = parent.offsetTop + parent.offsetHeight + 2
      current.style.cssText += `left:${left}px !important; top: ${top}px !important`
    }
  }

  const close = (index: string) => {
    const waitClose = this.defaultOpen.filter((path: string) => path.includes(index))
    waitClose.forEach((path: string) => {
      this.$refs['manage-menu']?.close?.(path)
    })
    this.defaultOpen = this.defaultOpen.filter((path: string) => !waitClose.includes(path))
  }

  return {
    onSelect: select,
    onOpen: open,
    onClose: close
  }
}
