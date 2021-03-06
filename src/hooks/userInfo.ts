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
import { t } from '@/lang'
import { useStore } from 'vuex'
import { getCommits, getAllRepo } from '@/api/github/api'
import { domScroll, copyContent, setDomTitle } from '@/utils/dom'
import { Toast } from 'vant'

let domScrollHandler: any = null

const useGetComputedProps = (props: any, emit: any) => {
  const store = useStore()
  const updateRoutes = inject<any>('updateRoutes')
  const isMobile = inject<any>('isMobile')
  const user = computed<any>({
    get() {
      return store.state.user.userInfo
    },
    async set(value) {
      const { role, lang }: any = store.state.user.userInfo
      await store.dispatch('setUserInfo', value)
      if (value.role !== role) {
        await store.dispatch('getInfo', [value.role]).then(updateRoutes)
      }
      if (value.lang !== lang) {
        await store.dispatch('setLanguage', value.lang)
        if (isMobile.value) {
          setDomTitle(t('user-page'))
          Toast(t('change-language-success'))
        }
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

export const useMobilePersonProps = (props: any, emit: any) =>
  Object.assign({}, useGetComputedProps(props, emit), useHandleShare())

const useHandleShare = () => {
  const showShare = ref<any>(false)
  const options = [
    [
      { name: '??????', icon: 'wechat', key: 'wechat' },
      { name: '?????????', icon: 'wechat-moments', key: 'wechat-moments' },
      { name: '??????', icon: 'weibo', key: 'weibo' },
      { name: 'QQ', icon: 'qq', key: 'qq' },
      {
        name: 'QQ??????',
        key: 'qzone',
        icon: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1577376065,62724058&fm=26&gp=0.jpg'
      }
    ],
    [
      { name: '????????????', icon: 'link', key: 'link' },
      { name: '????????????', icon: 'poster', key: 'poster' },
      { name: '?????????', icon: 'qrcode', key: 'qrcode' }
    ]
  ]
  const ShareSelect = (options: any) => {
    switch (options.key) {
      case 'weibo':
        Toast.fail('????????????')
        break
      case 'link':
        copyContent(location.href).then(() => Toast.success('????????????'))
        break
      case 'poster':
      case 'qrcode':
      case 'wechat':
      case 'wechat-moments':
        Toast.fail('????????????')
        break
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
    showShare.value = false
  }
  return {
    ShareSelect,
    options,
    showShare
  }
}
