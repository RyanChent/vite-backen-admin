const lang = {
    state: {
        language: 'zh'
    },
    mutations: {
        SET_LANGUAGE(state: any, language: string) {
            state.language = language
        }
    },
    actions: {
        setLanguage({ commit }: any, language: string) {
            commit('SET_LANGUAGE', language)
        }
    },
};

export { lang };