---
title: 'Steps 步骤页'
---

## Steps 步骤

### 基础用法

- `el-steps`与`el-carousel`结合，pc 端由于屏幕宽度够，所以在步骤不是很多的情况下，默认`horizontal`是可以横向放置各步骤的内容，基本用法如下:

```vue demo
<template>
  <Steps
    v-model:active="active"
    v-bind="{
      'align-center': true,
      'finish-status': 'success',
      steps
    }"
    class="manage-pc-steps-demo"
  >
    <template #step0>
      <div class="test-panel"> 测试面板1 </div>
    </template>
    <template #step1>
      <div class="test-panel"> 测试面板2 </div>
    </template>
    <template #step2>
      <div class="test-panel"> 测试面板3 </div>
    </template>
    <template #step3>
      <div class="test-panel"> 测试面板4 </div>
    </template>
    <template #step4>
      <div class="test-panel"> 测试面板5 </div>
    </template>
  </Steps>
</template>
<script lang="ts">
  import getSteps from '@/data/steps'
  import { defineComponent, ref, reactive } from 'vue'
  export default defineComponent({
    name: 'StepsDemo',
    setup() {
      return {
        active: ref<number>(0),
        steps: reactive((getSteps as Function)())
      }
    }
  })
</script>
<style lang="less" src="../Steps/style.less" />
```

- 其中，步骤`steps`数组的每一项的内容可以是文本也可以是`VNode`，`@/data/steps`具体数据如下：

```typescript src=../../data/steps.tsx

```

### 自定义上一步、下一步、确定

- 默认的上一步与下一步，仅仅只是步骤的切换。如果在步骤切换的过程中，需要额外处理的话可以传入一个回调函数，以及在最后确定的时候的要做的操作，也可以传入一个回调函数处理

```vue demo
<template>
  <Steps
    v-model:active="active"
    v-bind="{
      'align-center': true,
      'finish-status': 'success',
      steps,
      confirm: () => $message.success('我到底了'),
      prev: () => $message.info('上一步'),
      next: () => $message.info('下一步')
    }"
    class="manage-pc-steps-demo"
  >
    <template #step0>
      <div class="test-panel"> 测试面板1 </div>
    </template>
    <template #step1>
      <div class="test-panel"> 测试面板2 </div>
    </template>
    <template #step2>
      <div class="test-panel"> 测试面板3 </div>
    </template>
    <template #step3>
      <div class="test-panel"> 测试面板4 </div>
    </template>
    <template #step4>
      <div class="test-panel"> 测试面板5 </div>
    </template>
  </Steps>
</template>
<script lang="ts">
  import getSteps from '@/data/steps'
  import { defineComponent, ref, reactive } from 'vue'
  export default defineComponent({
    name: 'StepsDemo',
    setup() {
      return {
        active: ref<number>(0),
        steps: reactive((getSteps as Function)())
      }
    }
  })
</script>
<style lang="less" src="../Steps/style.less" />
```

### Steps Attributes

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
      <td>space</td>
      <td>每个 step 的间距，不填写将自适应间距。支持百分比。</td>
      <td>number/string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>direction</td>
      <td>显示方向</td>
      <td>string</td>
      <td>vertical/horizontal</td>
      <td>horizontal</td>
    </tr>
    <tr>
      <td>active</td>
      <td>设置当前激活步骤</td>
      <td>number</td>
      <td>——</td>
      <td>0</td>
    </tr>
    <tr>
      <td>process-status</td>
      <td>设置当前步骤状态</td>
      <td>string</td>
      <td>wait/process/finish/error/success</td>
      <td>process</td>
    </tr>
    <tr>
      <td>finish-status</td>
      <td>设置结束步骤的状态</td>
      <td>string</td>
      <td>wait/process/finish/error/success</td>
      <td>finish</td>
    </tr>
    <tr>
      <td>align-center</td>
      <td>进行居中对齐</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>simple</td>
      <td>是否应用简洁风格</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>steps</td>
      <td>步骤配置数组</td>
      <td>array</td>
      <td>——</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>next</td>
      <td>自定义下一步回调函数</td>
      <td>function</td>
      <td>——</td>
      <td><code>() => {}</code></td>
    </tr>
    <tr>
      <td>prev</td>
      <td>自定义上一步回调函数</td>
      <td>function</td>
      <td>——</td>
      <td><code>() => {}</code></td>
    </tr>
    <tr>
      <td>confirm</td>
      <td>自定义确定回调函数</td>
      <td>function</td>
      <td>——</td>
      <td><code>() => {}</code></td>
    </tr>
  </tbody>
</table>

### Step Attributes

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
      <td>title</td>
      <td>步骤的标题，可直接传入<code>VNode</code></td>
      <td>string/VNode</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>icon</td>
      <td>步骤的图标，可直接传入<code>VNode</code></td>
      <td>string/VNode</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>description</td>
      <td>步骤的描述，可直接传入<code>VNode</code></td>
      <td>string/VNode</td>
      <td>——</td>
      <td>——</td>
    </tr>
  </tbody>
</table>

### Steps Slot

<table class="desc-table">
  <tbody>
    <tr>
      <td>name</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>'step' + index</td>
      <td>自定义步骤面板的渲染，其中<code>index</code>是步骤数组每一项的索引。</td>
    </tr>
  </tbody>
</table>
