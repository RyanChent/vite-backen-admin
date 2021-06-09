import { defineComponent, ref, shallowRef } from 'vue'
import { getCommits } from '@/api/github/api'

const noop = () => {}

const useRightPreviewProps = () => {
  const active = ref<any>('timeline')
  const commitsData = shallowRef<any>([])
  getCommits().then((data: any) => {
    commitsData.value = data.map((item: any) => item.commit)
  })
  return {
    active,
    commitsData
  }
}

const rightPreview = defineComponent({
  name: 'RightPreview',
  componentName: 'ManageRightPreview',
  props: {
    parseTime: {
      type: Function,
      default: noop
    }
  },
  setup() {
    return useRightPreviewProps()
  },
  render() {
    return (
      <el-tabs v-model={this.active}>
        <el-tab-pane label="时间线" name="timeline">
          <el-timeline>
            {this.commitsData.map(({ committer, message }: any) => (
              <el-timeline-item>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: '.9rem',
                    lineHeight: '26px'
                  }}
                >
                  {message}
                </p>
                <p
                  style={{
                    lineHeight: '26px'
                  }}
                >
                  {committer.name}
                  <span style="padding: 0 7px;">提交于</span>
                  {this.parseTime(committer.date)}
                </p>
              </el-timeline-item>
            ))}
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    )
  }
})

export default rightPreview
