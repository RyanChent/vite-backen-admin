import { computed, defineComponent, getCurrentInstance } from 'vue'
import { t } from '@/lang/index.ts'
const i18nSwitch = defineComponent({
    name: 'i18nSwitch',
    componentName: 'ManageI18nSwitch',
    setup() {
        const { proxy } = getCurrentInstance() as any
        const store = proxy.$store
        const logo = computed(() => store.state.lang.language)
        const changeLanguage = () => {
            store.dispatch('setLanguage', ({ en: 'zh-cn', 'zh-cn': 'en' } as any)[logo.value]).then(() => {
                proxy.$message.success(t('change-language-success'))
            })
        }
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