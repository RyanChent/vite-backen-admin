import { ref, computed, watch, toRaw } from 'vue'
import { pick } from '../utils/props'
import { buttonBlur } from '../utils/dom'
import { deepClone } from '@/utils/data'
import _ from 'lodash'

const flatKeys = (data: any, prop: string) =>
  data.map((item: any) => {
    if (Array.isArray(item.children)) {
      return flatKeys(item.children, prop)
    }
    return item[prop]
  })

export const useTreeProps = (props: any, component: any) => {
  const treeRef = ref<any>(null)
  const searchValue = ref<any>('')
  const topPopoverShow = ref<boolean>(false)
  const newNode = ref<any>({
    [props.nodeKey]: '',
    [props.props.label]: '',
    [props.props.children]: [],
    editLabel: false
  })

  const treeProps = computed(() =>
    Object.assign(
      {
        defaultExpandKeys: props.data.map((item: any) => item[props.nodeKey]),
        emptyText: '暂无数据'
      },
      pick(props, Object.keys(component.props)),
      {
        checkStrictly: props.single,
        checkOnClickNode: true,
        expandOnClickNode: false,
        filterNodeMethod: (value: any, data: any, node: any) =>
          data[props.props?.label].includes(value) || value.includes(data[props.props?.label])
      }
    )
  )

  const addFirstLayerNode = () => {
    treeProps.value.data.push(deepClone(toRaw(newNode.value)))
    if (treeRef.value?.updateKeyChildren) {
      treeRef.value.updateKeyChildren(newNode.value[props.nodeKey], [])
    }
    newNode.value.id = ''
    newNode.value.label = ''
    topPopoverShow.value = false
  }

  watch(
    () => searchValue.value,
    _.debounce(() => {
      treeRef.value?.filter && treeRef.value.filter(searchValue.value)
    }, 500)
  )

  return {
    treeProps,
    treeRef,
    searchValue,
    topPopoverShow,
    newNode,
    addFirstLayerNode
  }
}

export const useHandleTree = function (this: any) {
  const onNodeClick = (data: any, node: any) => {
    this.$emit('node-click', data, node, this.treeRef)
  }

  const onNodeContextmenu = (event: MouseEvent, data: any, node: any) => {
    this.$emit('node-context-menu', event, data, node, this.treeRef)
  }

  const onCheckChange = (data: any, checked: boolean, checkedNodes: any) => {
    this.$emit('check-change', data, checked, checkedNodes)
  }

  const onCheck = (data: any, nodesProperty: any) => {
    if (this.single) {
      if (this.treeRef?.setCheckedKeys) {
        this.treeRef.setCheckedKeys(nodesProperty.checkedKeys.length > 0 ? [data.id] : [])
      }
    }
    this.$emit('check', data, nodesProperty)
  }

  const onCurrentChange = (data: any, node: any) => {
    this.$emit('current-change', data, node)
  }

  const onNodeExpand = (data: any, node: any) => {
    this.$emit('node-expand', data, node, this.treeRef)
  }

  const onNodeCollapse = (data: any, node: any) => {
    this.$emit('node-collapse', data, node, this.treeRef)
  }

  const onNodeDragStart = (node: any, event: DragEvent) => {
    this.$emit('node-drag-start', node, event)
  }

  const onNodeDragEnter = (drag: any, enter: any, event: DragEvent) => {
    this.$emit('node-drag-enter', drag, enter, event)
  }

  const onNodeDragLeave = (drag: any, enter: any, event: DragEvent) => {
    this.$emit('node-drag-leave', drag, enter, event)
  }

  const onNodeDragOver = (drag: any, enter: any, event: DragEvent) => {
    this.$emit('node-drag-over', drag, enter, event)
  }

  const onNodeDragEnd = (drag: any, drop: any, position: string, event: DragEvent) => {
    this.$emit('node-drag-end', drag, drop, position, event)
  }

  const onNodeDrop = (drag: any, drop: any, position: string, event: DragEvent) => {
    this.$emit('node-drop', drag, drop, position, event)
  }

  return {
    onNodeClick,
    onNodeDrop,
    onNodeDragEnd,
    onNodeDragOver,
    onNodeDragLeave,
    onNodeDragEnter,
    onNodeDragStart,
    onNodeCollapse,
    onNodeExpand,
    onCurrentChange,
    onCheck,
    onCheckChange,
    onNodeContextmenu
  }
}

export const useHandleTreeNode = (props: any, treeRef: any) => {
  const treeNodeAdd: Array<any> = [
    {
      command: 'before',
      icon: 'el-icon-top',
      desc: '节点前'
    },
    {
      command: 'inner',
      icon: 'el-icon-bottom-right',
      desc: '节点内'
    },
    {
      command: 'after',
      icon: 'el-icon-bottom',
      desc: '节点后'
    }
  ]
  const addTreeNode = (node: any, parent: any, position: string) => {
    const child: any = {
      [props.nodeKey]: parent[`new${props.nodeKey}`],
      [props.props.label]: parent[`new${props.props.label}`],
      editLabel: false,
      [props.props.children]: []
    }
    switch (position) {
      case 'before':
        treeRef.value?.insertBefore && treeRef.value.insertBefore(child, parent)
        break
      case 'inner':
        treeRef.value?.append && treeRef.value.append(child, parent)
        node.expanded = true
        break
      case 'after':
        treeRef.value?.insertAfter && treeRef.value.insertAfter(child, parent)
        break
    }
    delete parent[`new${props.nodeKey}`]
    delete parent[`new${props.props.label}`]
    treeRef.value?.updateKeyChildren &&
      treeRef.value.updateKeyChildren(child[props.nodeKey], child[props.props.children])
  }
  const removeTreeNode = (e: MouseEvent, node: any) => {
    buttonBlur(e)
    treeRef.value?.remove && treeRef.value.remove(node)
  }
  return {
    treeNodeAdd,
    addTreeNode,
    removeTreeNode
  }
}
