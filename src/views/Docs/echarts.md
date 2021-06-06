---
title: 'Echarts 统计图'
---

## Echarts 统计图

### 基础用法

- 如下，传入`domId`与`options`即可，`options`配置可参考[echarts options](https://echarts.apache.org/zh/option.html#title)。

```vue demo
<template>
  <Echarts domId="vite-echarts" />
</template>
<script>
  import { defineComponent, resolveComponent } from 'vue'
  export default defineComponent({
    name: 'ChartsDemo',
    setup() {}
  })
</script>
```
