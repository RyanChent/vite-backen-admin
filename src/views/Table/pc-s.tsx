import { defineComponent, resolveComponent, ref, watch } from 'vue'
import tableData from '@/data/table'

const SlotsTable = defineComponent({
  name: 'SlotsTable',
  componentName: 'ManageSlotsTable',
  setup() {
    const data = ref<any>(tableData.content.slice(0, 10))
    const header = ref<any>(tableData.header)
    const param = ref<any>({})
    const pagination = ref<any>({
      pageSize: 10,
      currentPage: 1,
      total: tableData.content.length
    })

    watch(
      () => pagination.value,
      (newPagination: any) => {
        const { currentPage, pageSize } = newPagination
        const start = (currentPage - 1) * pageSize
        const end = currentPage * pageSize
        data.value = tableData.content.slice(start, Math.min(end, tableData.content.length))
      },
      { deep: true }
    )

    return {
      data,
      header,
      param,
      pagination
    }
  },
  render() {
    const Table: any = resolveComponent('Table')
    return (
      <Table
        stripe
        border
        showRightNav
        showLeftNav
        v-models={[
          [this.param, 'queryParam'],
          [this.header, 'queryItems'],
          [this.data, 'data'],
          [this.pagination, 'pagination']
        ]}
      >
        <el-table-column type="expand">
          {{
            default: ({ row }: any) => (
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
        </el-table-column>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width={70} />
        <el-table-column label="测试列1" prop="test1" />
        <el-table-column label="测试列2" prop="test2" />
        <el-table-column label="测试列3" prop="test3" />
        <el-table-column label="测试列4">
          {{
            default: ({ row }: any) => <p>我是插槽显示的{row.test3}</p>
          }}
        </el-table-column>
        <el-table-column type="action" label="操作" showOverflowTooltip>
          <el-button type="primary" size="mini" plain>
            新增
          </el-button>
          <el-button type="success" size="mini" plain>
            查看
          </el-button>
        </el-table-column>
      </Table>
    )
  }
})

export default SlotsTable
