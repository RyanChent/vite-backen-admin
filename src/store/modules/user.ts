import Storage from "@/utils/storage.ts";
import { importantKeys } from "@/data/enum.ts";
import { login } from "@/api/user.ts";
const storage = new Storage();
const user = {
  state: {
    token: storage.getItem(importantKeys.TOKEN),
    userInfo: storage.getItem(importantKeys.USER_INFO),
    roles: [],
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
    SET_ROLES(state: any, roles: Array<unknown>) {
      state.roles = roles;
    },
  },
  actions: {
    login({ commit }: any, userobj: object) {
      return new Promise((resolve, reject) => {
        login(userobj)
          .then((data: any) => {
            commit("SET_TOKEN", data.token);
            const copy = JSON.parse(JSON.stringify(data));
            delete copy.token;
            commit("SET_USERINFO", copy);
            resolve("登陆成功");
          })
          .catch(() => {
            commit("SET_TOKEN", "test");
            commit("SET_USERINFO", {});
            resolve("登陆成功");
            /* 接口正常后这里要reject */
          });
      });
    },
    getInfo({ commit }: any) {
      commit("SET_ROLES", ["test"]);
      return Promise.resolve(["test"]);
    },
    logout({ commit }: any) {
      storage.clear();
      commit("CLEAR_STATE");
      Promise.resolve().then(() => {
        location.reload()
      });
    },
  },
};

export { user };
