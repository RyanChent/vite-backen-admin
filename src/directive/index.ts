import { isNotEmptyString } from '@/utils/types'
import { ClickOutside } from 'element-plus/es/directives'
export default (app: any): void => {
  Object.entries(import.meta.globEager('./actions/*.ts')).forEach((action) => {
    const [key, { default: directive }] = action.flat(2) as any
    if (isNotEmptyString(directive.name)) {
      app.directive(directive.name, directive)
    } else {
      app.directive(key.slice(key.lastIndexOf('/') + 1), directive)
    }
  })
  app.directive('click-outside', ClickOutside)
}
