import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
const locales = {
    [enLocale.name]: {
        el: enLocale.el,
        message: en
    },
    [zhLocale.name]: {
        el: zhLocale.el,
        message: zh
    }
}

const i18n = createI18n({
    legacy: false,
    locale: zhLocale.name,
    fallbackLocale: enLocale.name,
    messages: locales,
    silentTranslationWarn: true,
})

export const { t } = i18n.global

export default (app: any, ElementPlus: any) => {
    app.use(ElementPlus, {
        i18n: i18n.global.t
    })
    app.use(i18n)
}