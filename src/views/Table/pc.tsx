import { defineComponent, resolveComponent, ref, watch } from 'vue'
import tableData from '@/data/table'
const PCTable = defineComponent({
  name: 'PCTablePage',
  componentName: 'ManageTablePage',
  setup() {
    const columns = [
      {
        type: 'expand',
        content: 'expand'
      },
      {
        type: 'selection'
      },
      {
        type: 'index',
        label: '序号',
        width: 70
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
        content: ({ row }: any) => <span>我是插槽显示的{row.test1}</span>
      },
      {
        type: 'action',
        label: '操作',
        content: ({ row }: any) => (
          <>
            <el-button type="primary" size="mini" plain>
              新增
            </el-button>
            <el-button type="success" size="mini" plain>
              查看
            </el-button>
            <el-button type="warning" size="mini" plain>
              编辑
            </el-button>
            <el-button type="danger" size="mini" plain>
              删除
            </el-button>
          </>
        )
      }
    ]

    const data = ref<any>(tableData.slice(0, 10))
    const pagination = ref<any>({
      pageSize: 10,
      currentPage: 1,
      total: tableData.length
    })

    watch(
      () => pagination.value,
      (newPagination: any) => {
        const { currentPage, pageSize } = newPagination
        const start = (currentPage - 1) * pageSize
        const end = currentPage * pageSize
        data.value = tableData.slice(start, Math.min(end, tableData.length))
      },
      { deep: true }
    )

    return {
      columns,
      data,
      pagination
    }
  },
  render() {
    const Table: any = resolveComponent('Table')
    return (
      <Table
        columns={this.columns}
        border
        showRightNav
        showLeftNav
        vModel={[this.data, 'data']}
        v-model={[this.pagination, 'pagination']}
      >
        {{
          expand: ({ row }: any) => (
            <el-form label-position="left">
              <el-form-item label="测试列1：">
                <span>{row.test1}</span>
              </el-form-item>
              <el-form-item label="测试列2：">
                <span>{row.test2}</span>
              </el-form-item>
              <el-form-item label="测试列3：">
                <span>{row.test3}</span>
              </el-form-item>
            </el-form>
          )
        }}
      </Table>
    )
  }
})

export default PCTable
