import { isNotEmptyString } from '@/utils/types'
import excludeArray from '@/data/excludeComponent'

export default (app: any) => {
  const components = {
    tsx: import.meta.globEager('./**/*.tsx'),
    vue: import.meta.globEager('./**/*.vue')
  }
  Object.values({ ...components.tsx, ...components.vue }).forEach(({ default: component }) => {
    const { name, componentName } = component
    let globalName: string = ''
    if (isNotEmptyString(name) && isNotEmptyString(componentName)) {
      globalName = name.length > componentName.length ? componentName : name
    } else {
      globalName = name || componentName
    }
    if (!excludeArray.includes(globalName)) {
      app.component(globalName, component)
    }
  })
}
