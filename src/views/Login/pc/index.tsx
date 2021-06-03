import { defineComponent, computed, ref } from 'vue'
import { t } from '@/lang'
import OrdinaryLogin from './ordinary'
import QrcodeLogin from './qrcode'
import './style'

const lanList = ['zh-cn', 'en']

const usePcLoginProps = (props: any, emit: any) => {
    const loginMode = ref<string>('ordinary')
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
        loginMode
    }
}

const PCLoginPage = defineComponent({
    name: 'PCLogin',
    componentName: 'ManagePCLogin',
    components: {
        OrdinaryLogin,
        QrcodeLogin
    },
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
        return usePcLoginProps(props, emit)
    },
    render() {
        return (
            <section class="manage-pc-login">
                <header class="login-header">
                    <img src="/assets/logo.png" />
                    <span>vite-backen-admin</span>
                </header>
                <div class="login-form">
                    {new Array(8).fill(<span class="shinning" />)}
                    <div class="row mode-select">
                        <el-dropdown
                            trigger="click"
                            size="small"
                            onCommand={(language: string) => {
                                this.language = language
                                this.$emit('tabClick')
                            }}
                        >
                            {{
                                default: () => <i class="iconfont vite-icon-i18n" />,
                                dropdown: () => (
                                    <el-dropdown-menu>
                                        {lanList.map((lan) => (
                                            <el-dropdown-item command={lan} key={lan}>
                                                <span
                                                    class={{
                                                        primary: this.language === lan
                                                    }}
                                                    v-text={t(lan)}
                                                />
                                            </el-dropdown-item>
                                        ))}
                                    </el-dropdown-menu>
                                )
                            }}
                        </el-dropdown>
                        <i
                            class={{
                                iconfont: true,
                                'vite-icon-qrcode': this.loginMode === 'ordinary',
                                'vite-icon-laptop': this.loginMode === 'qrCode'
                            }}
                            title={t(this.loginMode === 'ordinary' ? 'qr-code-login' : 'username-login')}
                            onClick={() => this.loginMode = ({
                                ordinary: 'qrCode',
                                qrCode: 'ordinary'
                            } as any)[this.loginMode]}
                        />
                    </div>
                    {this.loginMode === 'ordinary'
                        ? <ordinary-login logining={this.logining} user={this.user} onLogin={() => this.$emit('login')} />
                        : <qrcode-login />
                    }
                </div>
            </section>
        )
    }
})

export default PCLoginPage
