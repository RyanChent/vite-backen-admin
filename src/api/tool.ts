import api from "@/utils/request.ts";

export const downloadFile = (data: object) =>
  api({
    url: "/filedownload",
    method: "post",
    data
  });
