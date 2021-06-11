import { ref, computed, inject, provide, onMounted, nextTick, watch } from 'vue'
import { useStore } from 'vuex'

const useGetComputedProps = (props: any, emit: any) => {
  const store = useStore()
  const updateRoutes = inject<any>('updateRoutes')
  const user = computed<any>({
    get() {
      return store.state.user.userInfo
    },
    set(value) {
      store.dispatch('setUserInfo', value)
    }
  })

  const visible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const role = computed({
    get() {
      return user.value.role
    },
    async set(value) {
      if (value !== user.value.role) {
        user.value.role = value
        await store.dispatch('getInfo', [value])
        updateRoutes()
      }
    }
  })

  const lang = computed({
    get() {
      return store.state.lang.language
    },
    set(value) {
      store.dispatch('setLanguage', value)
    }
  })
  return {
    user,
    visible,
    role,
    lang
  }
}

export const usePersonProps = (props: any, emit: any) => {
  const modalClass = ref<any>('')
  const panel = ref<string>('preview')
  const computedProps = useGetComputedProps(props, emit)
  onMounted(async () => {
    await nextTick()
    modalClass.value = 'maximize'
  })
  watch(
    () => computedProps.visible.value,
    () => {
      if (!computedProps.visible.value) {
        panel.value = 'preview'
      }
    }
  )
  watch(
    () => panel.value,
    async () => {
      await nextTick()
      if (panel.value === 'preview') {
        modalClass.value = 'maximize'
      } else {
        modalClass.value = ''
      }
    }
  )
  provide('panel', panel)
  return {
    modalClass,
    panel,
    ...computedProps
  }
}
