import {
  ref,
  computed,
  inject,
  provide,
  onMounted,
  nextTick,
  watch,
  shallowRef,
  onBeforeUnmount
} from 'vue'
import { useStore } from 'vuex'
import { getCommits, getAllRepo } from '@/api/github/api'
import { domScroll } from '@/utils/dom'

let domScrollHandler: any = null

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

const useTimeLineHandle = () => {
  const timelineLoading = ref<boolean>(false)
  const commitsData = shallowRef<any>([])
  const finished = ref<boolean>(false)
  let page = 0
  const getCommitsData = () => {
    timelineLoading.value = true
    page += 1
    getCommits({ page })
      .then((data: any) => {
        finished.value = data.length === 0
        if (data.length > 0) {
          commitsData.value = [...commitsData.value, ...data.map((item: any) => item.commit)]
        }
      })
      .catch(() => {
        page -= 1
      })
      .finally(() => {
        timelineLoading.value = false
      })
  }

  onBeforeUnmount(() => {
    if (domScrollHandler?.disconnect) {
      domScrollHandler.disconnect()
      domScrollHandler = null
    }
  })

  return {
    timelineLoading,
    getCommitsData,
    commitsData,
    finished
  }
}

const useRepoHandle = () => {
  const repoData = shallowRef<any>([])
  const repoLoading = ref<boolean>(false)
  const getAllRepoData = () => {
    repoLoading.value = true
    getAllRepo()
      .then((data: any) => {
        if (Array.isArray(data) && data.length) {
          repoData.value = data
        }
      })
      .finally(() => {
        repoLoading.value = false
      })
  }

  return {
    repoData,
    repoLoading,
    getAllRepoData
  }
}

export const useRightPreviewProps = () => {
  const active = ref<any>('repo')
  const timeLineHandler = useTimeLineHandle()
  const repoHandler = useRepoHandle()
  watch(
    () => active.value,
    async () => {
      await nextTick()
      switch (active.value) {
        case 'timeline':
          if (!domScrollHandler) {
            const lastOne = document.getElementById('last-one')
            if (lastOne) {
              domScrollHandler = new domScroll(lastOne, ([target]: any) => {
                if (target.isIntersecting) {
                  if (!timeLineHandler.finished.value) {
                    timeLineHandler.getCommitsData()
                  }
                }
              })
            }
          }
          break
        case 'repo':
          if (!repoHandler.repoData.value.length) {
            repoHandler.getAllRepoData()
          }
      }
    },
    { immediate: true }
  )
  return {
    active,
    ...timeLineHandler,
    ...repoHandler
  }
}
