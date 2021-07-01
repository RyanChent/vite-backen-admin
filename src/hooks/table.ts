import { computed, ref, watch } from 'vue'
import { trueType, isFunction } from '@/utils/types'
import { parseTime } from '@/utils/tool'
import { printDom } from '@/utils/dom'
import { pick } from '@/utils/props'
import xlsx from 'xlsx'

export const useTableProps = (props: any, emit: any, slots: any, component: any) => {
  const table = ref<any>(null)
  const tableSelect = ref<any[]>([])
  const tableLoading = ref<boolean>(false)
  const tableProps = computed<any>(() =>
    Object.assign({}, pick(props, Object.keys(component.props)), {})
  )
  const xlsxDialogVisible = ref<boolean>(false)
  const copyData = computed<any[]>({
    get() {
      return props.data
    },
    set(value) {
      emit('update:data', value)
    }
  })

  const copyColumns = ref<any[]>(
    props.columns.map((column: any) =>
      Object.assign(
        column,
        props.showRightNav && {
          show: !column.hasOwnProperty('show')
        }
      )
    )
  )

  const paginationProps = computed<any>({
    get() {
      return Object.assign(
        {
          pageSize: 10,
          currentPage: 1,
          prevText: '上一页',
          nextText: '下一页',
          layout: 'sizes, prev, pager, next, jumper, total,'
        },
        trueType(props.pagination) === 'Object' && props.pagination
      )
    },
    set(value) {
      emit('update:pagination', value)
    }
  })

  watch(
    () => table.value,
    () => {
      emit('get-table', table.value)
    }
  )

  return {
    table,
    tableSelect,
    tableProps,
    copyColumns,
    copyData,
    paginationProps,
    xlsxDialogVisible,
    tableLoading,
    ...useHandleTableExtra(copyColumns, tableSelect, copyData, slots)
  }
}

const useHandleTableExtra = (columns: any, select: any, page: any, slots: any) => {
  const reshapeColumnAndData = (columns: any, data: any) => {
    const propMap: any = {}
    const xlsxHeader = columns
      .map((column: any) => {
        if (!column.hasOwnProperty('type')) {
          if (isFunction(slots[column.content])) {
            propMap[column.prop || column.label] = slots[column.content]
          } else if (isFunction(column.content)) {
            propMap[column.prop || column.label] = column.content
          } else {
            propMap[column.prop || column.label] = ({ row }: any) => row[column.prop]
          }
          return column.label
        }
      })
      .filter(Boolean)
    const handleVNode = (res: any) => {
      let str = ''
      if (Array.isArray(res.children)) {
        res.children.forEach((item: any) => {
          str += handleVNode(item)
        })
      } else {
        str += res.children || res
      }
      return str
    }

    const xlsxData = data.map((item: any) =>
      Object.keys(propMap).map((key: string) => handleVNode(propMap[key]({ row: item })))
    )
    return [xlsxHeader, ...xlsxData]
  }

  const saveDataToXlsx = async (command: string) => {
    const xlsxData = {
      select: select.value,
      page: page.value
    }[command]
    const filename = `${parseTime(new Date())} 数据导出.xlsx`
    const xlsxSheet = reshapeColumnAndData(columns.value, xlsxData)
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.aoa_to_sheet(xlsxSheet)
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')
    xlsx.writeFile(wb, filename)
  }

  const loadDataByXlsx = async (file: any) => {
    const fileReader = await new FileReader()
    await fileReader.readAsArrayBuffer(file)
    fileReader.onload = (e: any) => {
      const wb = xlsx.read(e.target.result, { type: 'buffer' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const data = xlsx.utils.sheet_to_json(ws)
      if (Array.isArray(data) && data.length) {
        columns.value = [
          { type: 'selection', show: true },
          { type: 'index', label: '序号', show: true, width: 70 },
          ...Object.keys(data[0]).map((key: string, index: number) => ({
            label: key,
            prop: String(index + 1),
            show: true
          }))
        ]
        page.value = data.map((item: any) => {
          const keys = Object.keys(item)
          return keys.reduce((self: any, key: string, index: number) => {
            self[index + 1] = item[key]
            return self
          }, {})
        })
      }
    }
  }
  const printTable = async (el: HTMLElement) => {
    await printDom(
      {
        header: `${parseTime(new Date())} 数据打印`,
        printable: el,
        type: 'html',
        style:
          '@page { margin: 0 10mm; } h1 { font-size: 18px; text-align: center; line-height: 35px; }'
      },
      true
    )
  }
  return {
    saveDataToXlsx,
    loadDataByXlsx,
    printTable
  }
}

export const useHandleTable = function (this: any) {
  const onSelectionChange = (selection: any[]) => {
    this.tableSelect = selection
    this.$emit('selection-change', this.tableSelect)
  }

  const onCellMouseEnter = (...args: any[]) => {
    this.$emit('cell-mouse-enter', ...args)
  }

  const onCellMouseLeave = (...args: any[]) => {
    this.$emit('cell-mouse-leave', ...args)
  }

  const onCellClick = (...args: any[]) => {
    this.$emit('cell-click', ...args)
  }

  const onCellDblclick = (...args: any[]) => {
    this.$emit('cell-dbclick', ...args)
  }

  const onRowClick = (...args: any[]) => {
    this.$emit('row-click', ...args)
  }

  const onRowContextmenu = (...args: any[]) => {
    const [row, column, event] = args
    event.stopPropagation()
    event.preventDefault()
    this.$emit('row-contextmenu', row, column, event)
  }

  const onRowDblclick = (...args: any[]) => {
    this.$emit('row-dblclick', ...args)
  }

  const onHeaderClick = (...args: any[]) => {
    this.$emit('header-click', ...args)
  }

  const onHeaderContextmenu = (...args: any[]) => {
    const [column, event] = args
    event.stopPropagation()
    event.preventDefault()
    this.$emit('header-contextmenu', column, event)
  }

  const onSortChange = ({ column, prop, order }: any) => {
    this.$emit('sort-change', column, prop, order)
  }

  const onFilterChange = (filters: any) => {
    this.$emit('filter-change', filters)
  }

  const onCurrentChange = (...args: any[]) => {
    this.$emit('current-change', ...args)
  }

  const onHeaderDragend = (...args: any[]) => {
    const [newWidth, oldWidth, column, event] = args
    event.stopPropagation()
    this.$emit('header-dragend', newWidth, oldWidth, column, event)
  }

  const onExpandChange = (...args: any[]) => {
    const [row, expanded] = args
    this.$emit('expand-change', row, expanded)
  }

  return {
    onSelectionChange,
    onCellMouseEnter,
    onCellMouseLeave,
    onCellClick,
    onCellDblclick,
    onRowClick,
    onRowContextmenu,
    onRowDblclick,
    onHeaderClick,
    onHeaderContextmenu,
    onSortChange,
    onFilterChange,
    onCurrentChange,
    onHeaderDragend,
    onExpandChange
  }
}
