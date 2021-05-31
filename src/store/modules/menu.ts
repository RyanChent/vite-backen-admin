const menus = {
  state: {
    collapse: false
  },
  mutations: {
    CHANGE_COLLAPSE(state: any, collapse: boolean) {
      state.collapse = collapse
    }
  },
  actions: {
    changeCollapse({ commit }: any, collapse: boolean) {
      commit('CHANGE_COLLAPSE', collapse)
    }
  }
}

export { menus }
