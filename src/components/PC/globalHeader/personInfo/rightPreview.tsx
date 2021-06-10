import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { getCommits } from '@/api/github/api'
import { domScroll } from '@/utils/dom'

let domScrollHandler: any = null

const noop = () => {}

const useTimeLineHandle = () => {
  const timelineLoading = ref<boolean>(false)
  const commitsData = shallowRef<any>([])
  const finished = ref<boolean>(false)
  let page = 0
  const getCommitsData = () => {
    timelineLoading.value = true
    page += 1
    getCommits({ page })
      .then((data: any) => {
        finished.value = data.length === 0
        if (data.length > 0) {
          commitsData.value = [...commitsData.value, ...data.map((item: any) => item.commit)]
        }
      })
      .catch(() => {
        page -= 1
      })
      .finally(() => {
        timelineLoading.value = false
      })
  }

  onBeforeUnmount(() => {
    domScrollHandler.disconnect()
    domScrollHandler = null
  })

  return {
    timelineLoading,
    getCommitsData,
    commitsData,
    finished
  }
}

const useRightPreviewProps = () => {
  const active = ref<any>('timeline')
  const timeLineHandler = useTimeLineHandle()
  watch(
    () => active.value,
    async () => {
      switch (active.value) {
        case 'timeline':
          if (!domScrollHandler) {
            await nextTick()
            const lastOne = document.getElementById('last-one')
            if (lastOne) {
              domScrollHandler = new domScroll(lastOne, ([target]: any) => {
                if (target.isIntersecting) {
                  if (!timeLineHandler.finished.value) {
                    timeLineHandler.getCommitsData()
                  }
                }
              })
            }
          }
          break
      }
    },
    { immediate: true }
  )
  return {
    active,
    ...timeLineHandler
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
      <el-tabs v-model={this.active} type="border-card">
        <el-tab-pane
          label="时间线"
          name="timeline"
          class="timeline-panel"
          v-loading={this.timelineLoading}
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
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
            <div
              id="last-one"
              v-loading={this.timelineLoading}
              element-loading-text="加载中，请稍后"
              element-loading-spinner="el-icon-loading"
              style={{
                height: !this.finished ? '40px' : 'auto',
                marginTop: !this.finished ? '0' : '20px'
              }}
            >
              {this.finished ? (
                <span>————&emsp;没有更多了&emsp;————</span>
              ) : this.commitsData.length === 0 ? (
                <el-empty description="接口调用过于频繁，请稍候再试" />
              ) : (
                ''
              )}
            </div>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    )
  }
})

export default rightPreview
