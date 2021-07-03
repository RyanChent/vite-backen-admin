import { defineComponent } from 'vue'
import Table from 'element-plus/lib/el-table'
import TableHead from './head'
import TableFooter from './footer'
import XlsxDialog from './xlsx-dialog'
import { isFunction } from '@/utils/types'
import { useTableProps, useHandleTable } from '@/hooks/table'
import './style'

const emits = (Table.emits as string[]).filter((key) => !['select', 'select-all'].includes(key))

const tableContent = function (this: any) {
  return this.copyColumns.map(
    (column: any, index: number) =>
      (column.show || !this.showRightNav) && (
        <el-table-column
          {...Object.assign(
            {},
            column,
            column.type === 'index' && {
              index: (index: number) => {
                if (this.pagination) {
                  const { pageSize, currentPage } = this.paginationProps
                  return pageSize * (currentPage - 1) + index + 1
                } else {
                  return index + 1
                }
              }
            }
          )}
          key={index}
        >
          {Object.assign(
            {},
            isFunction(column.header) && {
              header: (props: any) => column.header.call(this, props)
            },
            isFunction(column.content) && {
              default: (props: any) => column.content.call(this, props)
            },
            isFunction(this.$slots[column.header]) && {
              header: this.$slots[column.header]
            },
            isFunction(this.$slots[column.content]) && {
              default: this.$slots[column.content]
            }
          )}
        </el-table-column>
      )
  )
}

const renderTableContent = function (this: any) {
  const defaultSlot: any = this.$slots?.default?.()
  let tableColumns = []
  if (Array.isArray(defaultSlot)) {
    if (defaultSlot.length === 1 && typeof defaultSlot[0].type === 'symbol') {
      tableColumns = defaultSlot[0].children
    } else if (defaultSlot.length > 1) {
      tableColumns = defaultSlot
    }
    if (tableColumns.every((column: any) => column.type?.name === 'ElTableColumn')) {
      this.copyColumns = tableColumns.map((column: any) =>
        Object.assign(
          {},
          column.props,
          this.showRightNav && {
            show: !column.props?.hasOwnProperty?.('show')
          },
          column.children?.default && {
            content: column.children.default
          },
          column.children?.header && {
            header: column.children.header
          }
        )
      )
    }
  }
}

const PCTable = defineComponent({
  name: 'Table',
  componentName: 'ManageTable',
  __file: '@PC/Table',
  emits: [...emits, 'get-table', 'update:data', 'update:pagination'],
  components: {
    Table,
    TableHead,
    TableFooter,
    XlsxDialog
  },
  props: Object.assign({}, Table.props, {
    pagination: {
      type: [Boolean, Object],
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    paginationAlign: {
      type: String,
      default: 'right'
    },
    footerControl: {
      type: Boolean,
      default: true
    },
    showRightNav: {
      type: Boolean,
      default: false
    },
    showLeftNav: {
      type: Boolean,
      default: false
    },
    queryItems: {
      type: Array,
      default: () => []
    },
    queryParam: {
      type: Object,
      default: () => ({})
    }
  }),
  setup(props, { emit, slots }: any) {
    return useTableProps(props, emit, slots, Table)
  },
  render() {
    const slots: any = this.$slots
    if (isFunction(slots.default) && this.copyColumns.length === 0) {
      renderTableContent.call(this)
    }
    return (
      <section class="manage-pc-table">
        {this.showRightNav && <XlsxDialog />}
        {(this.showRightNav ||
          this.showLeftNav ||
          isFunction(slots.leftNav) ||
          isFunction(slots.rightNav)) && <TableHead />}
        <main
          v-loading={this.tableLoading}
          element-loading-text="处理中，请稍后"
          element-loading-spinner="el-icon-loading"
        >
          <Table
            {...Object.assign({}, this.tableProps, useHandleTable.call(this))}
            ref={(el: any) => el && (this.table = el)}
          >
            {{
              default: () => tableContent.call(this),
              empty: () =>
                isFunction(slots.empty) ? slots.empty() : <el-empty description="暂无数据" />,
              append: () => isFunction(slots.append) && slots.append(this.copyData)
            }}
          </Table>
          <TableFooter />
        </main>
      </section>
    )
  }
})

export default PCTable
