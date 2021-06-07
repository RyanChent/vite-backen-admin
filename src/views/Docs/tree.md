---
title: 'Tree 树形控件'
---

## Tree 树形控件

### 基础用法

- 使用同`element-plus`的`Tree`，参考[Element Tree](https://element-plus.org/#/zh-CN/component/tree)即可。

```vue demo
<template>
   <Tree 
      :data="treeData"
      node-key="id"
      show-checkbox 
    />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Tree from '@PC/Tree'
export default defineComponent({
    components: {
        Tree
    },
    setup () {
        const treeData = ref<any>([
            {
                id: 1,
                label: '节点1',
                children: [
                {
                    id: 2,
                    label: '节点2'
                },
                {
                    id: 3,
                    label: '节点3'
                }
                ]
            },
            {
                id: 4,
                label: '节点4'
            }
        ])
        return {
            treeData
        }
    }
})
</script>
```

### 开启搜索过滤

- 在`el-tree`基础上进行的扩展，设置`show-search = true`即可开启。

```vue demo
<template>
   <Tree 
      :data="treeData"
      node-key="id"
      show-search
    />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Tree from '@PC/Tree'
export default defineComponent({
    components: {
        Tree
    },
    setup () {
        const treeData = ref<any>([
            {
                id: 1,
                label: '节点1',
                children: [
                {
                    id: 2,
                    label: '节点2'
                },
                {
                    id: 3,
                    label: '节点3'
                }
                ]
            },
            {
                id: 4,
                label: '节点4'
            }
        ])
        return {
            treeData
        }
    }
})
</script>
```

### 开启单选

- 在`el-tree`基础上进行的扩展，设置`single = true`即可开启单选。

```vue demo
<template>
   <Tree 
      :data="treeData" 
      node-key="id"
      show-checkbox
      show-search
      single
    />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Tree from '@PC/Tree'
export default defineComponent({
    components: {
        Tree
    },
    setup () {
        const treeData = ref<any>([
            {
                id: 1,
                label: '节点1',
                children: [
                {
                    id: 2,
                    label: '节点2'
                },
                {
                    id: 3,
                    label: '节点3'
                }
                ]
            },
            {
                id: 4,
                label: '节点4'
            }
        ])
        return {
            treeData
        }
    }
})
</script>
```

### 开启节点编辑

- 在`el-tree`基础上进行的扩展，设置`editable = true`可开启编辑，包括节点的增删改。

```vue demo
<template>
   <Tree 
      :data="treeData"
      node-key="id"
      editable
    />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Tree from '@PC/Tree'
export default defineComponent({
    components: {
        Tree
    },
    setup () {
        const treeData = ref<any>([
            {
                id: 1,
                label: '节点1',
                children: [
                {
                    id: 2,
                    label: '节点2'
                },
                {
                    id: 3,
                    label: '节点3'
                }
                ]
            },
            {
                id: 4,
                label: '节点4'
            }
        ])
        return {
            treeData
        }
    }
})
</script>
```

### 多种功能合并

- 以上扩展，可针对业务需要，进行取舍，也可同时开启。

```vue demo
<template>
   <Tree 
      :data="treeData"
      node-key="id"
      editable
      single
      show-search
      show-checkbox
    />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Tree from '@PC/Tree'
export default defineComponent({
    components: {
        Tree
    },
    setup () {
        const treeData = ref<any>([
            {
                id: 1,
                label: '节点1',
                children: [
                {
                    id: 2,
                    label: '节点2'
                },
                {
                    id: 3,
                    label: '节点3'
                }
                ]
            },
            {
                id: 4,
                label: '节点4'
            }
        ])
        return {
            treeData
        }
    }
})
</script>
```

### Attribute

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
      <td>展示数据</td>
      <td>array</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>empty-text</td>
      <td>内容为空的时候展示的文本</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>node-key</td>
      <td>每个树节点用来作为唯一标识的属性，整棵树应该是唯一的</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>props</td>
      <td>配置选项，具体看下表</td>
      <td>object</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>render-after-expand</td>
      <td>是否在第一次展开某个树节点后才渲染其子节点</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>load</td>
      <td>加载子树数据的方法，仅当 lazy 属性为true 时生效</td>
      <td>function(node, resolve)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>render-content</td>
      <td>树节点的内容区的渲染 Function</td>
      <td>function(h, { node, data, store })</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>highlight-current</td>
      <td>是否高亮当前选中节点，默认值是 false。</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>default-expand-all</td>
      <td>是否默认展开所有节点</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>expand-on-click-node</td>
      <td>是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>check-on-click-node</td>
      <td>是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>auto-expand-parent</td>
      <td>展开子节点的时候是否自动展开父节点</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>default-expanded-keys</td>
      <td>默认展开的节点的 key 的数组</td>
      <td>array</td>
      <td>——</td>
      <td>data.map(item => item[node-key])</td>
    </tr>
    <tr>
      <td>current-node-key</td>
      <td>当前选中的节点</td>
      <td>string/number</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>filter-node-method</td>
      <td>对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏</td>
      <td>function(value, data, node)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>accordion</td>
      <td>是否每次只打开一个同级树节点展开</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>indent</td>
      <td>相邻级节点间的水平缩进，单位为像素</td>
      <td>number</td>
      <td>——</td>
      <td>16</td>
    </tr>
    <tr>
      <td>icon-class</td>
      <td>自定义树节点的图标</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>lazy</td>
      <td>是否懒加载子节点，需与 load 方法结合使用</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>draggable</td>
      <td>是否开启拖拽节点功能</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>allow-drag</td>
      <td>判断节点能否被拖拽</td>
      <td>function(node)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>allow-drop</td>
      <td>拖拽时判定目标节点能否被放置。<code>type</code>参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后</td>
      <td>function(dragNode, dropNode, type)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>show-search</td>
      <td>是否开启搜索过滤</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>single</td>
      <td>是否开启单选功能</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>editable</td>
      <td>是否开启节点编辑</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

### Props

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
      <td>label</td>
      <td>指定节点标签为节点对象的某个属性值</td>
      <td>string/function(data, node)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>children</td>
      <td>指定子树为节点对象的某个属性值</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>指定节点选择框是否禁用为节点对象的某个属性值</td>
      <td>boolean/function(data, node)</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>isLeaf</td>
      <td>指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效</td>
      <td>boolean/function(data, node)</td>
      <td>——</td>
      <td>——</td>
    </tr>
  </tbody>
</table>

### Methods

- <code>Tree</code>内部使用了<code>Node</code>类型的对象来包装用户传入的数据，用来保存目前节点的状态。<code>Tree</code>拥有如下方法：

<table class="desc-table">
  <tbody>
    <tr>
      <td>方法名称</td>
      <td>说明</td>
      <td>参数</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>对树节点进行筛选操作</td>
      <td>接收一个任意类型的参数，该参数会在 <code>filter-node-method</code>中作为第一个参数，如果开启<code>show-search</code>则无需设置</td>
    </tr>
    <tr>
      <td>updateKeyChildren</td>
      <td>通过<code>keys</code>设置节点子元素，使用此方法必须设置<code>node-key</code>属性</td>
      <td>(key, data) 接收两个参数，1. 节点 key 2. 节点数据的数组</td>
    </tr>
    <tr>
      <td>getCheckedNodes</td>
      <td>若节点可被选择（即<code>show-checkbox</code>为<code>true</code>），则返回目前被选中的节点所组成的数组</td>
      <td>(leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为<code>false</code>2. 是否包含半选节点，默认值为<code>false</code></td>
    </tr>
    <tr>
      <td>setCheckedNodes</td>
      <td>设置目前勾选的节点，使用此方法必须设置 <code>node-key</code>属性</td>
      <td>(nodes) 接收勾选节点数据的数组</td>
    </tr>
    <tr>
      <td>getCheckedKeys</td>
      <td>若节点可被选择（即<code>show-checkbox</code>为<code>true</code>），则返回目前被选中的节点的<code>key</code>所组成的数组</td>
      <td>(leafOnly) 接收一个<code>boolean</code>类型的参数，若为<code>true</code>则仅返回被选中的叶子节点的<code>keys</code>，默认值为 false</td>
    </tr>
    <tr>
      <td>setCheckedKeys</td>
      <td>通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性</td>
      <td>(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为<code>true</code>则仅设置叶子节点的选中状态，默认值为<code>false</code></td>
    </tr>
    <tr>
      <td>setChecked</td>
      <td>通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性</td>
      <td>(key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为<code>false</code></td>
    </tr>
    <tr>
      <td>getHalfCheckedNodes</td>
      <td>若节点可被选择（即<code>show-checkbox</code>为<code>true</code>），则返回目前半选中的节点所组成的数组</td>
      <td>——</td>
    </tr>
    <tr>
      <td>getHalfCheckedKeys</td>
      <td>若节点可被选择（即<code>show-checkbox</code>为<code>true</code>），则返回目前半选中的节点的 key 所组成的数组</td>
      <td>——</td>
    </tr>
    <tr>
      <td>getCurrentKey</td>
      <td>获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null</td>
      <td>——</td>
    </tr>
    <tr>
      <td>getCurrentNode</td>
      <td>获取当前被选中节点的 data，若没有节点被选中则返回 null</td>
      <td>——</td>
    </tr>
    <tr>
      <td>setCurrentKey</td>
      <td>通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性</td>
      <td>(key, shouldAutoExpandParent=true) 1. 待被选节点的 key，若为 null 则取消当前高亮的节点 2. 是否扩展父节点</td>
    </tr>
    <tr>
      <td>setCurrentNode</td>
      <td>通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性</td>
      <td>(node, shouldAutoExpandParent=true) 1. 待被选节点的 node 2. 是否扩展父节点</td>
    </tr>
    <tr>
      <td>getNode</td>
      <td>根据 data 或者 key 拿到 Tree 组件中的 node</td>
      <td>(data) 要获得 node 的 key 或者 data</td>
    </tr>
    <tr>
      <td>remove</td>
      <td>删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性</td>
      <td>(data) 要删除的节点的 data 或者 node</td>
    </tr>
    <tr>
      <td>append</td>
      <td>为 Tree 中的一个节点追加一个子节点</td>
      <td>(data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node</td>
    </tr>
    <tr>
      <td>insertBefore</td>
      <td>为 Tree 的一个节点的前面增加一个节点</td>
      <td>(data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node</td>
    </tr>
    <tr>
      <td>insertAfter</td>
      <td>为 Tree 的一个节点的后面增加一个节点</td>
      <td>(data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node</td>
    </tr>
  </tbody>
</table>

### Events

<table class="desc-table">
  <tbody>
    <tr>
      <td>事件名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
    <tr>
      <td>node-click</td>
      <td>节点被点击时的回调</td>
      <td>共三个参数，依次为：传递给<code>data</code>属性的数组中该节点所对应的对象、节点对应的<code>Node</code>、树组件入口(ref)。</td>
    </tr>
    <tr>
      <td>node-context-menu</td>
      <td>当某一节点被鼠标右键点击时会触发该事件</td>
      <td>共四个参数，依次为：event、传递给 <code>data</code>属性的数组中该节点所对应的对象、节点对应的 Node、树组件入口(ref)。</td>
    </tr>
    <tr>
      <td>check-change</td>
      <td>节点选中状态发生变化时的回调</td>
      <td>共三个参数，依次为：传递给<code>data</code>属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点</td>
    </tr>
    <tr>
      <td>check</td>
      <td>当复选框被点击的时候触发</td>
      <td>共两个参数，依次为：传递给<code>data</code>属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性。单选启用时，树内部已处理好单选，仅需处理好数据即可。</td>
    </tr>
    <tr>
      <td>current-change</td>
      <td>当前选中节点变化时触发的事件</td>
      <td>共两个参数，依次为：当前节点的数据，当前节点的 Node 对象。</td>
    </tr>
    <tr>
      <td>node-expand</td>
      <td>节点被展开时触发的事件</td>
      <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、树组件入口(ref)。</td>
    </tr>
    <tr>
      <td>node-collapse</td>
      <td>节点被关闭时触发的事件</td>
      <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、树组件入口(ref)。</td>
    </tr>
    <tr>
      <td>node-drag-start</td>
      <td>节点开始拖拽时触发的事件</td>
      <td>共两个参数，依次为：被拖拽节点对应的 Node、event。</td>
    </tr>
    <tr>
      <td>node-drag-enter</td>
      <td>拖拽进入其他节点时触发的事件</td>
      <td>共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event。</td>
    </tr>
    <tr>
      <td>node-drag-leave</td>
      <td>拖拽离开某个节点时触发的事件</td>
      <td>共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event。</td>
    </tr>
    <tr>
      <td>node-drag-over</td>
      <td>在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）</td>
      <td>共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event。</td>
    </tr>
    <tr>
      <td>node-drag-end</td>
      <td>拖拽结束时（可能未成功）触发的事件</td>
      <td>共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event。</td>
    </tr>
    <tr>
      <td>node-drop</td>
      <td>拖拽成功完成时触发的事件</td>
      <td>共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event。</td>
    </tr>
  </tbody>
</table>

### Slot

<table class="desc-table">
  <tbody>
    <tr>
      <td>name</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>——</td>
      <td>自定义树节点的内容，参数为<code>{ node, data }</code></td>
    </tr>
    <tr>
      <td>node</td>
      <td>节点内容渲染，参数为<code>{ node, data }</code>，默认使用<code>el-input</code>处理</td>
    </tr>
  </tbody>
</table>