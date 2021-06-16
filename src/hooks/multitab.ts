import { computed, inject, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { isNotEmptyString } from '@/utils/types'

export const useHandleTag = (router: any, store: any) => {
  const route = router.currentRoute
  const openRoutes = ref<Array<any>>([])
  const top = ref<number>(0)
  const left = ref<number>(0)
  const visible = ref<boolean>(false)
  const currentTag = ref<any>({ title: '', path: '' })
  const isMobile = inject<any>('isMobile')
  const tagView = computed(() => store.state.config.tagView)

  const closeTag = (index: number, path: string) => {
    if (isNotEmptyString(path)) {
      openRoutes.value.splice(index, 1)
    }
    const lastIndex = Math.max(0, openRoutes.value.length - 1)
    router.replace(openRoutes.value[lastIndex]?.path || '/')
  }

  const rightClickTag = (e: MouseEvent, item: object) => {
    e.preventDefault()
    e.stopPropagation()
    const { clientX, clientY } = e
    top.value = clientY
    left.value = clientX
    currentTag.value = item
    visible.value = true
  }

  const menus = [
    {
      title: 'close',
      click: () => {
        if (openRoutes.value.length > 1) {
          const currentIndex = openRoutes.value.findIndex(
            (item: any) => item.path === currentTag.value.path
          )
          const now = openRoutes.value[currentIndex]
          const prev = openRoutes.value[currentIndex - 1]
          openRoutes.value.splice(currentIndex, 1)
          if (prev) {
            now.path === route.value.path && router.replace(prev.path || '/')
          }
        }
      }
    },
    {
      title: 'close-right',
      click: () => {
        const currentIndex = openRoutes.value.findIndex(
          (item: any) => item.path === currentTag.value.path
        )
        openRoutes.value = openRoutes.value.slice(0, currentIndex + 1)
        router.replace(currentTag.value.path || '/')
      }
    },
    {
      title: 'close-other',
      click: () => {
        openRoutes.value = [currentTag.value]
        router.replace(currentTag.value.path || '/')
      }
    }
  ]

  watch(
    () => route.value.path,
    () => {
      if (route.value.path !== '/login') {
        const isDuplicate = openRoutes.value.some((item: any) => item.path === route.value.path)
        if (!isDuplicate) {
          openRoutes.value.push({
            title: route.value.meta?.title || '',
            path: route.value.path,
            name: route.value.name
          })
        }
      }
    },
    { immediate: true }
  )

  watch(
    () => [store.state.user.roles, isMobile.value],
    () => {
      router.afterEach(() => {
        openRoutes.value = openRoutes.value.filter((item: any) => router.hasRoute(item.name))
      })
    }
  )

  return {
    openRoutes,
    top,
    left,
    visible,
    currentTag,
    menus,
    closeTag,
    rightClickTag,
    tagView
  }
}

export const useHandleRightButton = (props: any) => {
  const webPageFull = ref<boolean>(false)
  const togglePageFull = (pageClass: string) => {
    const page = document.querySelector(`.${pageClass}`) as HTMLElement
    page.classList.toggle('manage-page-full')
    nextTick(() => {
      webPageFull.value = !webPageFull.value
    })
  }

  onBeforeUnmount(() => {
    const page = document.querySelector(`.${props.pageClass}`) as HTMLElement
    page.classList.remove('manage-page-full')
    webPageFull.value = false
  })

  return {
    webPageFull,
    togglePageFull
  }
}

export const useHandleScrollMenu = () => {
  const headMenu = ref<any>(null)
  const wheelScroll = (e: any) => {
    e.stopPropagation()
    const delD = e.wheelDelta ? e.wheelDelta : -e.detail * 40
    const move = delD > 0 ? -50 : 50
    headMenu.value.$el.scrollLeft += move
  }

  onBeforeUnmount(() => {
    if (headMenu.value.$el) {
      headMenu.value.$el.removeEventListener('wheel', wheelScroll)
    }
  })

  return {
    headMenu,
    wheelScroll
  }
}
