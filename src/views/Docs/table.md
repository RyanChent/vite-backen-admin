---
title: 'Table 表格'
---

## Table 表格

### 基础用法

- 使用时，列的渲染需要传入一个列数组，其他同`element-plus`的`Table`，参考[Element Table](https://element-plus.org/#/zh-CN/component/table)即可。

```vue demo
<template>
  <Table :columns="columns" border :data="data">
    <template #test2="{ row }">
      <span style="color: red">{{ row.test2 }}</span>
    </template>
  </Table>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import tableData from '@/data/table'
  export default defineComponent({
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
          prop: 'test2',
          content: 'test2'
        }
      ]

      const data = ref<any>(tableData.slice(0, 10))
      return {
        columns,
        data
      }
    }
  })
</script>
```

- 其中，插槽使用方法略有不同，插槽分列头和列内容，均为具名插槽。使用时，在列数组的项中定义插槽名字，然后在`template`中挂载即可。

### 开启分页

- 在`el-table`的基础上扩展，加入`el-pagination`使得`el-table`具备分页功能

```vue demo
<template>
  <Table v-model:pagination="pagination" :columns="columns" border :data="data">
    <template #test2="{ row }">
      <span style="color: red">{{ row.test2 }}</span>
    </template>
  </Table>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import tableData from '@/data/table'
  export default defineComponent({
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
          prop: 'test2',
          content: 'test2'
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
    }
  })
</script>
```

### 开启行拖拽

- 在`el-table`的基础上进行扩展，设置`draggable = true`即可开启行间拖拽

```vue demo
<template>
  <Table v-model:pagination="pagination" :columns="columns" border :data="data" draggable>
    <template #test2="{ row }">
      <span style="color: red">{{ row.test2 }}</span>
    </template>
  </Table>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import tableData from '@/data/table'
  export default defineComponent({
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
          prop: 'test2',
          content: 'test2'
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
    }
  })
</script>
```

### Table Attributes

<table class="desc-table">
  <tbody>
    <tr>
      <td>参数</td>
      <td>说明</td>
      <td>类型</td>
      <td>可选值</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>data</td>
      <td>显示的数据</td>
      <td>array</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>height</td>
      <td>Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。</td>
      <td>string/number</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>max-height</td>
      <td>Table 的最大高度。合法的值为数字或者单位为 px 的高度。</td>
      <td>string/number</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>stripe</td>
      <td>是否为斑马纹 table</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>border</td>
      <td>是否带有纵向边框</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>size</td>
      <td>Table 的尺寸</td>
      <td>string</td>
      <td>medium/small/mini</td>
      <td>——</td>
    </tr>
    <tr>
      <td>fit</td>
      <td>列的宽度是否自撑开</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>show-header</td>
      <td>是否显示表头</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>highlight-current-row</td>
      <td>是否要高亮当前行</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>current-row-key</td>
      <td>当前行的 key，只写属性。</td>
      <td>string/number</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>row-class-name</td>
      <td>行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。</td>
      <td>function({row, rowIndex})/string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>row-style</td>
      <td>行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。</td>
      <td>function({row, rowIndex})/object</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>cell-class-name</td>
      <td>单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。</td>
      <td>function({row, column, rowIndex, columnIndex})/string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>cell-style</td>
      <td>单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。</td>
      <td>function({row, column, rowIndex, columnIndex})/object</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>header-row-class-name</td>
      <td>表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。</td>
      <td>function({row, rowIndex})/string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>header-row-style</td>
      <td>表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。</td>
      <td>function({row, rowIndex})/object</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>header-cell-class-name</td>
      <td>表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。</td>
      <td>function({row, column, rowIndex, columnIndex})/string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>header-cell-style</td>
      <td>表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。</td>
      <td>function({row, column, rowIndex, columnIndex})/object</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>row-key</td>
      <td>	行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：<code>user.info.id</code>，但不支持<code>user.info[0].id</code>，此种情况请使用<code>Function</code>。</td>
      <td>function(row)/string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>empty-text</td>
      <td>空数据时显示的文本内容，也可以通过<code>#empty</code>设置</td>
      <td>string</td>
      <td>——</td>
      <td>暂无数据</td>
    </tr>
    <tr>
      <td>default-expand-all</td>
      <td>是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>expand-row-keys</td>
      <td>可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。</td>
      <td>array</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>default-sort</td>
      <td>默认的排序列的<code>prop</code>和顺序。它的prop属性指定默认的排序的列，<code>order</code>指定默认排序的顺序</td>
      <td>object</td>
      <td><code>order: ascending, descending</code></td>
      <td>如果只指定了<code>prop</code>, 没有指定<code>order</code>, 则默认顺序是ascending</td>
    </tr>
    <tr>
      <td>tooltip-effect</td>
      <td>tooltip<code>effect</code>属性</td>
      <td>string</td>
      <td>dark/light</td>
      <td>——</td>
    </tr>
    <tr>
      <td>show-summary</td>
      <td>是否在表尾显示合计行</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>sum-text</td>
      <td>合计行第一列的文本</td>
      <td>string</td>
      <td>——</td>
      <td>合计</td>
    </tr>
    <tr>
      <td>summary-method</td>
      <td>自定义的合计计算方法</td>
      <td>function({ columns, data })</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>span-method</td>
      <td>合并行或列的计算方法</td>
      <td>function({ row, column, rowIndex, columnIndex })</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>select-on-indeterminate</td>
      <td>在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>indent</td>
      <td>展示树形数据时，树节点的缩进</td>
      <td>number</td>
      <td>——</td>
      <td>16</td>
    </tr>
    <tr>
      <td>lazy</td>
      <td>是否懒加载子节点数据</td>
      <td>boolean</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>load</td>
      <td>加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息</td>
      <td>function(row, treeNode, resolve)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>tree-props</td>
      <td>渲染嵌套数据的配置选项</td>
      <td>object</td>
      <td>——</td>
      <td>{ hasChildren: 'hasChildren', children: 'children' }</td>
    </tr>
    <tr>
      <td>pagination/v-model:pagination</td>
      <td>开启表格分页功能，配置详见pagination</td>
      <td>boolean/object</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>columns</td>
      <td>表格的列构成数组，配置详见Table-column Attributes</td>
      <td>array</td>
      <td>——</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>paginationAlign</td>
      <td>分页组件的对齐方式</td>
      <td>string</td>
      <td>left, right, center</td>
      <td>right</td>
    </tr>
    <tr>
      <td>draggable</td>
      <td>开启表格的行数据拖拽</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

### Table Events

<table class="desc-table">
  <tbody>
    <tr>
      <td>事件名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
    <tr>
      <td>get-table</td>
      <td>table组件初始化完毕后触发的事件</td>
      <td>el-table本身</td>
    </tr>
    <tr>
      <td>select</td>
      <td>当用户手动勾选数据行的 Checkbox 时触发的事件</td>
      <td>selection, row</td>
    </tr>
    <tr>
      <td>select-all</td>
      <td>当用户手动勾选全选 Checkbox 时触发的事件</td>
      <td>selection</td>
    </tr>
    <tr>
      <td>selection-change</td>
      <td>当选择项发生变化时会触发该事件</td>
      <td>selection</td>
    </tr>
    <tr>
      <td>cell-mouse-enter</td>
      <td>当单元格 hover 进入时会触发该事件</td>
      <td>row, column, cell, event</td>
    </tr>
    <tr>
      <td>cell-mouse-leave</td>
      <td>当单元格 hover 退出时会触发该事件</td>
      <td>row, column, cell, event</td>
    </tr>
    <tr>
      <td>cell-click</td>
      <td>当某个单元格被点击时会触发该事件</td>
      <td>row, column, cell, event</td>
    </tr>
    <tr>
      <td>cell-dblclick</td>
      <td>当某个单元格被双击时会触发该事件</td>
      <td>row, column, cell, event</td>
    </tr>
    <tr>
      <td>row-click</td>
      <td>当某一行被点击时会触发该事件</td>
      <td>row, column, event</td>
    </tr>
    <tr>
      <td>row-contextmenu</td>
      <td>当某一行被鼠标右键点击时会触发该事件</td>
      <td>row, column, event</td>
    </tr>
    <tr>
      <td>row-dblclick</td>
      <td>当某一行被双击时会触发该事件</td>
      <td>row, column, event</td>
    </tr>
    <tr>
      <td>header-click</td>
      <td>当某一列的表头被点击时会触发该事件</td>
      <td>column, event</td>
    </tr>
    <tr>
      <td>header-contextmenu</td>
      <td>当某一列的表头被鼠标右键点击时触发该事件</td>
      <td>column, event</td>
    </tr>
    <tr>
      <td>sort-change</td>
      <td>当表格的排序条件发生变化的时候会触发该事件</td>
      <td>{ column, prop, order }</td>
    </tr>
    <tr>
      <td>filter-change</td>
      <td>当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。</td>
      <td>filters</td>
    </tr>
    <tr>
      <td>current-change</td>
      <td>当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性</td>
      <td>currentRow, oldCurrentRow</td>
    </tr>
    <tr>
      <td>header-dragend</td>
      <td>当拖动表头改变了列的宽度的时候会触发该事件</td>
      <td>newWidth, oldWidth, column, event</td>
    </tr>
    <tr>
      <td>expand-change</td>
      <td>当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）</td>
      <td>row, (expandedRows | expanded)</td>
    </tr>
  </tbody>
</table>

### Table Methods

<table class="desc-table">
  <tbody>
    <tr>
      <td>方法名称</td>
      <td>说明</td>
      <td>参数</td>
    </tr>
    <tr>
      <td>clearSelection</td>
      <td>用于多选表格，清空用户的选择</td>
      <td>——</td>
    </tr>
    <tr>
      <td>toggleRowSelection</td>
      <td>用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）</td>
      <td>row, selected</td>
    </tr>
    <tr>
      <td>toggleAllSelection</td>
      <td>用于多选表格，切换全选和全不选</td>
      <td>——</td>
    </tr>
    <tr>
      <td>toggleRowExpansion</td>
      <td>用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）</td>
      <td>row, expanded</td>
    </tr>
    <tr>
      <td>setCurrentRow</td>
      <td>用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。</td>
      <td>row</td>
    </tr>
    <tr>
      <td>clearSort</td>
      <td>用于清空排序条件，数据会恢复成未排序的状态</td>
      <td>——</td>
    </tr>
    <tr>
      <td>clearFilter</td>
      <td>不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件</td>
      <td>columnKey</td>
    </tr>
    <tr>
      <td>doLayout</td>
      <td>对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法</td>
      <td>——</td>
    </tr>
    <tr>
      <td>sort</td>
      <td>手动对 Table 进行排序。参数<code>prop</code>属性指定排序列，<code>order</code>指定排序顺序。</td>
      <td>——</td>
    </tr>
  </tbody>
</table>

### Table Slot

<table class="desc-table">
  <tbody>
    <tr>
      <td>name</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>append</td>
      <td>插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个<code>slot</code>。若表格有合计行，该<code>slot</code>会位于合计行之上。</td>
    </tr>
  </tbody>
</table>

### Table-column Attributes

<table class="desc-table">
  <tbody>
    <tr>
      <td>参数</td>
      <td>说明</td>
      <td>类型</td>
      <td>可选值</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>type</td>
      <td>对应列的类型。如果设置了<code>selection</code>则显示多选框；如果设置了<code>index</code>则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮</td>
      <td>string</td>
      <td>selection/index/expand</td>
      <td>——</td>
    </tr>
    <tr>
      <td>index</td>
      <td>如果设置了<code>type=index</code>，暂时定为 (1)没有分页时，从1开始计数顺延；(2)有分页时，根据当前页及页数大小计算。</td>
      <td>function(index)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>column-key</td>
      <td>column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>label</td>
      <td>显示的标题</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>prop</td>
      <td>对应列内容的字段名，也可以使用<code>property</code>属性</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>width</td>
      <td>对应列的宽度</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>min-width</td>
      <td>对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>fixed</td>
      <td>列是否固定在左侧或者右侧，true 表示固定在左侧</td>
      <td>string/boolean</td>
      <td>true, left, right</td>
      <td>——</td>
    </tr>
    <tr>
      <td>render-header</td>
      <td>列标题<code>Label</code>区域渲染使用的<code>Function</code></td>
      <td>function({ column, $index })</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>sortable</td>
      <td>对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件</td>
      <td>boolean/string</td>
      <td>true, false, 'custom'</td>
      <td>false</td>
    </tr>
    <tr>
      <td>sort-method</td>
      <td>对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致</td>
      <td>function(a, b)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>sort-by</td>
      <td>指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推</td>
      <td>string/array/function(row, index)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>sort-orders</td>
      <td>数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序</td>
      <td>array</td>
      <td>数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序</td>
      <td>['ascending', 'descending', null]</td>
    </tr>
    <tr>
      <td>resizable</td>
      <td>对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>formatter</td>
      <td>用来格式化内容</td>
      <td>function(row, column, cellValue, index)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>show-overflow-tooltip</td>
      <td>当内容过长被隐藏时显示 tooltip</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>align</td>
      <td>对齐方式</td>
      <td>string</td>
      <td>left/center/right</td>
      <td>left</td>
    </tr>
    <tr>
      <td>header-align</td>
      <td>表头对齐方式，若不设置该项，则使用表格的对齐方式</td>
      <td>string</td>
      <td>left/center/right</td>
      <td>——</td>
    </tr>
    <tr>
      <td>class-name</td>
      <td>列的 className</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>label-class-name</td>
      <td>当前列标题的自定义类名</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>selectable</td>
      <td>仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选</td>
      <td>function(row, index)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>reserve-selection</td>
      <td>仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>filters</td>
      <td>数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。</td>
      <td>array[{ text, value }]</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>filter-placement</td>
      <td>过滤弹出框的定位</td>
      <td>string</td>
      <td>与 Tooltip 的<code>placement</code>属性相同</td>
      <td>——</td>
    </tr>
    <tr>
      <td>filter-multiple</td>
      <td>数据过滤的选项是否多选</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>filter-method</td>
      <td>数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示</td>
      <td>function(value, row, column)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>filtered-value</td>
      <td>选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。</td>
      <td>array</td>
      <td>——</td>
      <td>——</td>
    </tr>
  </tbody>
</table>

### Table-column Slot

<table class="desc-table">
  <tbody>
    <tr>
      <td>name</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>column.header</td>
      <td>自定义列头的渲染，参数为<code>{ column, $index }</code></td>
    </tr>
    <tr>
      <td>column.content</td>
      <td>自定义列内容的渲染，参数为<code>{ row, column, $index }</code></td>
    </tr>
  </tbody>
</table>
