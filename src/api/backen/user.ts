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
