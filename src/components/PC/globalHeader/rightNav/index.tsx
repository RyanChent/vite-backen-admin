import { computed, defineComponent } from 'vue'
import { isFunction, isNotEmptyString } from '@/utils/types.ts'
import { t } from '@/lang/index.ts'
import { useStore } from 'vuex'

const rightNav = defineComponent({
    name: 'rightNav',
    componentName: 'ManageRightNav',
    setup() {
        const store = useStore()
        const userInfo = computed(() => store.state.user.userInfo)
        const handleCommand = (command: string) => {
            switch (command) {
                case 'logout': store.dispatch('logout');
                    break;
            }
        }
        return {
            handleCommand,
            userInfo
        }
    },
    render() {
        const slots = this.$slots as any
        return <el-dropdown size="small" onCommand={this.handleCommand}>
            {
                {
                    dropdown: () => isFunction(slots.dropdown) ? slots.dropdown() : <el-dropdown-menu>
                        <el-dropdown-item command="info" icon="el-icon-user">{t('personal-info')}</el-dropdown-item>
                        <el-dropdown-item divided command="logout" icon="el-icon-switch-button">{t('logout')}</el-dropdown-item>
                    </el-dropdown-menu>,
                    default: () => <div class="person-info">
                        <el-avatar src={isNotEmptyString(this.userInfo.avatar) ? this.userInfo.avatar : "/assets/avatar.jpg"} />
                        <span>{isNotEmptyString(this.userInfo.username) ? this.userInfo.username : 'Jarry Chen'}</span>
                    </div>
                }
            }
        </el-dropdown>
    }
})

export default rightNav