import { defineComponent } from 'vue'

const TableFooter = defineComponent({
  name: 'TableFooter',
  componentName: 'ManageTableFooter',
  render() {
    const parent: any = this.$parent
    return (
      <footer class="manage-pc-table-footer">
        {parent.footerControl && (
          <div class="left-footer-control">
            <el-button type="text" onClick={() => parent.table.toggleAllSelection()}>
              全{parent.copyData.length === parent.tableSelect.length && '不'}选
            </el-button>
            <span style="color: var(--primary-color); padding: 0 7px;">/</span>
            <el-button
              type="text"
              onClick={() =>
                parent.copyData.forEach((row: any) => parent.table.toggleRowSelection(row))
              }
            >
              反选
            </el-button>
            {parent.tableSelect.length > 0 && (
              <span style="padding-left: 10px">当前选中 {parent.tableSelect.length} 条数据</span>
            )}
          </div>
        )}
        {parent.pagination && parent.paginationProps.total > 0 && (
          <el-pagination
            style={{
              textAlign: parent.paginationAlign
            }}
            {...parent.paginationProps}
            onSizeChange={(pageSize: number) => {
              parent.paginationProps = Object.assign({}, parent.paginationProps, { pageSize })
            }}
            onCurrentChange={(currentPage: number) => {
              parent.tableSelect = []
              parent.paginationProps = Object.assign({}, parent.paginationProps, { currentPage })
            }}
          />
        )}
      </footer>
    )
  }
})

export default TableFooter
