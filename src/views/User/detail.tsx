import { computed, defineComponent, ref, markRaw } from 'vue'
import { parseTime } from '@/utils/tool'
import { t } from '@/lang'
import { useActionHandle } from '@/hooks/actionSheet'
import { deepClone } from '@/utils/data'

const userDetailProps = (props: any, emit: any) => {
  const { actions, touchToShowAction, tag, showActionSheet } = useActionHandle()
  const copyUser = ref<any>(deepClone(markRaw(props.user)))
  const back = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })
  const ActionSelect = (item: any, index: number, callback: Function) => {
    if (tag.value === 'role') {
      if (item.action !== copyUser.value.role) {
        copyUser.value.role = item.action
        callback('部分权限改变')
        emit('update:user', copyUser.value)
      }
    }
  }
  return {
    copyUser,
    back,
    actions,
    ActionSelect,
    touchToShowAction,
    tag,
    showActionSheet
  }
}

const userDetail = defineComponent({
  name: 'userDetail',
  componentName: 'ManageUserDetail',
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }: any) {
    return userDetailProps(props, emit)
  },
  render() {
    return (
      <section class="user-page-detail">
        <van-cell center title="头像" is-link>
          {{
            default: () => (
              <van-image
                width={70}
                fit="cover"
                height={70}
                src={this.copyUser.avatar}
                radius={19}
                style="border: solid 1px #d9d9d9"
              >
                {{
                  loading: () => <van-loading type="spinner" size="20" />,
                  error: () => <span>加载失败</span>
                }}
              </van-image>
            )
          }}
        </van-cell>
        <van-cell center title="名字" value={this.copyUser.username} is-link />
        <van-cell
          center
          title="角色"
          value={t(this.copyUser.role)}
          is-link
          onClick={(e: MouseEvent) => {
            this.touchToShowAction(
              e,
              [
                { name: t('admin'), action: 'admin' },
                { name: t('customer'), action: 'customer' }
              ],
              'role'
            )
          }}
        />
        <van-cell center title="个性签名" value={this.copyUser.signature} is-link />
        <van-cell center title="邮箱" value={this.copyUser.email} is-link />
        <van-cell center title="创建日期" value={parseTime(this.copyUser.createDate)} />
        <van-cell center title="修改日期" value={parseTime(this.copyUser.updateDate)} />
        <van-button
          plain
          hairline
          block
          round
          type="primary"
          style={{
            margin: '40px 16px 0',
            width: 'calc(100% - 32px)'
          }}
          onClick={() => (this.back = false)}
        >
          返回
        </van-button>
        <van-action-sheet
          v-model={[this.showActionSheet, 'show']}
          position="bottom"
          actions={this.actions}
          cancel-text="返回"
          close-on-popstate
          close-on-click-action
          onSelect={(item: any, index: number) =>
            this.ActionSelect(item, index, (this as any).$toast)
          }
        />
      </section>
    )
  }
})

export default userDetail
