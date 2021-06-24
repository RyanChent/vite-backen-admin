import { inject, ref, reactive, watch, nextTick, provide, readonly } from 'vue'
import { t } from '@/lang'
import { isNotEmptyString } from '@/utils/types'
import Notification from 'element-plus/lib/el-notification'
import { Toast } from 'vant'
import { setDomTitle } from '@/utils/dom'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import defaultCaptcha from '@/data/captcha'
import { forgetPwd, resetPassword, register, captcha } from '@/api/backen/user'

export const useLoginProps = () => {
  const isMobile = inject<any>('isMobile')
  const store = useStore()
  const router = useRouter()
  const route = router.currentRoute
  const tab = ref<string>(store.state.lang.language)
  const logining = ref<any>(false)
  const verify = ref<string>(defaultCaptcha[(Math.random() * defaultCaptcha.length) | 0])
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
    if (!isNotEmptyString(verify.value) && userObj.verify !== verify.value) {
      callback(t('please.input.something') + '验证码')
      return false
    }
    if (!isNotEmptyString(userObj.username)) {
      callback(t('please.input.something') + t('username'))
      return false
    }
    if (!isNotEmptyString(userObj.passwords)) {
      callback(t('please.input.something') + t('password'))
      return false
    }
    logining.value = true
    await store.dispatch('login', userObj)
    logining.value = false
    router.push('/')
    nextTick(() => {
      !!isMobile.value
        ? Toast.success(`${t('welcome')}, ${userObj.username}`)
        : Notification({
            title: t('login.success'),
            message: `${t('welcome')}, ${userObj.username}`,
            type: 'success'
          })
    })
  }

  const handleCaptcha = () =>
    captcha()
      .then((data: any) => (verify.value = data))
      .catch((err: any) => {
        if (err.isAxiosError) {
          verify.value = defaultCaptcha[(Math.random() * defaultCaptcha.length) | 0]
        }
      })

  handleCaptcha()
  provide('refreshCaptcha', readonly([verify, handleCaptcha]))

  watch(
    () => [tab.value, route.value.path],
    () => {
      setDomTitle(t(route.value.meta.title))
    }
  )
  return {
    tab,
    userObj,
    isMobile,
    logining,
    verify,
    tabClick,
    userLogin,
    handleCaptcha
  }
}

export const useForgetProps = () => {
  let Timer: any
  const isMobile = inject<any>('isMobile')
  const router = useRouter()
  const store = useStore()
  const timeout = ref<number>(60)
  const active = ref<number>(0)
  const verify = ref<string>('')
  const loading = ref<boolean>(false)
  const param = ref<any>({
    email: '',
    passwords: '',
    confirm: '',
    verify: ''
  })

  const handleBack = () => {
    loading.value = false
    clearTimeout(Timer)
    router.back()
  }

  const handleGetCaptcha = (email: string) => {
    timeout.value = 60
    loading.value = true
    forgetPwd({ email })
      .then((data: any) => {
        const _setTimeOut = () => {
          if (Timer && timeout.value === 0) {
            loading.value = false
            clearTimeout(Timer)
          } else {
            Timer = setTimeout(() => {
              timeout.value -= 1
              _setTimeOut()
            }, 1000)
          }
        }
        _setTimeOut()
        verify.value = data
        setTimeout(() => {
          verify.value = ''
        }, 20 * 60 * 1000)
      })
      .catch(() => {
        loading.value = false
      })
  }

  const handleShowResetPwd = (callback: Function) => {
    if (!isNotEmptyString(param.value.email)) {
      callback('请先获取验证码')
      return false
    }
    if (!isNotEmptyString(param.value.verify)) {
      callback(t('please.input.something') + '验证码')
      return false
    }
    if (param.value.verify.toLowerCase?.() !== verify.value.toLowerCase?.()) {
      callback('验证码输入错误')
      return false
    }
    clearTimeout(Timer)
    loading.value = false
    active.value = 1
  }

  const handleResetPwd = (callback: Function) => {
    if (!isNotEmptyString(param.value.passwords)) {
      callback(t('please.input.something') + t('password'))
      return false
    }
    if (param.value.passwords !== param.value.confirm) {
      callback('两次输入密码不一致')
      return false
    }
    loading.value = true
    resetPassword({
      email: param.value.email,
      passwords: param.value.passwords
    })
      .then(async (data: any) => {
        loading.value = false
        active.value = 2
        if (isNotEmptyString(data.username)) {
          await nextTick()
          Timer = setTimeout(() => {
            store
              .dispatch('login', {
                ...data,
                passwords: param.value.passwords,
                lang: 'zh-cn'
              })
              .then(() => router.push('/'))
          }, 2000)
        }
      })
      .catch(() => {
        loading.value = false
      })
  }

  return {
    timeout,
    param,
    isMobile,
    verify,
    loading,
    active,
    handleBack,
    handleGetCaptcha,
    handleShowResetPwd,
    handleResetPwd
  }
}

export const useRegisterProps = () => {
  const isMobile = inject<any>('isMobile')
  const router = useRouter()
  const loading = ref<boolean>(false)
  const param = ref<any>({
    email: '',
    username: '',
    passwords: '',
    confirm: ''
  })

  const registerConfirm = (callback: any) => {
    const { email, username, passwords, confirm } = param.value
    const Reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
    if (!Reg.test(email)) {
      callback(t('please.input.something') + '合法的邮箱')
      return false
    }
    if (!isNotEmptyString(username)) {
      callback(t('please.input.something') + t('username'))
      return false
    }
    if (!isNotEmptyString(passwords)) {
      callback(t('please.input.something') + t('password'))
      return false
    }
    if (passwords !== confirm) {
      callback('两次输入不一致')
      return false
    }
    register({ email, username, passwords })
      .then(router.back)
      .catch(() => (loading.value = false))
  }

  return {
    isMobile,
    param,
    loading,
    registerConfirm
  }
}
