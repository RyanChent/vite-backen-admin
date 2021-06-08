---
title: 'Video 视频'
---

## Video 视频

### 基础用法

- 由于原来`vue-video-player`暂不支持`vue3`，故此视频播放组件是在`vue-video-player`的基础上改造适应`vue3`，感谢作者[surmon-china](https://github.com/surmon-china)。

```vue demo
<template>
  <VideoPlayer
    url="https://jarrychen.cn/video/tuoleijiya.MP4"
    poster="https://jarrychen.cn/video/tuoleijiya.jpeg"
    title="demo视频"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import VideoPlayer from '@PC/Video'

  export default defineComponent({
    name: 'VideoDemo',
    components: {
      VideoPlayer
    }
  })
</script>
```

- 视频播放配置`options`详见[videojs doc](https://docs.videojs.com/)，默认配置详见下方。

### 宽屏，网页全屏，下载

- 在`videojs`的基础上，扩展宽屏、网页全屏、下载三个按钮，开启分别对应`wideScreen`、`webFullScreen`、`download`。其中，宽屏需要配合样式进行设置。

```vue demo
<template>
  <VideoPlayer
    url="https://jarrychen.cn/video/yaliousi.MP4"
    poster="https://jarrychen.cn/video/yaliousi.jpg"
    title="demo视频2"
    wideScreen
    webFullScreen
    download
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import VideoPlayer from '@PC/Video'

  export default defineComponent({
    name: 'VideoDemo',
    components: {
      VideoPlayer
    }
  })
</script>
```

### Attributes

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
      <td>url</td>
      <td>视频播放地址，需公网可访问</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>poster</td>
      <td>视频播放海报，需公网可访问</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>title</td>
      <td>视频标题。</td>
      <td>string</td>
      <td>——</td>
      <td>——</td>
    </tr>
    <tr>
      <td>wideScreen</td>
      <td>是否开启宽屏</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>webFullScreen</td>
      <td>是否开启网页全屏</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>download</td>
      <td>是否开启下载</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>options</td>
      <td>视频播放的其他配置项</td>
      <td>object</td>
      <td>——</td>
      <td>——</td>
    </tr>
  </tbody>
</table>

### Options

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
      <td>playbackRates</td>
      <td>视频播放速度</td>
      <td>array</td>
      <td>——</td>
      <td>[0.5, 0.7, 1.0, 1.25, 1.5, 2.0]</td>
    </tr>
    <tr>
      <td>autoplay</td>
      <td>是否开启自动播放</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>muted</td>
      <td>是否静音播放</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>loop</td>
      <td>是否循环播放</td>
      <td>boolean</td>
      <td>——</td>
      <td>false</td>
    </tr>
    <tr>
      <td>preload</td>
      <td>是否在<code>video</code>初始化后开始下载视频</td>
      <td>string</td>
      <td>——</td>
      <td>auto</td>
    </tr>
    <tr>
      <td>language</td>
      <td>选择语言</td>
      <td>string</td>
      <td>——</td>
      <td>zh-CN</td>
    </tr>
    <tr>
      <td>aspectRatio</td>
      <td>视频宽高比</td>
      <td>string</td>
      <td>——</td>
      <td>2:1</td>
    </tr>
    <tr>
      <td>fluid</td>
      <td>视频大小自适应容器</td>
      <td>boolean</td>
      <td>——</td>
      <td>true</td>
    </tr>
    <tr>
      <td>sources</td>
      <td>视频播放源</td>
      <td>array</td>
      <td>——</td>
      <td>[this.url]</td>
    </tr>
    <tr>
      <td>poster</td>
      <td>视频播放海报</td>
      <td>string</td>
      <td>——</td>
      <td>this.poster</td>
    </tr>
    <tr>
      <td>notSupportedMessage</td>
      <td>视频无法播放时的提示消息</td>
      <td>string</td>
      <td>——</td>
      <td>此视频暂无法播放，请稍后再试</td>
    </tr>
    <tr>
      <td>controlBar</td>
      <td>视频播放控制菜单</td>
      <td>object</td>
      <td>——</td>
      <td>
        <pre>
          {
              timeDivider: true,
              durationDisplay: true,
              fullscreenToggle: true,
              captionsButton: false,
              chaptersButton: false,
              playbackRateMenuButton: true,
              LiveDisplay: true,
              subtitlesButton: false,
              remainingTimeDisplay: true,
              progressControl: true,
              volumeMenuButton: {
                  inline: false,
                  vertical: true
              }
          }
        </pre>
      </td>
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
      <td>title</td>
      <td>视频标题自定义渲染</td>
    </tr>
    <tr>
      <td>footer</td>
      <td>视频底部自定义渲染</td>
    </tr>
  </tbody>
</table>

### Event

<table class="desc-table">
  <tbody>
    <tr>
      <td>事件名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
    <tr>
      <td>ready</td>
      <td>视频初始化完毕后触发的事件</td>
      <td>共两个参数，依次为：视频组件本身<code>e</code>、视频的辅助工具类<code>videoUtils</code>。</td>
    </tr>
  </tbody>
</table>
