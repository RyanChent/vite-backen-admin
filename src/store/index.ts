import { createStore } from "vuex";
/**
 * @param modules
 * @description 各模块vuex
 */
const modules = Object.values(
  import.meta.globEager("./modules/*.ts")
).reduce((self, module) => {
  const [key, value] = Object.entries(module).flat(2);
  self[key] = value;
  return self;
}, {});

const vuex = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules,
});

export default vuex;
