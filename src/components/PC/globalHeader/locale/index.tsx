import { computed, defineComponent, watch } from 'vue'
import { t } from '@/lang/index.ts'
import { setDomTitle } from '@/utils/dom.ts'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const i18nSwitch = defineComponent({
    name: 'I18nSwitch',
    componentName: 'ManageI18nSwitch',
    setup() {
        const store = useStore() as any
        const route = useRoute() as any
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