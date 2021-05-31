import { defineComponent, ref } from 'vue'
import colorPicker from '../colorPicker'
import { t } from '@/lang'
import './style'

const useConfigurationProps = (props: any) => {
    const drawer = ref<boolean>(false)
    return {
        drawer
    }
}

const configuration = defineComponent({
    name: 'Configuration',
    componentName: 'ManageConfiguration',
    components: {
        colorPicker
    },
    setup(props) {
        const { drawer } = useConfigurationProps(props)
        return {
            drawer
        }
    },
    render() {
        return <>
            <i
                class="el-icon-share config-theme"
                title={t('vite-backen-config')}
                onClick={() => this.drawer = true}
            />
            <el-drawer
                title={t('vite-backen-config')}
                v-model={this.drawer}
                direction='rtl'
                append-to-body
                custom-class="theme-config-drawer"
                destroy-on-close
                size="20%"
            >
                <ul class="theme-config-panel">
                    <li>
                        <span class="desc">模式：</span>
                        <el-switch />
                    </li>
                    <li>
                        <span class="desc">主题色：</span>
                        <colorPicker />
                    </li>
                    <li>
                        <span class="desc">导航栏模式：</span>
                    </li>
                    <li>
                        <span class="desc">标签视图：</span>
                        <el-switch />
                    </li>
                    <li>
                        <span class="desc">折叠菜单：</span>
                        <el-switch />
                    </li>
                    <li>
                        <span class="desc">固定顶部：</span>
                        <el-switch />
                    </li>
                    <li>
                        <span class="desc">固定侧栏：</span>
                        <el-switch />
                    </li>
                </ul>
            </el-drawer>
        </>
    }
})

export default configuration