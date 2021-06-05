---
title: 'JsonEditor JSON编辑器'
---

## JsonEditor JSON编辑器

### 基础用法

- 数组`Array`

```vue demo
<template>
    <ArrayEditor :json="array" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ArrayEditor from '@PC/JsonEditor'
export default defineComponent({
    components: {
        ArrayEditor
    },
    setup () {
        const array = ref<Array<any>>([
            'a',
            function b() {
                console.log('c')
            },
            {
                d: {
                    e: [0, 2],
                    f: { 1: 3}
                }
            }
        ])
        return {
            array
        }
    }
})
</script>
```

- 对象`Object`

```vue demo
<template>
    <JsonEditor :json="json" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import JsonEditor from '@PC/JsonEditor'
export default defineComponent({
    components: {
        JsonEditor
    },
    setup () {
        const json = ref<any>({
            a: 1,
            b: true,
            c: [3, 4],
            d: {
                e: () => console.log,
                f: { g: 'h'}
            }
        })
        return {
            json
        }
    }
})
</script>
```

### 开启预览

- 在基础用法上，让`showJson = true`即可开启右侧面板，实时预览结构变化。

```vue demo
<template>
   <JsonEditor :json="json" showJson />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import JsonEditor from '@PC/JsonEditor'
export default defineComponent({
    components: {
        JsonEditor
    },
    setup () {
        const json = ref<number[]>(new Array(10).fill(0).map((_: undefined, index: number ) => index + 1))
        return {
            json
        }
    }
})
</script>
```

### 开启拖拽

- 基于基础用法，使得`draggable`为`true`即可开启，暂只支持同级拖拽

```vue demo
<template>
    <JsonEditor :json="json" showJson draggable />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import JsonEditor from '@PC/JsonEditor'
export default defineComponent({
    components: {
        JsonEditor
    },
    setup () {
        const json = ref<any>({
            a: 1,
            b: false,
            c: 'd',
            e: ['f', function g() { console.log('h') }]
        })
        return {
            json
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
      <td>json</td>
      <td>待绑定的json数据</td>
      <td>object/array</td>
      <td>——</td>
      <td>{}</td>
    </tr>
    <tr>
      <td>showJson</td>
      <td>是否展示预览界面</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>drggable</td>
      <td>是否开启节点拖拽(拖拽暂只支持同级)</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
  </tbody>
</table>