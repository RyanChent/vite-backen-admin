const config = {
    state: {
        mode: 'light',
        tagView: true,
        collapse: false,
        fixHead: false,
        fixSide: false,
        uniqueOpen: true,
        primaryColor: '#409eff'
    },
    mutations: {
        CHANGE_COLLAPSE(state: any, collapse: boolean) {
            state.collapse = collapse
        },
        CHANGE_FIXHEAD(state: any, fixHead: boolean) {
            state.fixHead = fixHead
        },
        CHANGE_FIXSIDE(state: any, fixSide: boolean) {
            state.fixSide = fixSide
        },
        CHANGE_TAGVIEW(state: any, tagView: boolean) {
            state.tagView = tagView
        },
        CHANGE_PRIMARYCOLOR(state: any, primaryColor: string) {
            state.primaryColor = primaryColor
        },
        CHANGE_MODE(state: any, mode: string) {
            state.mode = mode
        },
        CHANGE_UNIQUEOPEN(state: any, uniqueOpen: boolean) {
            state.uniqueOpen = uniqueOpen
        }
    },
    actions: {
        changeCollapse({ commit }: any, collapse: boolean) {
            commit('CHANGE_COLLAPSE', collapse)
        },
        changeFixHead({ commit }: any, fixHead: boolean) {
            commit('CHANGE_FIXHEAD', fixHead)
        },
        changeFixSide({ commit }: any, fixSide: boolean) {
            commit('CHANGE_FIXSIDE', fixSide)
        },
        changeTagView({ commit }: any, tagView: boolean) {
            commit('CHANGE_TAGVIEW', tagView)
        },
        changeMode({ commit }: any, mode: string) {
            commit('CHANGE_MODE', mode)
        },
        changePrimaryColor({ commit }: any, primaryColor: string) {
            commit('CHANGE_PRIMARYCOLOR', primaryColor)
        },
        changeUniqueOpen({ commit }: any, uniqueOpen: boolean) {
            commit('CHANGE_UNIQUEOPEN', uniqueOpen)
        }
    }
}

export { config }
