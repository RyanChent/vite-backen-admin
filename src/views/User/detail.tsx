import { computed, defineComponent, inject, getCurrentInstance } from 'vue'
import { parseTime } from '@/utils/tool.ts'
import { t } from '@/lang/index.ts'
import { useActionHandle } from '@/hooks/actionSheet.ts'

const userDetail = defineComponent({
    name: 'userDetail',
    componentName: 'ManageUserDetail',
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        },
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }: any) {
        const { proxy }: any = getCurrentInstance()
        const { actions, touchToShowAction, tag, showActionSheet } = useActionHandle()
        const updateRoutes = inject<any>('updateRoutes')
        const store = proxy.$store
        const back = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })
        const ActionSelect = async (item: any, index: number) => {
            switch (tag.value) {
                case 'role':
                    if (item.action !== props.userInfo.role) {
                        await Promise.all([
                            store.dispatch('setUserInfo', Object.assign({}, props.userInfo, {
                                role: item.action
                            })),
                            store.dispatch('getInfo', [item.action])
                        ]).then(() => {
                            proxy.$toast('部分权限改变')
                            updateRoutes()
                        })
                    }
                    break;
            }
        }
        return {
            back,
            actions,
            touchToShowAction,
            tag,
            showActionSheet,
            ActionSelect
        }
    },
    render() {
        return <section class="user-page-detail">
            <van-cell center title="头像" is-link >
                {{
                    default: () => <van-image
                        width={70}
                        fit="cover"
                        height={70}
                        src={this.userInfo.avatar}
                        radius={19}
                        style="border: solid 1px #d9d9d9"
                    >
                        {
                            {
                                loading: () => <van-loading type="spinner" size="20" />,
                                error: () => <span>加载失败</span>
                            }
                        }
                    </van-image>,
                }}
            </van-cell>
            <van-cell center title="名字" value={this.userInfo.username} is-link />
            <van-cell
                center
                title="角色"
                value={t(this.userInfo.role)}
                is-link
                onClick={(e: MouseEvent) => {
                    this.touchToShowAction(e, [
                        { name: t('admin'), action: 'admin' },
                        { name: t('customer'), action: 'customer' }
                    ], 'role')
                }}
            />
            <van-cell center title="个性签名" value={this.userInfo.signature} is-link />
            <van-cell center title="邮箱" value={this.userInfo.email} is-link />
            <van-cell center title="创建日期" value={parseTime(this.userInfo.createDate)} />
            <van-cell center title="修改日期" value={parseTime(this.userInfo.updateDate)} />
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
                onClick={() => this.back = false}
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
                onSelect={this.ActionSelect}
            />
        </section>
    }
})

export default userDetail