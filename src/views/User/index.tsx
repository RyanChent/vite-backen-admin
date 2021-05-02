import { computed, defineComponent, getCurrentInstance, ref, Transition } from 'vue'
import profile from './profile'
import UserDetail from './detail'
import './style.less'
import { t } from '@/lang/index.ts'
import { setDomTitle } from '../../utils/dom'
const UserPage = defineComponent({
    name: 'UserPageView',
    componentName: 'ManageMobileUser',
    components: {
        profile,
        UserDetail
    },
    setup() {
        const { proxy }: any = getCurrentInstance()
        const showShare = ref<any>(false)
        const showAction = ref<any>(false)
        const flag = ref<any>('')
        const store = proxy.$store
        const userInfo = computed(() => store.state.user.userInfo)
        const actions = ref([])
        const options = [
            [
                { name: '微信', icon: 'wechat' },
                { name: '朋友圈', icon: 'wechat-moments' },
                { name: '微博', icon: 'weibo' },
                { name: 'QQ', icon: 'qq' },
            ],
            [
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
                { name: '小程序码', icon: 'weapp-qrcode' },
            ],
        ];
        const touchToShowAction = (e: MouseEvent, newactions: any, newflag: string) => {
            e.stopPropagation()
            actions.value = newactions
            flag.value = newflag
            showAction.value = true
        }
        const ActionSelect = (item: any, index: number) => {
            switch (flag.value) {
                case 'lang': store.dispatch('setLanguage', item.action).then(() => {
                    setDomTitle(t('user-page'))
                    proxy.$toast(t('change-language-success'))
                })
                    break;
                case 'color': break;
            }
        }
        return {
            showShare,
            options,
            userInfo,
            showUserInfo: ref<any>(false),
            showAction,
            actions,
            flag,
            touchToShowAction,
            ActionSelect
        }
    },
    render() {
        return <main>
            <section class="user-page" style={{ display: this.showUserInfo ? 'none' : 'block' }}>
                <profile userInfo={this.userInfo} v-model={this.showUserInfo} />
                <van-cell
                    center
                    title="多语言"
                    is-link
                    onClick={(e: MouseEvent) =>
                        this.touchToShowAction(e, [
                            { name: t('zh-cn'), action: 'zh-cn' },
                            { name: t('en'), action: 'en' }
                        ], 'lang')
                    }
                />
                <van-cell center title="主题色" is-link />
                <van-cell center title="分享" onClick={() => this.showShare = true} is-link />
                <van-cell center title="建议与反馈" is-link />
                <van-cell center title="退出登录" is-link to="/login" />
                <van-share-sheet
                    show={this.showShare}
                    title="立即分享给好友"
                    options={this.options}
                    {...{
                        'onUpdate:show': (value: boolean) => this.showShare = value
                    }}
                />
                <van-action-sheet
                    show={this.showAction}
                    actions={this.actions}
                    cancel-text="返回"
                    close-on-popstate
                    close-on-click-action
                    {...{
                        onSelect: this.ActionSelect,
                        'onUpdate:show': (value: boolean) => this.showAction = value
                    }}
                />
            </section>
            <Transition enter-active-class="animated fadeIn">
                {this.showUserInfo && <user-detail userInfo={this.userInfo} v-model={this.showUserInfo} />}
            </Transition>
        </main>
    }
})

export default UserPage