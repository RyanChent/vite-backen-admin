import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import './style.less'
import { getCharts } from '@/data/echart.ts'
import { domResize } from '@/utils/dom.ts'
import _ from 'lodash'
const Charts = defineComponent({
    name: 'Echarts',
    componentName: 'ManageEcharts',
    props: {
        domId: {
            type: String,
            default: 'default-charts'
        },
        height: {
            type: String,
            default: '400px'
        },
        width: {
            type: String,
            default: '50%'
        },
        minWidth: {
            type: String,
            default: '350px'
        },
        minHeight: {
            type: String,
            default: '200px'
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const charts = ref<any>(null)
        let domresize: any
        let parentElement: any
        let parentHeight: any
        const setChartsHeight = (height: any) => {
            charts.value._dom.style.height = `${Math.min(Math.max(parseInt(height), parseInt(props.minHeight)), parseInt(props.height))}px`
            charts.value.resize()
        }
        onMounted(() => {
            charts.value = getCharts(props.domId, props.options)
            parentElement = document.getElementById(props.domId)?.parentElement as HTMLElement
            parentHeight = window.getComputedStyle(parentElement).height
            setChartsHeight(parseInt(parentHeight))
            domresize = new domResize(parentElement, ([{ contentRect }]: any) => setChartsHeight(contentRect.height))
            window.addEventListener('resize', _.debounce(() => setChartsHeight(parseInt(parentHeight)), 400))
        })
        onUnmounted(() => {
            domresize.disconnect(() => charts.value.clear())
            window.removeEventListener('resize', _.debounce(() => setChartsHeight(parseInt(parentHeight)), 400))
            domresize = null
        })
        return {
            charts
        }
    },
    render() {
        return <div id={this.domId}
            style={{
                width: this.width,
                height: this.height,
                transition: 'all 0.5s',
                minWidth: this.minWidth,
                minHeight: this.minHeight
            }} />
    }
})

export default Charts