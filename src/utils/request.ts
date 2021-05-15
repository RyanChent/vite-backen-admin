import axios from "axios";
import Storage from "./storage";
import { isNotEmptyString, isMobile } from "./types";
import store from "../store";
import ElNotification from "element-plus/lib/el-notification";
import { Notify } from "vant";
const storage = new Storage();
const whiteApi = ["/login"];
axios.defaults.withCredentials = true;
const request = axios.create({
  timeout: 60 * 1000,
  baseURL: (window as any)._config.api,
});

request.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

request.interceptors.request.use(
  (config: any) => {
    const hasToken = isNotEmptyString(storage.getItem("token"));
    if (hasToken || whiteApi.includes(config.url)) {
      config.headers["token"] = storage.getItem("token");
      if (config.method === "get") {
        Object.assign(config.params, { t: new Date().getTime() });
      }
      if (config.url.toLowerCase().includes("download")) {
        config.responseType = "blob";
      }
      if (config.url.toLowerCase().includes("upload")) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
      return config;
    } else {
      /* 接口正常后，这里取消注释 */
      // store.dispatch("logout");
      throw new Error("登陆超时，请重新登录");
    }
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response: any) => {
    const { data } = response;
    if (response.headers["content-disposition"]) {
      return Promise.resolve(response);
    }
    if (data.success || data.code === 200) {
      return Promise.resolve(data.result);
    } else {
      if (data.code === 401) {
        store.dispatch("logout");
      }
      !!isMobile()
        ? Notify({ type: "danger", message: data.message })
        : ElNotification({
            type: "error",
            title: "请求失败",
            message: data.message,
          });
      return Promise.reject(data.message);
    }
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error);
    }
    /* 接口正常后，这里取消注释 */
    // !!isMobile()
    //   ? Notify({ type: "danger", message: "请求超时，请刷新重试" })
    //   : ElNotification({
    //       type: "error",
    //       title: "请求超时",
    //       message: "请刷新重试",
    //     });
    // store.dispatch("logout");
    return Promise.reject(new Error("请求超时"));
  }
);

export default request;
