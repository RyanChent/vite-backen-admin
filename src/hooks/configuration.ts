import { ref, computed } from 'vue'

export const useConfiguration = (props: any, store: any) => {
  const drawer = ref<boolean>(false)
  const mode = computed({
    set(value: string) {
      store.dispatch('changeMode', value)
    },
    get() {
      return store.state.config.mode
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
  return {
    drawer,
    mode,
    tagView,
    collapse,
    fixHead,
    fixSide
  }
}
