import Storage from '@/utils/storage'
import { importantKeys } from '@/data/enum'
import { login } from '@/api/backen/user'
const storage = new Storage()
const user = {
  state: {
    token: storage.getItem(importantKeys.TOKEN),
    userInfo: storage.getItem(importantKeys.USER_INFO),
    roles: []
  },
  mutations: {
    SET_USERINFO(state: any, userInfo: any) {
      state.userInfo = userInfo
      storage.setItem(importantKeys.USER_INFO, userInfo)
    },
    SET_TOKEN(state: any, token: string) {
      state.token = token
      storage.setItem(importantKeys.TOKEN, token)
    },
    CLEAR_STATE(state: any) {
      state = {
        token: '',
        userInfo: {},
        roles: []
      }
    },
    SET_ROLES(state: any, roles: Array<unknown>) {
      state.roles = roles
    }
  },
  actions: {
    login({ commit }: any, userobj: any) {
      return new Promise((resolve, reject) => {
        const duration = 24 * 60 * 60 * (Number(userobj.noLogin) * 6 + 1)
        login(userobj)
          .then((data: any) => {
            commit('SET_TOKEN', data.token, duration)
            const copy = JSON.parse(JSON.stringify(data))
            delete copy.token
            commit('SET_USERINFO', { ...copy, role: 'admin', lang: userobj.lang })
            resolve('登陆成功')
          })
          .catch((err: any) => {
            console.log(err)
            commit('SET_TOKEN', 'test', duration)
            commit('SET_USERINFO', {
              username: userobj.username,
              email: `${userobj.username}@qq.com`,
              avatar: '/assets/avatar.jpg',
              signature: '我是测试用户',
              theme: '#409eff',
              sound: 70,
              bright: 100,
              lang: userobj.lang,
              album: 'pic',
              role: 'admin',
              createDate: new Date(),
              updateDate: new Date()
            })
            resolve('登陆成功')
            /* 接口正常后这里要reject */
          })
      })
    },
    getInfo({ commit }: any, roles = ['admin']) {
      commit('SET_ROLES', roles)
      return Promise.resolve(roles)
    },
    logout({ commit }: any) {
      Promise.resolve().then(() => {
        storage.clear()
        commit('CLEAR_STATE')
        location.reload()
      })
    },
    setUserInfo({ commit }: any, userinfo: object) {
      commit('SET_USERINFO', userinfo)
    }
  }
}

export { user }
