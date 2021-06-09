import { defineComponent } from 'vue'
import { useDashBoardProps } from '@/hooks/dashboard'
import './style'

const DashBoard = defineComponent({
    name: 'DashBoard',
    componentName: 'ManagePCDashBoard',
    setup(props: any) {
        useDashBoardProps(props)
    },
    render() {
        return <div class="manage-dashboard-page">
            <el-tooltip effect="dark" content={`Domain：${location.origin}`} placement="top-start">
                <el-card header="访问量" class="small-card">
                    <div class="card-content">
                        <span
                            id="busuanzi_value_site_pv"
                            v-loading={true}
                            element-loading-text="加载中"
                            element-loading-spinner="el-icon-loading"
                        />
                        <i class="el-icon-s-custom" />
                    </div>
                </el-card>
            </el-tooltip>
            <el-tooltip effect="dark" content={`Domain：${location.origin}`} placement="top-start">
                <el-card header="访问数" class="small-card">
                    <div class="card-content">
                        <span
                            id="busuanzi_value_site_uv"
                            v-loading={true}
                            element-loading-text="加载中"
                            element-loading-spinner="el-icon-loading"
                        />
                        <i class="el-icon-s-check" />
                    </div>
                </el-card>
            </el-tooltip>
        </div>
    }
})

export default DashBoard