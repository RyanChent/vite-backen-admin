import { inject, ref, reactive, watch, nextTick } from 'vue'
import { t } from '@/lang'
import { isNotEmptyString } from '@/utils/types'
import ElNotification from 'element-plus/lib/el-notification'
import { Notify } from 'vant'
import { setDomTitle } from '@/utils/dom'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export const useLoginProps = () => {
  const isMobile = inject<any>('isMobile')
  const store = useStore()
  const router = useRouter()
  const route = router.currentRoute
  const tab = ref<string>(store.state.lang.language)
  const logining = ref<any>(false)
  const userObj = reactive({
    username: 'vite-manage',
    passwords: 'vite-manage',
    verify: '',
    lang: tab.value,
    noLogin: false
  })
  const tabClick = () =>
    store.dispatch('setLanguage', tab.value).then(() => (userObj.lang = tab.value))
  const userLogin = async (callback: Function) => {
    if (!isNotEmptyString(userObj.username)) {
      callback(t('please.input.something') + t('username'))
      return
    }
    if (!isNotEmptyString(userObj.passwords)) {
      callback(t('please.input.something') + t('password'))
      return
    }
    logining.value = true
    await store.dispatch('login', userObj)
    logining.value = false
    router.push('/')
    nextTick(() => {
      !!isMobile.value
        ? Notify({
            type: 'success',
            message: `${t('welcome')}, ${userObj.username}`
          })
        : ElNotification({
            title: t('login.success'),
            message: `${t('welcome')}, ${userObj.username}`,
            type: 'success'
          })
    })
  }
  watch(
    () => [tab.value, route.value.path],
    () => {
      setDomTitle(t(route.value.meta.title))
    }
  )
  return {
    tabClick,
    tab,
    userObj,
    userLogin,
    isMobile,
    logining
  }
}
