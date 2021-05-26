import { defineComponent, computed, ref } from 'vue'
import { t } from '@/lang/index.ts'
const mobileLoginPage = defineComponent({
    name: 'mobileLogin',
    componentName: 'ManageMobileLogin',
    props: {
        tab: String,
        userObj: {
            type: Object,
            default: () => ({})
        },
        logining: {
            type: Boolean,
            default: false
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
        const user = computed<any>({
            get() {
                return props.userObj
            },
            set(value) {
                emit('update:userObj', value)
            }
        })
        return {
            language,
            user,
            password: ref<any>('password')
        }
    },
    render() {
        return <section class="manage-mobile-login">
            {new Array(8).fill(<span class="shinning" />)}
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
                        clearable
                        colon
                        center
                        required
                        v-model={this.user.passwords}
                        type={this.password}
                        placeholder={t("please.input.something") + t('passwords')}
                        onClear={() => this.user.passwords = ''}
                    >
                        {
                            {
                                'left-icon': () => <van-icon name={this.password === 'password' ? 'closed-eye' : 'eye-o'}
                                    onTouchstart={(e: TouchEvent) => {
                                        e.stopPropagation()
                                        this.password = this.password === 'password' ? 'text' : 'password'
                                    }
                                    } />
                            }
                        }
                    </van-field>
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
                        loading={this.logining}
                        loading-text="登陆中..."
                        icon="sign"
                        onTouchstart={() => this.$emit('login')}
                    />
                </div>
            </div>
        </section>
    }
})

export default mobileLoginPage