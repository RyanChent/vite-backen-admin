import axios from "axios";
import { downFile } from "@/utils/tool.ts";

export const downloadFile = (url: string, title: string) => {
  axios({
    method: "get",
    url,
    responseType: "blob",
  }).then((res) => {
    if (res.data) {
      downFile(res.data, title);
    }
  });
};
