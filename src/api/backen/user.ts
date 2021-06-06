import api from './request'

export const login = (data: object) =>
  api({
    url: '/login',
    data,
    method: 'post'
  })
