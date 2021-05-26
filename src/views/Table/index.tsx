import { defineComponent, inject } from 'vue'
import PCTable from './pc'
import MobileTable from './mobile'
import './style'

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