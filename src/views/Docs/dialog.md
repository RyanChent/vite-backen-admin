---
title: 'Dialog 对话框'
---

## Dialog 对话框

### 基础用法

- 使用同`element-plus`的`Dialog`，参考[Element Dialog](https://element-plus.org/#/zh-CN/component/dialog)即可

```vue demo
<template>
  <el-button type="text" @click="visible = true">触发基本弹窗</el-button>
  <Dialogs v-model="visible" title="基础用法">
    <div>我是基础用法</div>
  </Dialogs>
</template>
<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'BasicDialog',
    setup() {
      return {
        visible: ref(false)
      }
    }
  })
</script>
```

### 开启最大最小化

- 在`el-dialog`基础上进行的扩展，最大化直接`showMaximize = true`即可，而最小化不仅要`showMinimize = true`，而且需要有一个容器放置。

```vue demo
<template>
  <el-button type="text" @click="visible = true">触发最大最小化弹窗</el-button>
  <Dialogs v-model="visible" showMaximize title="我是最大最小化弹窗">
    <div>我是最大最小化弹窗</div>
  </Dialogs>
</template>
<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'MaximizeMinimize',
    setup() {
      return {
        visible: ref(false)
      }
    }
  })
</script>
```

- 这里没有装最小化的容器，故不开启`showMinimize`。

### 开启拖拽

- 在`el-dialog`基础上进行的扩展，`dragging`置为`true`即可开启弹窗拖拽

```vue demo
<template>
  <el-button type="text" @click="visible = true">触发弹窗拖拽</el-button>
  <Dialogs v-model="visible" dragging title="拖拽弹窗">
    <div>我是拖拽弹窗</div>
  </Dialogs>
</template>
<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'DragDialog',
    setup() {
      return {
        visible: ref(false)
      }
    }
  })
</script>
```

### 多种功能合并

- 如需要，针对以上功能，可同时开启在一个弹窗中。

```vue demo
<template>
  <el-button type="text" @click="visible = true">触发多功能弹窗</el-button>
  <Dialogs v-model="visible" showMaximize dragging title="多功能弹窗">
    <div>我是多重功能的弹窗</div>
  </Dialogs>
</template>
<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'MultiDialog',
    setup() {
      return {
        visible: ref(false)
      }
    }
  })
</script>
```

### Attribute

<table>
  <tbody>
    <tr>
      <td>参数</td>
      <td>说明</td>
      <td>类型</td>
      <td>可选值</td>
      <td>默认值</td>
    </tr>
    <tr>
      <td>model-value/v-model</td>
      <td>是否显示Dialog</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>title</td>
      <td>Dialog 的标题，也可通过具名 slot （见下表）传入</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>width</td>
      <td>Dialog的宽度</td>
      <td>string/number</td>
      <td>——</td>
      <td>50%</td>
    </tr>
    <tr>
      <td>fullscreen</td>
      <td>是否为全屏Dialog</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>top</td>
      <td>Dialog CSS 中的 margin-top 值，最大化，最小化，拖拽时该值无效</td>
      <td>string</td>
      <td>——</td>
      <td>15vh</td>
    </tr>
    <tr>
      <td>modal</td>
      <td>是否需要遮罩层</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>append-to-body</td>
      <td>Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>lock-scroll</td>
      <td>是否在 Dialog 出现时将 body 滚动锁定</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>custom-class</td>
      <td>Dialog的自定义类名</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>close-on-click-modal</td>
      <td>是否可以通过点击 modal 关闭 Dialog</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>close-on-press-escape</td>
      <td>是否可以通过按下 ESC 关闭 Dialog</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>show-close</td>
      <td>是否显示关闭按钮</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>before-close</td>
      <td>关闭前的回调，会暂停Dialog的关闭</td>
      <td>function(done)，done 用于关闭 Dialog</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>center</td>
      <td>是否对头部和底部采用居中布局</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>destroy-on-close</td>
      <td>关闭时销毁 Dialog 中的元素</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>show-minimize</td>
      <td>开启弹窗最小化功能</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>show-maximize</td>
      <td>开启弹窗最大化功能</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>enter-transition</td>
      <td>弹窗开启动画，取值详情参考<a href="https://animate.style/" 
      target="__blank" rel="external nofollow">animate.css</a>，取代open-delay</td>
      <td>string</td>
      <td>——</td>
      <td>zoomIn</td>
    </tr>
    <tr>
      <td>fade-transition</td>
      <td>弹窗消失动画，取值详情参考<a href="https://animate.style/" 
      target="__blank" rel="external nofollow">animate.css</a>，取代close-delay</td>
      <td>string</td>
      <td>——</td>
      <td>zoomOut</td>
    </tr>
    <tr>
      <td>dragging</td>
      <td>弹窗开启拖拽</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

### Slot

<table>
  <tbody>
    <tr>
      <td>name</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>——</td>
      <td>Dialog的内容</td>
    </tr>
    <tr>
      <td>title</td>
      <td>Dialog标题区的内容</td>
    </tr>
    <tr>
      <td>footer</td>
      <td>Dialog按钮操作区的内容</td>
    </tr>
  </tbody>
</table>

### Events

<table>
  <tbody>
    <tr>
      <td>事件名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
    <tr>
      <td>open</td>
      <td>Dialog 打开的回调</td>
      <td>——</td>
    </tr>
    <tr>
      <td>opened</td>
      <td>Dialog 打开动画结束时的回调</td>
      <td>——</td>
    </tr>
    <tr>
      <td>close</td>
      <td>Dialog 关闭的回调</td>
      <td>——</td>
    </tr>
    <tr>
      <td>closed</td>
      <td>Dialog 关闭动画结束时的回调</td>
      <td>——</td>
    </tr>
  </tbody>
</table>
