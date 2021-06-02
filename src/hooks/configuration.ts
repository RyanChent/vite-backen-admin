import { ref, computed } from 'vue'
import { copyContent } from '@/utils/dom'
import { objectToString } from '@/utils/data'
import { isFunction } from '@/utils/types'

export const useConfiguration = (props: any, store: any, route: any) => {
  const drawer = ref<boolean>(false)
  const mode = computed({
    set(value: string) {
      store.dispatch('changeMode', value)
      document.body.setAttribute('mode', value)
    },
    get() {
      return store.state.config.mode
    }
  })
  const navMode = computed({
    set(value: string) {
      store.dispatch('changeNavMode', value)
      if (value === 'horizontal') {
        collapse.value = false
      } else {
        collapse.value = route.path === '/component'
      }
    },
    get() {
      return store.state.config.navMode
    }
  })
  const fixHead = computed({
    set(value: boolean) {
      store.dispatch('changeFixHead', value)
    },
    get() {
      return store.state.config.fixHead
    }
  })
  const fixSide = computed({
    set(value: boolean) {
      store.dispatch('changeFixSide', value)
    },
    get() {
      return store.state.config.fixSide
    }
  })
  const tagView = computed({
    set(value: boolean) {
      store.dispatch('changeTagView', value)
    },
    get() {
      return store.state.config.tagView
    }
  })
  const collapse = computed({
    set(value: boolean) {
      store.dispatch('changeCollapse', value)
    },
    get() {
      return store.state.config.collapse
    }
  })
  const uniqueOpen = computed({
    set(value: boolean) {
      store.dispatch('changeUniqueOpen', value)
    },
    get() {
      return store.state.config.uniqueOpen
    }
  })
  const copyConfig = async (message: any) => {
    const configString = objectToString(store.state.config)
    await copyContent(configString)
    isFunction(message) && message(`复制成功：${configString}`)
  }
  const resetConfig = (message: any) => {
    store.dispatch('resetConfig').then(() => {
      mode.value = 'light'
      isFunction(message) && message('重置成功')
    })
  }
  return {
    drawer,
    mode,
    navMode,
    tagView,
    collapse,
    fixHead,
    fixSide,
    uniqueOpen,
    copyConfig,
    resetConfig
  }
}
