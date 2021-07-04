import { defineComponent, resolveComponent } from 'vue'
import { useDashBoardProps } from '@/hooks/dashboard'
import './style'

const profileInfo = function (this: any) {
  return (
    <>
      <el-tooltip effect="dark" content={`Domain：${location.origin}`} placement="top-start">
        <el-card header="访问量" class="small-card">
          <div class="card-content">
            <span
              id="busuanzi_value_site_pv"
              v-loading={true}
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
              element-loading-spinner="el-icon-loading"
            />
            <i class="el-icon-s-check" />
          </div>
        </el-card>
      </el-tooltip>
      <el-tooltip effect="dark" content={`Domain：${location.origin}`} placement="top-start">
        <el-card header="白屏时间" class="small-card">
          <div class="card-content">
            <span>{this.performanceShow.white} ms</span>
            <i class="el-icon-timer" />
          </div>
        </el-card>
      </el-tooltip>
    </>
  )
}

const projectCommit = function (this: any) {
  const Echarts: any = resolveComponent('Echarts')
  return (
    <el-card
      class="echarts-card"
      v-loading={this.chartLoading}
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0.7)"
      element-loading-text="统计图加载中，请稍候"
      onContextmenu={(e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      {this.commitEcharts.xAxis.data.length > 0 ? (
        <Echarts
          domId="github-repo-commit"
          width="100%"
          height="475px"
          options={this.commitEcharts}
        />
      ) : (
        <el-empty description="接口调用频繁，请稍后再试" />
      )}
    </el-card>
  )
}

const DashBoard = defineComponent({
  name: 'DashBoard',
  componentName: 'ManagePCDashBoard',
  setup(props: any) {
    return useDashBoardProps(props)
  },
  render() {
    return (
      <div class="manage-dashboard-page">
        {profileInfo.call(this)}
        {projectCommit.call(this)}
      </div>
    )
  }
})

export default DashBoard
