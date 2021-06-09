import request from '../backen/request'
const api = {
  allRepo: '/users/RyanChent/repos',
  repoDetail: '/repos/RyanChent'
}

export const getAllRepo = () =>
  request({
    url: api.allRepo,
    method: 'get'
  })

export const getCommits = (repo = 'vite-backen-admin') =>
  request({
    url: `${api.repoDetail}/${repo}/commits`,
    method: 'get'
  })
