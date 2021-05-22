import { defineComponent, ref, resolveComponent } from 'vue'
import './style.less'

const JsonPage = defineComponent({
    name: 'JsonPage',
    componentName: 'ManageJsonPage',
    setup() {
        const data = ref<any>({
            a: 1,
            b: 2,
            c: [3, 4],
            d: {
                e: 5,
                f: 6
            }
        })
        return {
            data
        }
    },
    render() {
        const JsonEditor: any = resolveComponent('JsonEditor')
        return <JsonEditor data={this.data} />
    }
})

export default JsonPage