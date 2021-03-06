import request from '../request'
const api = {
  allRepo: '/users/RyanChent/repos',
  repoDetail: '/repos/RyanChent'
}

export const getAllRepo = () =>
  request({
    url: api.allRepo,
    method: 'get'
  })

export const getCommits = ({ repo = 'vite-backen-admin', page = 1, per_page = 20 }: any) =>
  request({
    url: `${api.repoDetail}/${repo}/commits`,
    method: 'get',
    params: {
      per_page,
      page
    }
  })

export const getLanguages = (repo: string) =>
  request({
    url: `${api.repoDetail}/${repo}/languages`,
    method: 'get'
  })
