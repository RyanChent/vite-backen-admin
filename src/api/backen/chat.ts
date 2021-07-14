import api from '../request'

export const showChats = (params: any) =>
  api({
    url: '/showchats',
    params,
    method: 'get',
    type: 'backen'
  })
