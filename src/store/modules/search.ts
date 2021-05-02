const search = {
    state: {
        searchValue: ''
    },
    mutations: {
        SET_SEARCHVALUE(state: any, searchValue: string) {
            state.searchValue = searchValue
        }
    },
    actions: {
        setSearchValue({ commit }: any, searchValue: string) {
            commit('SET_SEARCHVALUE', searchValue)
        }
    }
}

export { search }