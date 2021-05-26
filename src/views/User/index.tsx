import { computed, defineComponent, ref, Transition } from 'vue'
import profile from './profile'
import UserDetail from './detail'
import { copyContent, setDomTitle } from "@/utils/dom";
import { t } from '@/lang'
import { useActionHandle } from '@/hooks/actionSheet'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import './style'

const useShareProps = (store: any) => {
    const showShare = ref<any>(false)
    const userInfo = computed(() => store.state.user.userInfo)
    const options = [
        [
            { name: '微信', icon: 'wechat', key: 'wechat' },
            { name: '朋友圈', icon: 'wechat-moments', key: 'wechat-moments' },
            { name: '微博', icon: 'weibo', key: 'weibo' },
            { name: 'QQ', icon: 'qq', key: 'qq' },
            { name: 'QQ空间', key: 'qzone', icon: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1577376065,62724058&fm=26&gp=0.jpg' }
        ],
        [
            { name: '复制链接', icon: 'link', key: 'link' },
            { name: '分享海报', icon: 'poster', key: 'poster' },
            { name: '二维码', icon: 'qrcode', key: 'qrcode' },
        ],
    ];
    const ShareSelect = (options: any) => {
        switch (options.key) {
            case 'weibo':
            case 'link':
                copyContent(location.href).then(() => Toast.success('复制成功'))
                break;
            case 'poster':
            case 'qrcode':
            case 'wechat':
            case 'wechat-moments':
            case 'weibo':
            case 'qq':
                window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${location.href}?sharesource=qzone&title=${document.title}&pics=${location.origin}/favicon.ico&summary=vite-backen-cli`)
                break;
            case 'qzone':
                window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${location.href}?sharesource=qzone&title=${document.title}&pics=${location.origin}/favicon.ico&summary=vite-backen-cli`)
                break;
        }
    }
    return {
        showShare,
        userInfo,
        options,
        ShareSelect
    }
}

const UserPage = defineComponent({
    name: 'UserPageView',
    componentName: 'ManageMobileUser',
    components: {
        profile,
        UserDetail
    },
    setup() {
        const store = useStore()
        const { showShare, userInfo, options, ShareSelect } = useShareProps(store)
        const { actions, touchToShowAction, tag, showActionSheet } = useActionHandle()
        const ActionSelect = (item: any, index: number) => {
            switch (tag.value) {
                case 'lang': store.dispatch('setLanguage', item.action).then(() => {
                    setDomTitle(t('user-page'))
                    Toast(t('change-language-success'))
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
            showActionSheet,
            actions,
            tag,
            touchToShowAction,
            ActionSelect,
            ShareSelect
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
                <van-notice-bar scrollable text="移动端目前正在加紧速度开发中，敬请期待。" style="margin-top: 30px" />
                <van-share-sheet
                    v-model={[this.showShare, 'show']}
                    title="立即分享给好友"
                    options={this.options}
                    onSelect={this.ShareSelect}
                />
                <van-action-sheet
                    v-model={[this.showActionSheet, 'show']}
                    actions={this.actions}
                    cancel-text="返回"
                    close-on-popstate
                    close-on-click-action
                    onSelect={this.ActionSelect}
                />
            </section>
            <Transition enter-active-class="animated fadeIn">
                {this.showUserInfo && <user-detail userInfo={this.userInfo} v-model={this.showUserInfo} />}
            </Transition>
        </main>
    }
})

export default UserPage