import { defineComponent, resolveComponent, ref } from 'vue'
import './style.less'

const JsonPage = defineComponent({
    name: 'JsonPage',
    componentName: 'ManageJsonPage',
    setup() {
        const json = ref<any>({
            a: 1,
            b: 2,
            c: [3, 4],
            d: {
                e: 5,
                f: {
                    g: 6,
                    h: [1, 2, 3]
                }
            },
            i: function () {
                console.log(this.a, this.b)
            },
            j: () => console.log
        })
        return {
            json
        }
    },
    render() {
        const JsonEditor: any = resolveComponent('JsonEditor')
        return <JsonEditor json={this.json} showJson />
    }
})

export default JsonPage