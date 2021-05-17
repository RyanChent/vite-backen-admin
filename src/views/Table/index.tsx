import { defineComponent, inject } from 'vue'
import './style.less'
import PCTable from './pc'
import MobileTable from './mobile'

const TablePage = defineComponent({
    name: 'TablePage',
    componentName: 'ManageTablePage',
    components: {
        PCTable,
        MobileTable
    },
    setup() {
        const isMobile = inject<any>('isMobile')
        return () => !!isMobile.value ? <MobileTable /> : <PCTable />
    }
})

export default TablePage