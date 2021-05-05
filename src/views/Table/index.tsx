import { defineComponent, resolveComponent, ref } from 'vue'
import './style.less'

const TablePage = defineComponent({
    name: 'TablePage',
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
        const data = ref<any>(
            [
                {
                    test1: '测试11',
                    test2: '测试21',
                    test3: '测试31',
                },
                {
                    test1: '测试12',
                    test2: '测试22',
                    test3: '测试32'
                },
                {
                    test1: '测试13',
                    test2: '测试23',
                    test3: '测试33'
                },
                {
                    test1: '测试14',
                    test2: '测试24',
                    test3: '测试34'
                },
                {
                    test1: '测试15',
                    test2: '测试25',
                    test3: '测试35'
                },
                {
                    test1: '测试16',
                    test2: '测试26',
                    test3: '测试36'
                },
                {
                    test1: '测试17',
                    test2: '测试27',
                    test3: '测试37'
                },
                {
                    test1: '测试18',
                    test2: '测试28',
                    test3: '测试38'
                },
            ]
        )
        const pagination = ref<any>({
            pageSize: 10,
            current: 1,
            total: 100
        })
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
            pagination={this.pagination}
            {...{
                'onUpdate:pagination': (pagination: any) => { this.pagination = Object.assign({}, pagination) }
            }}>
            {
                {
                    test4: ({ row }: any) => <span>我是插槽显示的{row.test1}</span>
                }
            }
        </Table>
    }
})

export default TablePage