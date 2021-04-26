import { changeLanguage } from "@/lang/index.ts";
const lang = {
  state: {
    language: "zh-cn",
  },
  mutations: {
    SET_LANGUAGE(state: any, language: string) {
      state.language = language;
      changeLanguage(language);
    },
  },
  actions: {
    setLanguage({ commit }: any, language: string) {
      commit("SET_LANGUAGE", language);
    },
  },
};

export { lang };
