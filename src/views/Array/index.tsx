import { defineComponent, ref } from 'vue'
import ArrayEditor from '@PC/JsonEditor'
import './style'

const ArrayEditorPage = defineComponent({
    name: 'ArrayPage',
    componentName: 'ManageArrayPage',
    components: {
        ArrayEditor: defineComponent(ArrayEditor)
    },
    setup() {
        const array = ref<Array<any>>([
            'a',
            function b() {
                console.log('c')
            },
            {
                d: {
                    e: [0, 2],
                    f: { 1: 3 }
                }
            },
            10,
            () => {
                console.log('h')
            }
        ])
        return {
            array
        }
    },
    render() {
        return <ArrayEditor json={this.array} showJson />
    }
})

export default ArrayEditorPage