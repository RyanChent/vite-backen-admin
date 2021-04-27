import { defineComponent, computed } from 'vue'
import { t } from '@/lang/index.ts'
const mobileLoginPage = defineComponent({
    name: 'mobileLogin',
    componentName: 'ManageMobileLogin',
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
        return <section class="manage-mobile-login">
            <span class="shinning" />
            <span class="shinning" />
            <span class="shinning" />
            <span class="shinning" />
            <header class="login-header">
                <img src="/assets/logo.png" />
                <span>vite-backen-admin</span>
            </header>
            <div class="login-form">
                <div class="row">
                    <van-radio-group v-model={this.language} onChange={() => this.$emit('tabClick')} direction="horizontal">
                        <van-radio name="zh-cn">{t("zh-cn")}</van-radio>
                        <van-radio name="en">{t("en")}</van-radio>
                    </van-radio-group>
                </div>
                <div class="row" style="margin-top: 20px;">
                    <van-field
                        left-icon="user-circle-o"
                        clearable
                        colon
                        center
                        required
                        v-model={this.user.username}
                        placeholder={t("please.input.something") + t('username')}
                        onClear={() => this.user.username = ''}
                    />
                </div>
                <div class="row">
                    <van-field
                        left-icon="closed-eye"
                        clearable
                        colon
                        center
                        required
                        v-model={this.user.passwords}
                        type="password"
                        placeholder={t("please.input.something") + t('password')}
                        onClear={() => this.user.passwords = ''}
                    />
                </div>
                <div class="row">
                    <van-field
                        left-icon="qr"
                        clearable
                        colon
                        center
                        required
                        v-model={this.user.verify}
                        placeholder={t("please.input.something") + t('verify')}
                        onClear={() => this.user.verify = ''}
                    />
                </div>
                <div class="row">
                    <van-button
                        color="linear-gradient(102deg,#50bad1 0%,#00779f 100%),linear-gradient(#00789f,#00789f)"
                        text={t('login')}
                        round
                        icon="sign"
                        onClick={() => this.$emit('login')}
                    />
                </div>
            </div>
        </section>
    }
})

export default mobileLoginPage