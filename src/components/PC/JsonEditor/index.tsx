import { defineComponent, computed, ref } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { pick } from '@/utils/props.ts'
import './style.less'

const useProps = (props: any, emit: any) => {
    const jsonProps = computed(() => Object.assign(
        {},
        pick(props, Object.keys(VueJsonPretty.props).filter(key => key !== 'data' && key !== 'v-model')),
        {
            showLength: true,
            showSelectController: true
        })
    )
    const jsonData = computed({
        get() {
            return props.data
        },
        set(value) {
            emit('update:data', value)
        }
    })
    return {
        jsonProps,
        jsonData
    }
}

const JsonEditor = defineComponent({
    name: 'JsonEditor',
    componentName: 'ManageJsonEditor',
    __file: '@PC/JsonEditor/index.tsx',
    components: {
        VueJsonPretty
    },
    props: Object.assign({}, VueJsonPretty.props, {}),
    setup(props, { emit }: any) {
        const { jsonProps, jsonData } = useProps(props, emit)
        const level = ref<any>('1')
        return {
            jsonProps,
            jsonData,
            level
        }
    },
    render() {
        return <vue-json-pretty {...this.jsonProps} data={this.jsonData} v-model={this.level} />
    }
})

export default JsonEditor