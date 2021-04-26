import api from "@/utils/request.ts";

export const login = (data: object) =>
  api({
    url: "/login",
    data,
    method: "post",
  });
