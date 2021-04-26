import { defineComponent, inject, ref, reactive, getCurrentInstance } from 'vue'
import pcLogin from './pc'
import { t } from '@/lang/index.ts'
import { isNotEmptyString } from '@/utils/types.ts'
import './style.less'

const LoginPage = defineComponent({
    name: 'Login',
    componentName: 'ManageLogin',
    components: {
        pcLogin
    },
    setup() {
        const isMobile = inject('isMobile') as any
        const { proxy }: any = getCurrentInstance()
        const store = proxy.$store
        const tab = ref(store.state.lang.language)
        const userObj = reactive({ username: '', passwords: '', verify: '' })
        const tabClick = () => store.dispatch('setLanguage', tab.value)
        const userLogin = async () => {
            if (!isNotEmptyString(userObj.username)) {
                proxy.$message.error(t("please.input.something", [t('username')]))
                return
            }
            if (!isNotEmptyString(userObj.passwords)) {
                proxy.$message.error(t("please.input.something", [t('passowrd')]))
                return
            }
            await store.dispatch('login', userObj)
            proxy.$router.push('/')
        }
        return {
            tabClick,
            tab,
            userObj,
            userLogin,
            isMobile
        }
    },
    render() {
        return !!this.isMobile ? null : <pc-login
            userObj={this.userObj}
            tab={this.tab}
            onTabClick={this.tabClick}
            onLogin={this.userLogin}
            {...{
                'onUpdate:userObj': (value: any) => this.userObj = value,
                'onUpdate:tab': (value: any) => this.tab = value
            }}
        />
    }
})

export default LoginPage