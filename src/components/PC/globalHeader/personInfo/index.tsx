import { defineComponent, resolveComponent, computed, inject } from 'vue'
import { useStore } from 'vuex'
import { parseTime } from '@/utils/tool'
import { t } from '@/lang'

const usePersonProps = (props: any, emit: any) => {
    const store = useStore()
    const updateRoutes = inject<any>('updateRoutes')
    const user = computed(() => store.state.user.userInfo)
    const lang = computed(() => store.state.lang.language)
    const visible = computed({
        get() {
            return props.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    })
    const role = computed({
        get() {
            return user.value.role
        },
        set(value) {
            if (value !== user.value.role) {
                Promise.all([
                    store.dispatch('setUserInfo', Object.assign({}, user.value, {
                        role: value
                    })),
                    store.dispatch('getInfo', [value])
                ]).then(() => {
                    updateRoutes()
                })
            }
        }
    })
    return {
        visible,
        user,
        lang,
        role
    }
}

const PersonDialog = defineComponent({
    name: 'PersonInfo',
    componentName: 'ManagePersonDialog',
    __file: '@PC/globalHeader/personInfo',
    props: {
        modelValue: Boolean
    },
    setup(props, { emit }: any) {
        const { user, visible, lang, role } = usePersonProps(props, emit)
        return {
            visible,
            user,
            lang,
            role
        }
    },
    render() {
        const Dialogs: any = resolveComponent('Dialogs')
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
                        <td><i class="el-icon-message" />邮箱</td>
                        <td>{this.user.email}</td>
                        <td><i class="el-icon-user" />用户名</td>
                        <td>{this.user.username}</td>
                        <td><i class="el-icon-edit-outline" />个性签名</td>
                        <td>{this.user.signature}</td>
                    </tr>
                    <tr>
                        <td><i class="el-icon-picture-outline-round" />头像</td>
                        <td><el-avatar src={this.user.avatar} /></td>
                        <td><i class="el-icon-s-check" />角色</td>
                        <td>
                            <el-select v-model={this.role} size="small" >
                                <el-option value="admin" label={t('admin')} />
                                <el-option value="customer" label={t('customer')} />
                            </el-select>
                        </td>
                        <td><i class="el-icon iconfont vite-icon-i18n" />语言</td>
                        <td>{({ 'zh-cn': '中文', en: '英文' } as any)[this.lang]}</td>
                    </tr>
                    <tr>
                        <td><i class="el-icon-magic-stick" />主题</td>
                        <td>{this.user.theme}</td>
                        <td><i class="el-icon-date" />创建日期</td>
                        <td>{parseTime(this.user.createDate)}</td>
                        <td><i class="el-icon-date" />修改日期</td>
                        <td>{parseTime(this.user.updateDate)}</td>
                    </tr>
                </tbody>
            </table>
        </Dialogs>
    }
})

export default PersonDialog