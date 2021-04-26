import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { t } from '@/lang/index.ts'
const PCLoginPage = defineComponent({
    name: 'PCLogin',
    componentName: 'ManagePCLogin',
    setup() {
        const store = useStore()
        const tab = ref(store.state.lang.language)
        const userObj = reactive({ username: '', password: '', verify: '' })
        const tabClick = () => store.dispatch('setLanguage', tab.value)
        const userLogin = () => {

        }
        return {
            tabClick,
            tab,
            userObj,
            userLogin
        }
    },
    render() {
        return <section class="manage-pc-login">
            <header class="login-header">
                <img src="/assets/logo.png" />
                <span>vite-backen-admin</span>
            </header>
            <div class="login-form">
                <span class="shinning" />
                <span class="shinning" />
                <span class="shinning" />
                <span class="shinning" />
                <div class="row">
                    <el-tabs v-model={this.tab} onTabClick={this.tabClick} >
                        <el-tab-pane label={t("zh-cn")} name="zh-cn" />
                        <el-tab-pane label={t('en')} name="en" />
                    </el-tabs>
                </div>
                <div class="row">
                    <el-input prefix-icon="el-icon-s-custom" v-model={this.userObj.username} placeholder={t("please.input.something", [t('username')])} />
                </div>
                <div class="row">
                    <el-input prefix-icon="el-icon-lock" v-model={this.userObj.password} placeholder={t("please.input.something", [t('password')])} show-password />
                </div>
                <div class="row">
                    <el-input prefix-icon="el-icon-picture-outline-round" v-model={this.userObj.verify} placeholder={t("please.input.something", [t('verify')])} />
                </div>
                <div class="row">
                    <el-button>{ t('login')}</el-button>
                </div>
            </div>
        </section>
    }
})

export default PCLoginPage