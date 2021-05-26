import { computed, defineComponent, watch } from 'vue'
import { t } from '@/lang'
import { setDomTitle } from '@/utils/dom'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const i18nSwitch = defineComponent({
    name: 'I18nSwitch',
    componentName: 'ManageI18nSwitch',
    __file: '@PC/globalHeader/locale',
    setup() {
        const store: any = useStore()
        const route: any = useRoute()
        const logo = computed(() => store.state.lang.language)
        const changeLanguage = async () => {
            await store.dispatch('setLanguage', ({ en: 'zh-cn', 'zh-cn': 'en' } as any)[logo.value])
        }
        watch(() => [logo.value, route.path], () => {
            setDomTitle(t(route.meta.title))
        })
        return {
            logo,
            changeLanguage
        }
    },
    render() {
        return <span class="el-icon header-i18n"
            onClick={this.changeLanguage}>
            {({ en: 'EN', 'zh-cn': '中' } as any)[this.logo]}
        </span>
    }
})

export default i18nSwitch