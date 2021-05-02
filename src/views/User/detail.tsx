import { computed, defineComponent } from 'vue'
import { parseTime } from '@/utils/tool.ts'

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
        const back = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })
        return {
            back
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
                onClick={() => this.back = false}>返回</van-button>
        </section>
    }
})

export default userDetail