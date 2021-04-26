import Storage from "@/utils/storage.ts";
import { importantKeys } from "@/data/enum.ts";
import { login } from "@/api/user.ts";
import { resetRouter } from '../../router'
const storage = new Storage();
const user = {
  state: {
    token: storage.getItem(importantKeys.TOKEN),
    userInfo: storage.getItem(importantKeys.USER_INFO),
  },
  mutations: {
    SET_USERINFO(state: any, userInfo: any) {
      state.userInfo = userInfo;
      storage.setItem(importantKeys.USER_INFO, userInfo);
    },
    SET_TOKEN(state: any, token: string) {
      state.token = token;
      storage.setItem(importantKeys.TOKEN, token);
    },
    CLEAR_STATE(state: any) {
      state = {
        token: "",
        userInfo: {},
      };
    },
  },
  actions: {
    login({ commit }: any, userobj: object) {
      return new Promise((resolve, reject) => {
        login(userobj).then((data: any) => {
          commit('SET_TOKEN', data.token)
          const copy = JSON.parse(JSON.stringify(data))
          delete copy.token
          commit('SET_USERINFO', copy)
          resolve('登陆成功')
        }).catch(reject);
      })
    },
    logout({ commit }: any) {
      resetRouter()
      storage.clear();
      commit("CLEAR_STATE");
      Promise.resolve().then(() => {
        location.reload();
      });
    },
  },
};

export { user };
