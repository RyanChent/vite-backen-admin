import { defineComponent, onMounted, TransitionGroup } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import RightContextMenu from '@PC/ContextMenus'
import Collapse from './Collapse'
import { useHandleTag, useHandleRightButton, useHandleScrollMenu } from '@/hooks/multitab'
import { t } from '@/lang'
import './style'

const MultiTab = defineComponent({
  name: 'MultiTab',
  componentName: 'ManageMultiTab',
  __file: '@PC/MultiTab',
  components: {
    RightContextMenu: defineComponent(RightContextMenu),
    Collapse
  },
  props: {
    multiTab: {
      type: Boolean,
      default: false
    },
    pageClass: {
      type: String,
      default: 'backen-admin-pc-content'
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const { menus, openRoutes, top, left, visible, currentTag, closeTag, rightClickTag, tagView } =
      useHandleTag(router, store)
    const { webPageFull, togglePageFull } = useHandleRightButton(props)
    const { headMenu, wheelScroll } = useHandleScrollMenu()
    onMounted(() => {
      headMenu.value.$el.addEventListener('wheel', wheelScroll)
    })
    return {
      openRoutes,
      closeTag,
      webPageFull,
      togglePageFull,
      rightClickTag,
      headMenu,
      top,
      left,
      menus,
      visible,
      currentTag,
      tagView
    }
  },
  render() {
    return (
      <section class="manage-head-multitab">
        <RightContextMenu
          v-model={[this.visible, 'visible']}
          {...{
            top: this.top,
            left: this.left,
            menus: this.menus
          }}
        />
        <div class="left-tags">
          {(this as any).$store.state.config.navMode === 'vertical' && <Collapse />}
          <TransitionGroup
            ref={(el: any) => el && (this.headMenu = el)}
            tag="div"
            enterActiveClass="animated fadeInDown"
            leaveActiveClass="animated fadeOutUp"
          >
            {this.tagView &&
              this.openRoutes.map((item: any, index: number) => (
                <el-tag
                  key={item.path}
                  closable={index > 0}
                  onClose={() => this.closeTag(index, item.path)}
                  onClick={() => this.$router.replace(item.path)}
                  onContextmenu={(e: MouseEvent) => this.rightClickTag(e, item)}
                  title={t(item.title)}
                  class={{
                    selected: this.$route.path === item.path
                  }}
                >
                  {t(item.title)}
                </el-tag>
              ))}
          </TransitionGroup>
        </div>
        <div class="right-buttons">
          <i
            class={{
              'el-icon': true,
              iconfont: true,
              'vite-icon-webfull-reset': this.webPageFull,
              'vite-icon-webfull': !this.webPageFull
            }}
            title={this.webPageFull ? '??????' : '????????????'}
            onClick={() => this.togglePageFull(this.pageClass)}
          />
        </div>
      </section>
    )
  }
})

export default MultiTab
