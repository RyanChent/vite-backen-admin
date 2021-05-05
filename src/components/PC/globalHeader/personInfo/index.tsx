import { defineComponent, resolveComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { parseTime } from '@/utils/tool.ts'
const PersonDialoig = defineComponent({
    name: 'PersonInfo',
    componentName: 'ManagePersonDialog',
    props: {
        modelValue: Boolean
    },
    setup(props, { emit }: any) {
        const visible = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })
        const store = useStore()
        const user = computed(() => store.state.user.userInfo)
        const lang = computed(() => store.state.lang.language)
        return {
            visible,
            user,
            lang
        }
    },
    render() {
        const Dialogs = resolveComponent('Dialogs') as any
        return <Dialogs v-model={this.visible} title="个人信息" width={1000} showMaximize dragging>
            <header style="display: flex;justify-content: space-between">
                <p style="display: flex; align-items: center">
                    <el-avatar src={this.user.avatar} />
                    <span style="margin-left: 10px">{this.user.username}</span>
                </p>
                <el-button type="primary" size="small">修改密码</el-button>
            </header>
            <table style="margin-top: 10px" class="not-el-table">
                <tbody>
                    <tr>
                        <td><i class="el-icon-user" />邮箱</td>
                        <td>{this.user.email}</td>
                        <td><i class="el-icon-user" />用户名</td>
                        <td>{this.user.username}</td>
                        <td><i class="el-icon-user" />个性签名</td>
                        <td>{this.user.signature}</td>
                    </tr>
                    <tr>
                        <td><i class="el-icon-user" />头像</td>
                        <td><el-avatar src={this.user.avatar} /></td>
                        <td><i class="el-icon-user" />主题</td>
                        <td>{this.user.theme}</td>
                        <td><i class="el-icon-user" />语言</td>
                        <td>{({ 'zh-cn': '中文', en: '英文' } as any)[this.lang]}</td>
                    </tr>
                    <tr>
                        <td><i class="el-icon-user" />创建日期</td>
                        <td>{parseTime(this.user.createDate)}</td>
                        <td><i class="el-icon-user" />修改日期</td>
                        <td>{parseTime(this.user.updateDate)}</td>
                    </tr>
                </tbody>
            </table>
        </Dialogs>
    }
})

export default PersonDialoig