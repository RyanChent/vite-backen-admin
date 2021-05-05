import { defineComponent, resolveComponent, ref, watch } from 'vue'
import tableData from '@/data/table.json'
const PCTable = defineComponent({
    name: 'PCTablePage',
    componentName: 'ManageTablePage',
    setup() {
        const columns = [
            {
                type: 'selection'
            },
            {
                type: 'index'
            },
            {
                type: 'expand'
            },
            {
                label: '测试列1',
                prop: 'test1'
            },
            {
                label: '测试列2',
                prop: 'test2'
            },
            {
                label: '测试列3',
                prop: 'test3'
            },
            {
                label: '测试列4',
                prop: 'test4',
                content: 'test4'
            }
        ]

        const data = ref<any>(tableData.slice(0, 10))
        const pagination = ref<any>({
            pageSize: 10,
            currentPage: 1,
            total: tableData.length
        })

        watch(() => pagination.value, (newPagination: any) => {
            const { currentPage, pageSize } = newPagination
            const start = (currentPage - 1) * pageSize
            const end = currentPage * pageSize
            data.value = tableData.slice(start, Math.min(end, tableData.length))
        }, { deep: true })


        return {
            columns,
            data,
            pagination
        }
    },
    render() {
        const Table = resolveComponent('Table') as any
        return <Table
            columns={this.columns}
            border
            data={this.data}
            v-model={[this.pagination, 'pagination']}
        >
            {
                {
                    test4: ({ row }: any) => <span>我是插槽显示的{row.test1}</span>
                }
            }
        </Table>
    }
})

export default PCTable