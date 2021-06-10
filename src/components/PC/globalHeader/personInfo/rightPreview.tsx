import { defineComponent, nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { getCommits, getAllRepo } from '@/api/github/api'
import { domScroll, copyContent } from '@/utils/dom'

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
    if (domScrollHandler?.disconnect) {
      domScrollHandler.disconnect()
      domScrollHandler = null
    }
  })

  return {
    timelineLoading,
    getCommitsData,
    commitsData,
    finished
  }
}

const useRepoHandle = () => {
  const repoData = shallowRef<any>([])
  const repoLoading = ref<boolean>(false)
  const getAllRepoData = () => {
    repoLoading.value = true
    getAllRepo()
      .then((data: any) => {
        if (Array.isArray(data) && data.length) {
          repoData.value = data
          console.log(repoData)
        }
      })
      .finally(() => {
        repoLoading.value = false
      })
  }

  return {
    repoData,
    repoLoading,
    getAllRepoData
  }
}

const useRightPreviewProps = () => {
  const active = ref<any>('repo')
  const timeLineHandler = useTimeLineHandle()
  const repoHandler = useRepoHandle()
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
        case 'repo':
          if (!repoHandler.repoData.value.length) {
            repoHandler.getAllRepoData()
          }
      }
    },
    { immediate: true }
  )
  return {
    active,
    ...timeLineHandler,
    ...repoHandler
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
        <el-tab-pane
          label="repository"
          name="repo"
          class="repository-panel"
          v-loading={this.repoLoading}
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <header></header>
          {this.repoData.length === 0 ? (
            <el-empty description="接口调用过于频繁，请稍候再试" />
          ) : (
            <main class="repo-panel">
              {this.repoData.map((repo: any) => (
                <div>
                  <div class="ribbon">
                    <a href={repo.clone_url} target="_blank" rel="external nofollow">
                      fork me on github
                    </a>
                  </div>
                  <p class="name">
                    <span>{repo.name}</span>
                    <el-button
                      type="primary"
                      size="mini"
                      plain
                      onClick={async () => {
                        await copyContent(`git clone ${repo.clone_url}`)
                        ;(this as any).$message.success('复制成功，请粘贴到terminal中执行')
                      }}
                    >
                      Clone
                    </el-button>
                  </p>
                  <p class="desc">{repo.description}</p>
                  <p class="footer">
                    {repo.language && <el-tag>{repo.language}</el-tag>}
                    <span>
                      <i class="el-icon-star-off" style="padding-right: 5px" />
                      {repo.stargazers_count}
                    </span>
                    {repo.license && <span>{repo.license}</span>}
                  </p>
                  <p style="color: #909299; font-size: .7rem">
                    Updated at &nbsp; {this.parseTime(repo.updated_at)}
                  </p>
                </div>
              ))}
            </main>
          )}
        </el-tab-pane>
      </el-tabs>
    )
  }
})

export default rightPreview
