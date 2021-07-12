import { ref, onMounted, onBeforeUnmount } from 'vue'
import { loadScript } from '@/utils/dom'
import { parseTime } from '@/utils/tool'
import { getCommits } from '@/api/github/api'

const echartsConfig: any = {
  title: {
    text: '项目近30条提交记录',
    margin: [15, 5],
    x: 'center',
    textAlign: 'center',
    link: 'https://github.com/RyanChent/vite-backen-admin/commits'
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true },
      mark: { show: true },
      magicType: { show: true, type: ['line', 'bar'] }
    }
  },
  tooltip: {
    trigger: 'axis',
    enterable: true,
    confine: true,
    formatter: '提交次数：{c}'
  },
  xAxis: {
    type: 'category',
    data: [],
    name: '时间',
    axisLabel: {
      interval: 0
    },
    axisTick: {
      alignWithLabel: true
    }
  },
  legend: {
    show: true,
    left: 'left'
  },
  yAxis: {
    type: 'value',
    name: '提交数',
    axisLabel: {
      interval: 0
    },
    axisTick: {
      alignWithLabel: true
    }
  },
  series: [
    {
      data: [],
      type: 'line',
      name: 'vite-backen-admin',
      smooth: true,
      showAllSymbol: true
    }
  ]
}

const useHandleEcharts = () => {
  let page = 1
  const commitEcharts = ref<any>(echartsConfig)
  const chartLoading = ref<boolean>(false)
  const getCommitData = () => {
    chartLoading.value = true
    getCommits({ page, per_page: 30 })
      .then((data: any) => {
        const map: any = {}
        commitEcharts.value.xAxis.data = [
          ...new Set(
            data.map(({ commit }: any) => {
              const date = parseTime(commit.author?.date || commit.committer?.date, '{y}-{m}-{d}')
              const shortYmd = date.slice(date.indexOf('-') + 1)
              if (!map[shortYmd]) {
                map[shortYmd] = 1
              } else {
                map[shortYmd] += 1
              }
              return shortYmd
            })
          )
        ]
        commitEcharts.value.series[0].data = Object.values(map)
        page += 1
      })
      .catch(console.log)
      .finally(() => {
        chartLoading.value = false
      })
  }

  getCommitData()

  return {
    getCommitData,
    commitEcharts,
    chartLoading
  }
}

export const useDashBoardProps = (props: any) => {
  const footerScript = ref<any>(null)
  const performanceShow = ref<any>({
    first: performance.timing.domInteractive - performance.timing.fetchStart,
    white: performance.getEntriesByType('paint')[0]?.startTime
  })
  onMounted(() => {
    if (!footerScript.value) {
      footerScript.value = loadScript('/js/busuanzi.pure.mini.js')
    }
  })
  onBeforeUnmount(() => {
    document.body.removeChild(footerScript.value)
  })
  return {
    performanceShow,
    ...useHandleEcharts()
  }
}
