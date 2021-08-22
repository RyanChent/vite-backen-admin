---
title: 'Form 表单'
---

## Form 表单

### 基础用法

- 使用同`element-plus`的`Form`，参考[Element Form](https://element-plus.org/#/zh-CN/component/form)配置表单项数组即可，如果不是使用插槽，每一项还需额外几个字段。具体如下：

```vue demo
<template>
  <Form
    v-model:model="model"
    v-model:schema="schema"
    @form-methods="
      (methods) => {
        formMethods = methods
      }
    "
  >
    <template #footer>
      <footer style="display: flex; justify-content: center; align-items: center">
        <el-button type="success" icon="el-icon-check" plain round @click="Submit">提交</el-button>
        <el-button type="danger" icon="el-icon-delete" plain round @click="Cancel">重置</el-button>
      </footer>
    </template>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import formDemo from '@/data/formDemo'
  import { buttonBlur } from '@/utils/dom'
  export default defineComponent({
    name: 'FormDemoShow',
    setup() {
      const formMethods = ref<any>({})
      const Submit = (e: MouseEvent) => {
        buttonBlur(e)
        formMethods.value.validate((success, fields) => {
          console.log(success, fields, '在这里可以调接口')
        })
      }
      const Cancel = (e: MouseEvent) => {
        buttonBlur(e)
        formMethods.value.resetFields()
      }
      return {
        model: ref<any>({
          test1: '',
          test2: [],
          test3: '',
          test4: [],
          test5: '',
          test6: [],
          test7: new Date(),
          test8: [],
          test9: []
        }),
        schema: ref<any>(formDemo),
        formMethods,
        Submit,
        Cancel
      }
    }
  })
</script>
```

### 开启校验追踪

- 在`el-form`基础上进行的扩展，设置`chaseError`为`true`即可开启校验不通过后跳到第一个不通过的项。

```vue demo
<template>
  <Form
    v-model:model="model"
    v-model:schema="schema"
    chaseError
    @form-methods="
      (methods) => {
        formMethods = methods
      }
    "
  >
    <template #footer>
      <footer style="display: flex; justify-content: center; align-items: center">
        <el-button type="success" icon="el-icon-check" plain round @click="Submit">提交</el-button>
        <el-button type="danger" icon="el-icon-delete" plain round @click="Cancel">重置</el-button>
      </footer>
    </template>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import formDemo from '@/data/formDemo'
  import { buttonBlur } from '@/utils/dom'
  export default defineComponent({
    name: 'FormDemoShow',
    setup() {
      const formMethods = ref<any>({})
      const Submit = (e: MouseEvent) => {
        buttonBlur(e)
        formMethods.value.validateChaseError((success, fields) => {
          console.log(success, fields, '在这里可以调接口')
        })
      }
      const Cancel = (e: MouseEvent) => {
        buttonBlur(e)
        formMethods.value.resetFields()
      }
      return {
        model: ref<any>({
          test1: '',
          test2: [],
          test3: '',
          test4: [],
          test5: '',
          test6: [],
          test7: new Date(),
          test8: [],
          test9: []
        }),
        schema: ref<any>(formDemo.slice(0, 6)),
        formMethods,
        Submit,
        Cancel
      }
    }
  })
</script>
```

### 开启动态表单

- 在`el-form`基础上进行的扩展，设置`dynamic`为`true`即可开启动态增删表单项，目前暂不支持快捷项插槽及自定义项。

```vue demo
<template>
  <Form
    v-model:model="model"
    v-model:schema="schema"
    dynamic
    @form-methods="
      (methods) => {
        formMethods = methods
      }
    "
  >
    <template #footer>
      <el-button type="success" icon="el-icon-check" plain round @click="Submit">提交</el-button>
      <el-button type="danger" icon="el-icon-delete" plain round @click="Cancel">重置</el-button>
    </template>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import formDemo from '@/data/formDemo'
  import { buttonBlur } from '@/utils/dom'
  export default defineComponent({
    name: 'FormDemoShow',
    setup() {
      const formMethods = ref<any>({})
      const Submit = (e: MouseEvent) => {
        buttonBlur(e)
        formMethods.value.validateChaseError((success, fields) => {
          console.log(success, fields, '在这里可以调接口')
        })
      }
      const Cancel = (e: MouseEvent) => {
        buttonBlur(e)
        formMethods.value.resetFields()
      }
      return {
        model: ref<any>({
          test1: '',
          test2: [],
          test3: '',
          test4: [],
          test5: '',
          test6: [],
          test7: new Date(),
          test8: [],
          test9: []
        }),
        schema: ref<any>(formDemo.slice(0, 6)),
        formMethods,
        Submit,
        Cancel
      }
    }
  })
</script>
```

### 多种功能合并

- 如需要，针对以上功能，可同时开启在一个表单中。

```vue demo
<template>
  <Form
    v-model:model="model"
    v-model:schema="schema"
    dynamic
    chaseError
    @form-methods="
      (methods) => {
        formMethods = methods
      }
    "
  >
    <template #footer>
      <el-button type="success" icon="el-icon-check" plain round @click="Submit">提交</el-button>
      <el-button type="danger" icon="el-icon-delete" plain round @click="Cancel">重置</el-button>
    </template>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import formDemo from '@/data/formDemo'
  import { buttonBlur } from '@/utils/dom'
  export default defineComponent({
    name: 'FormDemoShow',
    setup() {
      const formMethods = ref<any>({})
      const Submit = (e: MouseEvent) => {
        buttonBlur(e)
        console.log(formMethods.value)
        formMethods.value.validateChaseError((success, fields) => {
          console.log(success, fields, '在这里可以调接口')
        })
      }
      const Cancel = (e: MouseEvent) => {
        buttonBlur(e)
        formMethods.value.resetFields()
      }
      return {
        model: ref<any>({
          test1: '',
          test2: [],
          test3: '',
          test4: [],
          test5: '',
          test6: [],
          test7: new Date(),
          test8: [],
          test9: []
        }),
        schema: ref<any[]>(formDemo),
        formMethods,
        Submit,
        Cancel
      }
    }
  })
</script>
```

### 表单项数组

```typescript src=../../data/formDemo.ts

```

### Form Attributes

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
      <td>model / v-model:model</td>
      <td>表单数据对象</td>
      <td>object</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>rules</td>
      <td>表单验证规则</td>
      <td>object</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>inline</td>
      <td>行内表单模式</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>label-position</td>
      <td>表单域标签的位置，如果值为left或者right时，则需要设置<code>label-width</code></td>
      <td>string</td>
      <td>right/left/top</td>
      <td>right</td>
    </tr>
    <tr>
      <td>label-width</td>
      <td>表单域标签的宽度，作为Form直接子元素的form-item会继承该值，支持<code>auto</code></td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>label-suffix</td>
      <td>表单域标签的后缀</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>hide-required-asterisk</td>
      <td>是否显示必填字段的标签旁边的红色星号</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>show-message</td>
      <td>是否以行内形式展示校验信息</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>inline-message</td>
      <td>是否以行内形式展示校验信息</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>status-icon</td>
      <td>是否在输入框中显示校验结果反馈图标</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>validate-on-rule-change</td>
      <td>是否在<code>rules</code>属性改变后立即触发一次验证</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>size</td>
      <td>用于控制该表单内组件的尺寸</td>
      <td>string</td>
      <td>——</td>
      <td>medium/small/mini</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>dynamic</td>
      <td>是否开启动态表单</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>chaseError</td>
      <td>是否开启校验跟踪</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>schema / v-model:schema</td>
      <td>表单项ui配置，详细配置见下方schema attributes</td>
      <td>object</td>
      <td>——</td>
      <td>{}</td>
    </tr>
  </tbody>
</table>

### Form Methods

<table class="desc-table">
  <tbody>
    <tr>
      <td>方法名称</td>
      <td>说明</td>
      <td>参数</td>
    </tr>
    <tr>
      <td>validate</td>
      <td>对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise</td>
      <td>Function(callback: Function(boolean, object))</td>
    </tr>
    <tr>
      <td>validateField</td>
      <td>对部分表单字段进行校验的方法</td>
      <td>Function(props: array | string, callback: Function(errorMessage: string))</td>
    </tr>
    <tr>
      <td>validateChaseError</td>
      <td>开启校验追踪后，才能使用的方法，校验失败自动跳转到第一个失败的表单字段</td>
      <td>Function(callback: Function(boolean, object))</td>
    </tr>
    <tr>
      <td>resetFields</td>
      <td>对整个表单进行重置，将所有字段值重置为初始值并移除校验结果</td>
      <td>——</td>
    </tr>
    <tr>
      <td>clearValidate</td>
      <td>移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果</td>
      <td>Function(props: array | string)</td>
    </tr>
  </tbody>
</table>

### Form Events

<table class="desc-table">
  <tbody>
    <tr>
      <td>事件名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
    <tr>
      <td>form-methods</td>
      <td>form初始化挂载完毕后触发，返回<code>form</code>的内置处理方法</td>
      <td>表单方法对象</td>
    </tr>
    <tr>
      <td>validate</td>
      <td>任一表单项被校验后触发</td>
      <td>被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）</td>
    </tr>
  </tbody>
</table>

### Form Slots

<table class="desc-table">
  <tbody>
    <tr>
      <td>name</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>[item.prop]</td>
      <td>按照每一项的key，自定义渲染，包括外层el-form-item</td>
    </tr>
    <tr>
      <td>footer</td>
      <td>底部操作区域，如开启动态表单，则默认第一个元素为新增表单项按钮</td>
    </tr>
  </tbody>
</table>

### Schema Attributes

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
      <td>表单项描述</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>content</td>
      <td>表单项内容渲染组件，字符串目前暂只支持全局注入的组件，VNode需自行写jsx</td>
      <td>string/VNode</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>prop</td>
      <td>表单项绑定字段</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>attr</td>
      <td>表单项内容渲染组件的<code>attributes</code></td>
      <td>object</td>
      <td>——</td>
      <td>{}</td>
    </tr>
    <tr>
      <td>rules</td>
      <td>表单项自定义校验规则</td>
      <td>array</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>hide</td>
      <td>表单项是否隐藏</td>
      <td>boolean</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>linkage</td>
      <td>表单项联动处理，包括设置是否隐藏也在此</td>
      <td>function</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>show-message</td>
      <td>是否以行内形式展示校验信息</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>inline-message</td>
      <td>是否以行内形式展示校验信息</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>required</td>
      <td>是否必填，如不设置，则会根据校验规则自动生成</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>error</td>
      <td>表单域验证错误信息, 设置该值会使表单验证状态变为<code>error</code>，并显示该错误信息</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>size</td>
      <td>用于控制该表单内组件的尺寸</td>
      <td>string</td>
      <td>——</td>
      <td>medium/small/mini</td>
    </tr>
  </tbody>
</table>

### Schema Slots

<table class="desc-table">
  <tbody>
    <tr>
      <td>name</td>
      <td>说明</td>
    </tr>
    <tr>
      <td>label</td>
      <td>标签文本的内容</td>
    </tr>
    <tr>
      <td>error</td>
      <td>自定义表单校验信息的显示方式，参数为 { error }</td>
    </tr>
  </tbody>
</table>
