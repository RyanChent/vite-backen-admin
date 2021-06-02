import { defineComponent, ref } from 'vue'

const MessageList = defineComponent({
    name: 'MessageList',
    componentName: 'ManageMessageList',
    props: {
        message: {
            type: Object,
            default: () => ({
                notify: [],
                message: [],
                wait: []
            })
        },
        props: {
            type: Object,
            default: () => ({
                id: 'id',
                label: 'label',
                desc: 'desc',
                date: 'date',
                icon: 'icon'
            })
        }
    },
    setup() {
        const messageTag = ref<string>('notify')
        return {
            messageTag
        }
    },
    render() {
        return <el-popover placement="bottom" width={300}>
            {{
                default: () => <el-tabs stretch v-model={this.messageTag}>
                    {Array.isArray(this.message.notify) && <el-tab-pane name="notify" label="通知">
                        <el-empty description="暂无数据" />
                    </el-tab-pane>}
                    {Array.isArray(this.message.message) && <el-tab-pane name="message" label="消息">
                        <el-empty description="暂无数据" />
                    </el-tab-pane>}
                    {Array.isArray(this.message.wait) && <el-tab-pane name="wait" label="待办">
                        <el-empty description="暂无数据" />
                    </el-tab-pane>}
                </el-tabs>,
                reference: () => <el-badge is-dot type="danger">
                    <i
                        class={{
                            'header-message': true,
                            'el-icon-bell': true
                        }}
                    />
                </el-badge>
            }}
        </el-popover>
    }
})

export default MessageList