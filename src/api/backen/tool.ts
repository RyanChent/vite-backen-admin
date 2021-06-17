import api from '../request'

export const downloadFile = (data: object) =>
  api({
    url: '/filedownload',
    method: 'post',
    type: 'backen',
    data
  })

export const uploadFile = (data: object) =>
  api({
    url: '/fileupload',
    method: 'post',
    type: 'backen',
    data
  })
