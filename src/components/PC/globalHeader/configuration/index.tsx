import { defineComponent } from 'vue'
import colorPicker from '../colorPicker'
import { t } from '@/lang'
import { useStore } from 'vuex'
import { useConfiguration } from '@/hooks/configuration'
import './style'

const configuration = defineComponent({
    name: 'Configuration',
    componentName: 'ManageConfiguration',
    components: {
        colorPicker
    },
    setup(props) {
        const store = useStore()
        return useConfiguration(props, store)
    },
    render() {
        return (
            <>
                <i
                    class="el-icon-share config-theme"
                    title={t('vite-backen-config')}
                    onClick={() => (this.drawer = true)}
                />
                <el-drawer
                    title={t('vite-backen-config')}
                    v-model={this.drawer}
                    direction="rtl"
                    append-to-body
                    custom-class="theme-config-drawer"
                    destroy-on-close
                    size="20%"
                >
                    <ul class="theme-config-panel">
                        <li>
                            <span class="desc">模式：</span>
                            <el-switch
                                class="mode-switch"
                                active-value="light"
                                active-color="#FFD700"
                                active-icon-class="iconfont vite-icon-sun"
                                inactive-value="dark"
                                inactive-color="#8DEEEE"
                                inactive-icon-class="iconfont vite-icon-moon"
                                v-model={this.mode}
                            />
                        </li>
                        <li>
                            <span class="desc">主题色：</span>
                            <colorPicker />
                        </li>
                        <li>
                            <span class="desc">导航栏模式：</span>
                            <section class="nav-mode">
                                <el-tooltip effect="dark" placement="top" content={t('left-menu')}>
                                    <div class="left" />
                                </el-tooltip>
                                <el-tooltip effect="dark" placement="top" content={t('top-menu')}>
                                    <div class="top" />
                                </el-tooltip>
                            </section>
                        </li>
                        <li>
                            <span class="desc">标签视图：</span>
                            <el-switch v-model={this.tagView} />
                        </li>
                        <li>
                            <span class="desc">折叠菜单：</span>
                            <el-switch v-model={this.collapse} />
                        </li>
                        <li>
                            <span class="desc">手风琴模式：</span>
                            <el-switch v-model={this.uniqueOpen} />
                        </li>
                        <li>
                            <span class="desc">固定顶部：</span>
                            <el-switch v-model={this.fixHead} />
                        </li>
                        <li>
                            <span class="desc">固定侧栏：</span>
                            <el-switch v-model={this.fixSide} />
                        </li>
                    </ul>
                </el-drawer>
            </>
        )
    }
})

export default configuration
