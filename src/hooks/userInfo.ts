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
import { domScroll, copyContent, setDomTitle } from '@/utils/dom'
import { Toast } from 'vant'

let domScrollHandler: any = null

const useGetComputedProps = (props: any, emit: any) => {
  const store = useStore()
  const updateRoutes = inject<any>('updateRoutes')
  const user = computed<any>({
    get() {
      return store.state.user.userInfo
    },
    async set(value) {
      const { role, lang }: any = store.state.user.userInfo
      await store.dispatch('setUserInfo', value)
      if (value.role !== role) {
        store.dispatch('getInfo', [value.role]).then(updateRoutes)
      }
      if (value.lang !== lang) {
        store.dispatch('setLanguage', value.lang)
      }
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

  return {
    user,
    visible
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

export const useMobilePersonProps = (props: any, emit: any) => {
  const { user } = useGetComputedProps(props, emit)
  return {
    user,
    ...useHandleShare()
  }
}

const useHandleShare = () => {
  const showShare = ref<any>(false)
  const options = [
    [
      { name: '微信', icon: 'wechat', key: 'wechat' },
      { name: '朋友圈', icon: 'wechat-moments', key: 'wechat-moments' },
      { name: '微博', icon: 'weibo', key: 'weibo' },
      { name: 'QQ', icon: 'qq', key: 'qq' },
      {
        name: 'QQ空间',
        key: 'qzone',
        icon: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1577376065,62724058&fm=26&gp=0.jpg'
      }
    ],
    [
      { name: '复制链接', icon: 'link', key: 'link' },
      { name: '分享海报', icon: 'poster', key: 'poster' },
      { name: '二维码', icon: 'qrcode', key: 'qrcode' }
    ]
  ]
  const ShareSelect = (options: any) => {
    switch (options.key) {
      case 'weibo':
      case 'link':
        copyContent(location.href).then(() => Toast.success('复制成功'))
        break
      case 'poster':
      case 'qrcode':
      case 'wechat':
      case 'wechat-moments':
      case 'qq':
        window.open(
          `http://connect.qq.com/widget/shareqq/index.html?url=${location.href}?sharesource=qzone&title=${document.title}&pics=${location.origin}/favicon.ico&summary=vite-backen-cli`
        )
        break
      case 'qzone':
        window.open(
          `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${location.href}?sharesource=qzone&title=${document.title}&pics=${location.origin}/favicon.ico&summary=vite-backen-cli`
        )
        break
    }
  }
  return {
    ShareSelect,
    options,
    showShare
  }
}
