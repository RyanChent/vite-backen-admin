import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'
export const usePersonProps = (props: any, emit: any) => {
  const store = useStore()
  const updateRoutes = inject<any>('updateRoutes')
  const user = computed(() => store.state.user.userInfo)
  const lang = computed(() => store.state.lang.language)
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
    set(value) {
      if (value !== user.value.role) {
        Promise.all([
          store.dispatch(
            'setUserInfo',
            Object.assign({}, user.value, {
              role: value
            })
          ),
          store.dispatch('getInfo', [value])
        ]).then(() => {
          updateRoutes()
        })
      }
    }
  })
  return {
    visible,
    user,
    lang,
    role
  }
}
