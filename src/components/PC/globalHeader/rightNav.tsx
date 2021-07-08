import { computed, defineComponent, ref } from 'vue'
import { isFunction, isNotEmptyString } from '@/utils/types'
import { t } from '@/lang'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PersonDialog from './personInfo'
const rightNav = defineComponent({
  name: 'RightNav',
  componentName: 'ManageRightNav',
  __file: '@PC/globalHeader/rightNav',
  components: {
    PersonDialog
  },
  setup() {
    const personVisible = ref<any>(false)
    const store = useStore()
    const router = useRouter()
    const userInfo = computed(() => store.state.user.userInfo)
    const handleCommand = (command: string) => {
      switch (command) {
        case 'info':
          personVisible.value = true
          break
        case 'docs':
          router.replace('/docs')
          break
        case 'logout':
          router.replace('/login')
          break
      }
    }
    return {
      handleCommand,
      userInfo,
      personVisible
    }
  },
  render() {
    const slots: any = this.$slots
    return (
      <>
        <el-dropdown size="default" onCommand={this.handleCommand}>
          {{
            dropdown: () =>
              isFunction(slots.dropdown) ? (
                slots.dropdown()
              ) : (
                <el-dropdown-menu>
                  <el-dropdown-item command="info" icon="el-icon-user">
                    {t('personal-info')}
                  </el-dropdown-item>
                  <el-dropdown-item command="docs" icon="el-icon-document">
                    {t('docs')}
                  </el-dropdown-item>
                  <el-dropdown-item divided command="logout" icon="el-icon-switch-button">
                    {t('logout')}
                  </el-dropdown-item>
                </el-dropdown-menu>
              ),
            default: () => (
              <div class="person-info" aria-labelledby="user-personal-info" role="user">
                <el-avatar
                  src={
                    isNotEmptyString(this.userInfo.avatar)
                      ? this.userInfo.avatar
                      : '/assets/avatar.jpg'
                  }
                  alt="user-avatar"
                  style="width: 40px; height: 40px;"
                />
                <span>
                  {isNotEmptyString(this.userInfo.username) ? this.userInfo.username : 'Jarry Chen'}
                </span>
              </div>
            )
          }}
        </el-dropdown>
        <person-dialog v-model={this.personVisible} />
      </>
    )
  }
})

export default rightNav
