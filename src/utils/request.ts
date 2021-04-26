import axios from "axios";
import config from "../../public/js/config";
import Storage from "./storage";
import { isNotEmptyString, isMobile } from "./types";
const storage = new Storage();
axios.defaults.withCredentials = true;
const request = axios.create({
  timeout: 60 * 1000,
  baseURL: config.api,
});

request.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

request.interceptors.request.use(
  (config: any) => {
    const hasToken = isNotEmptyString(storage.getItem("token"));
    if (hasToken) {
      config.headers["token"] = storage.getItem("token");
      if (config.method === "get") {
        Object.assign(config.params, { t: new Date().getTime() });
      }
      if (config.url.includes("download")) {
        config.headers["responseType"] = "blob";
      }
      if (config.url.includes("upload")) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
      return config;
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
      return Promise.reject(data.message);
    }
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error("请求超时"));
  }
);

export default request;
