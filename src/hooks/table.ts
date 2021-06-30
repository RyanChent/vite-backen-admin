import { computed, ref, watch } from 'vue'
import { trueType, isFunction } from '@/utils/types'
import { toCamel, parseTime } from '@/utils/tool'
import { pick } from '@/utils/props'
import xlsx from 'xlsx'

export const useTableProps = (props: any, emit: any, slots: any, component: any) => {
  const table = ref<any>(null)
  const tableSelect = ref<any[]>([])
  const tableProps = computed<any>(() =>
    Object.assign(
      {},
      pick(props, Object.keys(component.props)),
      component.emits.reduce((self: any, item: any) => {
        const key = `on${toCamel(item)}`
        if (!['onSelect', 'onSelectAll', 'onSelectionChange'].includes(key)) {
          self[key] = function () {
            return emit(item, arguments)
          }
        }
        return self
      }, {}),
      {
        onSelectionChange: (selection: any[]) => {
          tableSelect.value = selection
          emit('selection-change', tableSelect.value)
        }
      }
    )
  )
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
    () => [table.value, props.draggable],
    () => {
      emit('get-table', table.value)
      if (!props.draggable) {
      }
    }
  )

  return {
    table,
    tableSelect,
    tableProps,
    copyColumns,
    paginationProps,
    ...useHandleTable(copyColumns, tableSelect, props.data, slots)
  }
}

const useHandleTable = (columns: any, select: any, page: any, slots: any) => {
  const reshapeColumnAndData = (columns: any, data: any) => {
    const propMap: any = {}
    const xlsxHeader = columns
      .map((column: any) => {
        if (!['index', 'selection', 'expand'].includes(column.type)) {
          if (isFunction(slots[column.content])) {
            propMap[column.prop] = slots[column.content]
          } else if (isFunction(column.content)) {
            propMap[column.prop] = column.content
          } else {
            propMap[column.prop] = ({ row }: any) => row[column.prop]
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
  const saveDataToXlsx = (command: string) => {
    const xlsxData = {
      select: select.value,
      page
    }[command]
    const filename = `${parseTime(new Date())} 数据导出.xlsx`
    const xlsxSheet = reshapeColumnAndData(columns.value, xlsxData)
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.aoa_to_sheet(xlsxSheet)
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')
    xlsx.writeFile(wb, filename)
  }
  const loadDataByXlsx = () => {}
  return {
    saveDataToXlsx,
    loadDataByXlsx
  }
}
