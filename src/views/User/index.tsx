import { defineComponent, ref, Transition } from 'vue'
import profile from './profile'
import UserDetail from './detail'
import ColorPicker from '@PC/globalHeader/colorPicker'
import { setDomTitle } from '@/utils/dom'
import { t } from '@/lang'
import { useActionHandle } from '@/hooks/actionSheet'
import { useMobilePersonProps } from '@/hooks/userInfo'
import { Toast } from 'vant'
import './style'

const UserPage = defineComponent({
  name: 'UserPageView',
  componentName: 'ManageMobileUser',
  components: {
    profile,
    UserDetail,
    ColorPicker: defineComponent(ColorPicker)
  },
  setup(props: any, { emit }: any) {
    const { showShare, user, options, ShareSelect } = useMobilePersonProps(props, emit)
    const { actions, touchToShowAction, tag, showActionSheet } = useActionHandle()
    const ActionSelect = (item: any, index: number) => {
      switch (tag.value) {
        case 'lang':
          if (user.value.lang !== item.action) {
            user.value.lang = item.action
            setDomTitle(t('user-page'))
            Toast(t('change-language-success'))
          }
          break
        case 'color':
          break
      }
    }
    return {
      showShare,
      options,
      user,
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
    return (
      <main>
        <section class="user-page" style={{ display: this.showUserInfo ? 'none' : 'block' }}>
          <profile user={this.user} v-model={this.showUserInfo} />
          <van-cell
            center
            title="多语言"
            is-link
            onClick={(e: MouseEvent) =>
              this.touchToShowAction(
                e,
                [
                  { name: t('zh-cn'), action: 'zh-cn' },
                  { name: t('en'), action: 'en' }
                ],
                'lang'
              )
            }
          />
          <van-cell center title="主题色" class="theme-color">
            <ColorPicker />
          </van-cell>
          <van-cell center title="分享" onClick={() => (this.showShare = true)} is-link />
          <van-cell center title="建议与反馈" is-link />
          <van-cell center title="退出登录" is-link to="/login" />
          <van-notice-bar
            scrollable
            text="移动端目前正在加紧速度开发中，敬请期待。"
            style="margin-top: 30px"
          />
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
          {this.showUserInfo && (
            <user-detail vModel={[this.user, 'user']} v-model={this.showUserInfo} />
          )}
        </Transition>
      </main>
    )
  }
})

export default UserPage
