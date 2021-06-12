import api from '../request'

export const downloadFile = (data: object) =>
  api({
    url: '/filedownload',
    method: 'post',
    data
  })
