import { defineComponent, computed } from 'vue'
import { t } from '@/lang/index.ts'
const PCLoginPage = defineComponent({
    name: 'PCLogin',
    componentName: 'ManagePCLogin',
    props: {
        tab: String,
        userObj: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }: any) {
        const language = computed({
            get() {
                return props.tab
            },
            set(value) {
                emit('update:tab', value)
            }
        })
        const user = computed({
            get() {
                return props.userObj
            },
            set(value) {
                emit('update:userObj', value)
            }
        }) as any
        return {
            language,
            user
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
                    <el-tabs v-model={this.language} onTabClick={() => this.$emit('tabClick')} >
                        <el-tab-pane label={t("zh-cn")} name="zh-cn" />
                        <el-tab-pane label={t('en')} name="en" />
                    </el-tabs>
                </div>
                <div class="row">
                    <el-input prefix-icon="el-icon-s-custom" v-model={this.user.username} placeholder={t("please.input.something", [t('username')])} />
                </div>
                <div class="row">
                    <el-input prefix-icon="el-icon-lock" v-model={this.user.passwords} placeholder={t("please.input.something", [t('password')])} show-password />
                </div>
                <div class="row">
                    <el-input prefix-icon="el-icon-picture-outline-round" v-model={this.user.verify} placeholder={t("please.input.something", [t('verify')])} />
                </div>
                <div class="row">
                    <el-button onClick={() => this.$emit('login')}>{t('login')}</el-button>
                </div>
            </div>
        </section>
    }
})

export default PCLoginPage