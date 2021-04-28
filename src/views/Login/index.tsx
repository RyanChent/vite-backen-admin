import { defineComponent, inject, ref, reactive, getCurrentInstance, watch } from 'vue'
import pcLogin from './pc'
import mobileLogin from './mobile'
import { t } from '@/lang/index.ts'
import { isNotEmptyString } from '@/utils/types.ts'
import ElNotification from 'element-plus/lib/el-notification';
import { Notify } from 'vant';
import { useRoute } from 'vue-router'
import './style.less'
import { setDomTitle } from '@/utils/dom.ts'

const LoginPage = defineComponent({
    name: 'Login',
    componentName: 'ManageLogin',
    components: {
        pcLogin,
        mobileLogin
    },
    setup() {
        const isMobile = inject('isMobile') as any
        const { proxy }: any = getCurrentInstance()
        const store = proxy.$store
        const route = useRoute()
        const tab = ref(store.state.lang.language)
        const userObj = reactive({ username: '', passwords: '', verify: '' })
        const tabClick = () => store.dispatch('setLanguage', tab.value)
        const userLogin = async () => {
            let message = ''
            if (!isNotEmptyString(userObj.username)) {
                message = t("please.input.something") + t('username')
                !!isMobile.value ? proxy.$toast.fail(message) : proxy.$message.error(message)
                return
            }
            if (!isNotEmptyString(userObj.passwords)) {
                message = t("please.input.something") + t('password')
                !!isMobile.value ? proxy.$toast.fail(message) : proxy.$message.error(message)
                return
            }
            await store.dispatch('login', userObj)
            proxy.$router.push('/')
            proxy.$nextTick(() => {
                setTimeout(() => {
                    !!isMobile.value ? Notify({
                        type: 'success',
                        message: `${t('login.success')}，${t('welcome')}`
                    }) : ElNotification({
                        title: t('login.success'),
                        message: `${t('login.success')}，${t('welcome')}`,
                        type: 'success'
                    });
                }, 1000)
            })
        }
        watch(() => [tab.value, route.path], () => {
            setDomTitle(t(route.meta.title))
        })
        return {
            tabClick,
            tab,
            userObj,
            userLogin,
            isMobile
        }
    },
    render() {
        return !!this.isMobile ?
            <mobile-login
                userObj={this.userObj}
                tab={this.tab}
                onTabClick={this.tabClick}
                onLogin={this.userLogin}
                {...{
                    'onUpdate:userObj': (value: any) => this.userObj = value,
                    'onUpdate:tab': (value: any) => this.tab = value
                }}
            /> :
            <pc-login
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