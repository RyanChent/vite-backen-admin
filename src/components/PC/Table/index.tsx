import { defineComponent } from "vue";
import './style.less'

const PCTable = defineComponent({
    name: 'Table',
    componentName: 'ManageTable',
    props: {
        ElTableProps: {
            type: Object,
            default: () => ({})
        },
        pagination: {
            type: [Boolean, Object],
            default: true
        }
    },
    setup() {
        return {}
    },
    render() {
        return <el-table></el-table>
    }
})

export default PCTable