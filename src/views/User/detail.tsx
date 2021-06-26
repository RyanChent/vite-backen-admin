import { computed, defineComponent, ref, markRaw, resolveComponent } from 'vue'
import { parseTime } from '@/utils/tool'
import { t } from '@/lang'
import { useActionHandle } from '@/hooks/actionSheet'
import { deepClone } from '@/utils/data'
import { isNotEmptyString } from '@/utils/types'

const mapRelate: any = {
  username: '名字',
  signature: '签名',
  email: '邮箱'
}

const useDetailProps = (props: any, emit: any) => {
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
        Object.assign(copyUser.value, {
          role: item.action,
          updateDate: parseTime(new Date())
        })
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
    showActionSheet,
    showAvatar: ref<any>(false)
  }
}

const ActionSheet = function (this: any) {
  return (
    <van-action-sheet
      v-model={[this.showActionSheet, 'show']}
      {...Object.assign(
        {
          position: 'bottom',
          'cancel-text': '返回',
          'close-on-popstate': true,
          'close-on-click-action': true
        },
        this.actions.length && {
          actions: this.actions,
          onSelect: (item: any, index: number) =>
            this.ActionSelect(item, index, (this as any).$toast)
        }
      )}
    >
      {this.tag !== 'role' && (
        <div>
          <van-field
            label={mapRelate[this.tag]}
            v-model={this.copyUser[this.tag]}
            placeholder={`请输入${mapRelate[this.tag]}`}
            size="large"
            center
            colon
            label-width="80px"
            label-align="center"
            clearable
          />
          <van-button
            class="van-action-sheet__cancel"
            plain
            type="primary"
            onClick={(e: MouseEvent) => {
              e.stopPropagation()
              if (this.copyUser[this.tag] !== this.user[this.tag]) {
                this.copyUser.updateDate = parseTime(new Date())
                this.$emit('update:user', this.copyUser)
              }
              this.showActionSheet = false
            }}
          >
            确定
          </van-button>
        </div>
      )}
    </van-action-sheet>
  )
}

const UserAvatar = function (this: any) {
  const MobileUpload: any = resolveComponent('MobileUpload')
  return (
    <>
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
              onClick={(e: MouseEvent) => {
                e.stopPropagation()
                this.showAvatar = true
              }}
            >
              {{
                loading: () => <van-loading type="spinner" size="20" />,
                error: () => <span>加载失败</span>
              }}
            </van-image>
          )
        }}
      </van-cell>
      <van-dialog
        v-model={[this.showAvatar, 'show']}
        showConfirmButton={false}
        closeOnClickOverlay
        class="avatar-upload-dialog"
      >
        <MobileUpload
          {...{
            modelValue: [
              isNotEmptyString(this.copyUser.avatar) && {
                url: this.copyUser.avatar
              }
            ],
            maxCount: 1,
            'onUpdate:modelValue': (value: any) => {
              Object.assign(this.copyUser, {
                avatar: value[0]?.url ?? value[0]?.content,
                updateDate: parseTime(new Date())
              })
              if (isNotEmptyString(this.copyUser.avatar)) {
                this.$emit('update:user', this.copyUser)
                this.showAvatar = false
              }
            }
          }}
        />
      </van-dialog>
    </>
  )
}

const UserDetail = defineComponent({
  name: 'UserDetail',
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
    return useDetailProps(props, emit)
  },
  render() {
    return (
      <section class="user-page-detail">
        {UserAvatar.call(this)}
        <van-cell
          center
          title="名字"
          value={this.copyUser.username}
          is-link
          onClick={() => {
            this.tag = 'username'
            this.showActionSheet = true
          }}
        />
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
        <van-cell
          center
          title="个性签名"
          value={this.copyUser.signature}
          is-link
          onClick={() => {
            this.tag = 'signature'
            this.showActionSheet = true
          }}
        />
        <van-cell
          center
          title="邮箱"
          value={this.copyUser.email}
          is-link
          onClick={() => {
            this.tag = 'email'
            this.showActionSheet = true
          }}
        />
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
        {ActionSheet.call(this)}
      </section>
    )
  }
})

export default UserDetail
