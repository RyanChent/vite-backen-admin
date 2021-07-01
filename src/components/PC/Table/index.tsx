import { defineComponent, resolveComponent } from 'vue'
import ElTable from 'element-plus/lib/el-table'
import { isFunction } from '@/utils/types'
import { useTableProps } from '@/hooks/table'
import './style'

const emits = (ElTable.emits as string[]).filter((key) => !['select', 'select-all'].includes(key))

const uploadXlsxDialog = function (this: any) {
  const Dialogs: any = resolveComponent('Dialogs')
  const Upload: any = resolveComponent('Upload')
  return (
    <Dialogs
      v-model={this.xlsxDialogVisible}
      {...{
        title: '文件数据导入',
        dragging: true,
        destroyOnClose: true,
        customClass: 'manage-xlsx-upload',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        width: '40%'
      }}
    >
      <Upload
        {...{
          drag: true,
          showFileList: false,
          action: '',
          accept: '.xlsx,.xls,.csv',
          beforeUpload: async (file: any) => {
            this.tableLoading = true
            await this.loadDataByXlsx(file)
            this.xlsxDialogVisible = false
            this.tableLoading = false
          }
        }}
      />
    </Dialogs>
  )
}

const tableFooter = function (this: any) {
  return (
    <footer class="manage-pc-table-footer">
      {this.footerControl && (
        <div class="left-footer-control">
          <el-button type="text" onClick={() => this.table.toggleAllSelection()}>
            全{this.copyData.length === this.tableSelect.length && '不'}选
          </el-button>
          <span style="color: var(--primary-color); padding: 0 7px;">/</span>
          <el-button
            type="text"
            onClick={() => this.copyData.forEach((row: any) => this.table.toggleRowSelection(row))}
          >
            反选
          </el-button>
          {this.tableSelect.length > 0 && (
            <span style="padding-left: 10px">当前选中 {this.tableSelect.length} 条数据</span>
          )}
        </div>
      )}
      {this.pagination && this.paginationProps.total > 0 && (
        <el-pagination
          style={{
            textAlign: this.paginationAlign
          }}
          {...this.paginationProps}
          onSizeChange={(pageSize: number) => {
            this.paginationProps = Object.assign({}, this.paginationProps, { pageSize })
          }}
          onCurrentChange={(currentPage: number) => {
            this.tableSelect = []
            this.paginationProps = Object.assign({}, this.paginationProps, { currentPage })
          }}
        />
      )}
    </footer>
  )
}

const tableHeader = function (this: any) {
  return (
    <header class="manage-pc-table-header">
      <div class="left-nav">
        {isFunction(this.$slots.leftNav) && this.$slots.leftNav(this.copyData)}
        {this.showLeftNav && (
          <>
            <el-dropdown
              trigger="click"
              class="manage-pc-header-dropdown"
              size="medium"
              onCommand={async (command: string) => {
                this.tableLoading = true
                await this.saveDataToXlsx(command)
                this.tableLoading = false
              }}
            >
              {{
                default: () => (
                  <span class="el-dropdown-link">
                    <el-button type="primary" size="mini" plain>
                      导出数据 <i class="el-icon-arrow-down" />
                    </el-button>
                  </span>
                ),
                dropdown: () => (
                  <el-dropdown-menu>
                    <el-dropdown-item command="select">导出勾选数据</el-dropdown-item>
                    <el-dropdown-item command="page">导出当前页数据</el-dropdown-item>
                  </el-dropdown-menu>
                )
              }}
            </el-dropdown>
            {this.copyData.length === 0 && this.paginationProps.total === 0 && (
              <el-button
                type="success"
                size="mini"
                icon="el-icon-upload"
                plain
                onClick={() => (this.xlsxDialogVisible = true)}
              >
                导入数据
              </el-button>
            )}
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-printer"
              plain
              onClick={async () => {
                this.tableLoading = true
                await this.printTable(this.table.$el)
                this.tableLoading = false
              }}
            >
              打印
            </el-button>
          </>
        )}
      </div>
      <div class="right-nav">
        {isFunction(this.$slots.rightNav) && this.$slots.rightNav(this.copyData)}
        {this.showRightNav && (
          <>
            <el-dropdown
              hide-on-click={false}
              trigger="click"
              class="manage-pc-header-dropdown"
              size="medium"
            >
              {{
                default: () => (
                  <span class="el-dropdown-link">
                    <i class="el-icon-menu" />
                    <i class="el-icon-arrow-down" />
                  </span>
                ),
                dropdown: () => (
                  <el-dropdown-menu>
                    {this.copyColumns.map((column: any) => (
                      <el-dropdown-item>
                        <el-checkbox v-model={column.show}>
                          {column.label ||
                            (
                              {
                                index: '索引列',
                                selection: '选择列',
                                expand: '展开列'
                              } as any
                            )[column.type]}
                        </el-checkbox>
                      </el-dropdown-item>
                    ))}
                  </el-dropdown-menu>
                )
              }}
            </el-dropdown>
          </>
        )}
      </div>
    </header>
  )
}

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
  if (Array.isArray(defaultSlot) && defaultSlot.length === 1) {
    const tableColumns = defaultSlot[0].children
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
  emits: [...emits, 'get-table', 'update:data'],
  props: Object.assign({}, ElTable.props, {
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
    }
  }),
  setup(props, { emit, slots }: any) {
    return useTableProps(props, emit, slots, ElTable)
  },
  render() {
    const slots: any = this.$slots
    if (isFunction(slots.default) && this.copyColumns.length === 0) {
      renderTableContent.call(this)
    }
    return (
      <section class="manage-pc-table">
        {uploadXlsxDialog.call(this)}
        {(this.showRightNav ||
          this.showLeftNav ||
          isFunction(slots.leftNav) ||
          isFunction(slots.rightNav)) &&
          tableHeader.call(this)}
        <main
          v-loading={this.tableLoading}
          element-loading-text="处理中，请稍后"
          element-loading-spinner="el-icon-loading"
        >
          <ElTable {...this.tableProps} ref={(el: any) => el && (this.table = el)}>
            {{
              default: () => tableContent.call(this),
              empty: () =>
                isFunction(slots.empty) ? slots.empty() : <el-empty description="暂无数据" />,
              append: () => isFunction(slots.append) && slots.append(this.copyData)
            }}
          </ElTable>
          {tableFooter.call(this)}
        </main>
      </section>
    )
  }
})

export default PCTable
