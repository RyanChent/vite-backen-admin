import * as echarts from 'echarts'
const defaultConfig = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}

const getConfig = () => defaultConfig

export const getCharts = (id: string, options = {}) => {
  const myChart = echarts.init(document.getElementById(id) as HTMLElement)
  myChart.setOption(Object.keys(options).length ? options : getConfig())
  return myChart
}
