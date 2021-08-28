import { defineComponent } from 'vue'
import Form from '../Form'
import { isFunction } from '@/utils/types'

const TableHead = defineComponent({
  name: 'TableHead',
  componentName: 'ManageTableHead',
  emits: ['update:queryParam', 'update:queryItems'],
  components: {
    Form
  },
  computed: {
    model: {
      get(this: any) {
        return this.$parent.queryParam
      },
      set(value: object) {
        this.$emit('update:queryParam', value)
      }
    },
    schema: {
      get(this: any) {
        return this.$parent.queryItems
      },
      set(value: object) {
        this.$emit('update:queryItems', value)
      }
    }
  },
  render() {
    const slots: any = this.$slots
    const parent: any = this.$parent
    return (
      <header class="manage-pc-table-header">
        <div class="left-nav">
          {(this as any).schema.length === 0 && isFunction(slots.leftNav) ? (
            slots.leftNav(parent.copyData)
          ) : (
            <Form
              v-model={[this.model, 'model']}
              vModel={[this.schema, 'schema']}
              inline
              size="small"
            />
          )}
        </div>
        <div class="right-nav">
          {isFunction(slots.rightNav) && slots.rightNav(parent.copyData)}
          {parent.showRightNav && (
            <>
              <el-dropdown
                trigger="click"
                class="manage-pc-header-dropdown"
                size="medium"
                onCommand={async (command: string) => {
                  parent.tableLoading = true
                  await parent.saveDataToXlsx(command)
                  parent.tableLoading = false
                }}
              >
                {{
                  default: () => (
                    <span class="el-dropdown-link">
                      <el-button type="primary" size="mini" plain round>
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
              {parent.copyData.length === 0 && parent.paginationProps.total === 0 && (
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-upload"
                  round
                  plain
                  onClick={() => (parent.xlsxDialogVisible = true)}
                >
                  导入数据
                </el-button>
              )}
              <el-button
                type="warning"
                size="mini"
                circle
                plain
                title="打印"
                icon="el-icon-printer"
                onClick={async () => {
                  parent.tableLoading = true
                  await parent.printTable(parent.table.$el)
                  parent.tableLoading = false
                }}
              />
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
                      {parent.copyColumns.map((column: any) => (
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
})

export default TableHead
