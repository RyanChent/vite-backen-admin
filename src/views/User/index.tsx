import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import './style.less'
const UserPage = defineComponent({
    name: 'UserPageView',
    componentName: 'ManageMobileUser',
    setup() {
        const showShare = ref<any>(false)
        const store = useStore()
        const userInfo = computed(() => store.state.user.userInfo)
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
        return {
            showShare,
            options,
            userInfo
        }
    },
    render() {
        return <section class="user-page">
            <header>
                <img src={this.userInfo.avatar} />
                <div class="desc">
                    <p><b>{this.userInfo.username}</b></p>
                    <p>邮箱：{this.userInfo.email}</p>
                </div>
            </header>
            <van-cell center title="个人信息" />

            <van-cell center title="分享" onClick={() => this.showShare = true} />
            <van-cell center title="建议与反馈" />
            <van-cell center title="退出登录" is-link to="/login" />
            <van-share-sheet
                show={this.showShare}
                title="立即分享给好友"
                options={this.options}
                {...{
                    'onUpdate:show': (value: any) => this.showShare = value
                }}
            />
        </section>
    }
})

export default UserPage