import api from '../request'

export const login = (data: object) =>
  api({
    url: '/login',
    data,
    type: 'backen',
    method: 'post',
    retry: 3,
    retryDelay: 1000
  })

export const forgetPwd = (params: object) =>
  api({
    url: '/forgetpwd',
    params,
    type: 'backen',
    method: 'get'
  })

export const resetPassword = (data: object) =>
  api({
    url: '/resetpwd',
    data,
    type: 'backen',
    method: 'post'
  })

export const register = (data: object) =>
  api({
    url: '/register',
    data,
    type: 'backen',
    method: 'post'
  })

export const captcha = () =>
  api({
    url: '/getCaptcha',
    type: 'backen',
    method: 'get'
  })
