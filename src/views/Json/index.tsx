import { defineComponent, ref } from 'vue'
import JsonEditor from '@PC/JsonEditor'
import './style'

const JsonPage = defineComponent({
    name: 'JsonPage',
    componentName: 'ManageJsonPage',
    components: {
        JsonEditor
    },
    setup() {
        const json = ref<any>({
            a: 1,
            b: true,
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
        return <JsonEditor json={this.json} showJson draggable />
    }
})

export default JsonPage