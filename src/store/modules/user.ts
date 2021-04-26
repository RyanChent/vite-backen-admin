import Storage from "@/utils/storage.ts";
import { importantKeys } from "@/data/enum.ts";
import { login } from "@/api/user.ts";
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
      login(userobj).then((res: any) => {
        console.log(res);
      });
    },
    logout({ commit }: any) {
      storage.clear();
      commit("CLEAR_STATE");
      Promise.resolve().then(() => {
        location.reload();
      });
    },
  },
};

export { user };
