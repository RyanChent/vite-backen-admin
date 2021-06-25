import api from '../request'

export const getRouter = (params: object) =>
  api({
    url: '/getRouter',
    params,
    method: 'get',
    type: 'backen'
  })
