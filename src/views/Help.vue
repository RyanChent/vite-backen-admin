<template>
  <div class="help-page">
    <div style="color: #323232; font-size: 36px; text-align: center">
      联系我们
      <span class="divider" style="margin: 20px auto 0" />
    </div>
    <div class="location" />
    <ul class="help-info-list">
      <li>
        <i class="el-icon-office-building" />
        <span>深圳哲远贸易有限公司</span>
      </li>
      <li>
        <i class="el-icon-message" />
        <span>zeyunerp@outlook.com</span>
      </li>
      <li>
        <i class="el-icon-mobile-phone" />
        <span>13602518729</span>
      </li>
      <li>
        <i class="el-icon-map-location" />
        <span
          >深圳市龙岗区平湖街道禾花社区华南大道一号华南国际纺织服装原辅料
          物流区二期3E-101号</span
        >
      </li>
    </ul>
    <div
      style="
        color: #323232;
        font-size: 36px;
        text-align: center;
        margin-top: 120px;
      "
    >
      常见问答
      <span class="divider" style="margin: 20px auto 0" />
    </div>
    <div class="question-panel">
      <div>
        <p style="color: #222; font-size: 14px">
          <b><span class="circle" />泽云ERP如何保证企业的数据安全？</b>
        </p>
        <p style="font-size: 14px; margin-left: 15px; margin-top: 10px">
          泽云ERP建有独立的数据中心和异地备份中心，完善的数据保护政策和紧急
          事件处理机制。我们的系统采用细颗粒度权限分配机制，无论是顾客还是我
          们内部的员工，都只能根据职责查看对应权限的数据。这些都能帮助我们最
          大化程度保护企业的数据安全。
        </p>
      </div>
      <div>
        <p style="color: #222; font-size: 14px">
          <b><span class="circle" />泽云ERP如何帮助企业高效地适应我们的ERP？</b>
        </p>
        <p style="font-size: 14px; margin-left: 15px; margin-top: 10px">
          企业购买泽云ERP软件后，我们将第一时间安排技术和客服人员与您对接，
          为您提供一系列免费的培训，帮助您的企业高效地使用我们的ERP。
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Help",
});
</script>

<style lang="less">
.help-page {
  width: @pageWidth;
  margin: 0 auto;
  user-select: none;
  .location {
    margin-top: 40px;
    background-size: cover;
    background-image: url(../assets/map.jpg);
    width: 100%;
    background-repeat: no-repeat;
    min-height: 605px;
  }
  .help-info-list {
    margin-top: 30px;
    display: flex;
    flex-flow: row wrap;
    padding: 0 75px;
    li {
      flex: 0 0 50%;
      line-height: 30px;
      i {
        vertical-align: middle;
        width: 20px;
        height: 20px;
        color: #302623;
        margin-right: 10px;
      }
      span {
        font-size: 14px;
        color: #5f6062;
      }
    }
  }
  .question-panel {
    display: flex;
    margin-top: 75px;
    margin-bottom: 100px;
    & > div {
      flex: calc(50% - 20px);
      background-color: #ffffff;
      box-shadow: 0px 3px 18px 0px rgba(40, 0, 74, 0.07);
      border-radius: 4px;
      padding: 25px;
      & + div {
        margin-left: 40px;
      }
      .circle {
        width: 8px;
        height: 8px;
        vertical-align: 3px;
        margin-right: 10px;
        border-radius: 50%;
        display: inline-block;
        background-color: #222;
      }
    }
  }
}
</style>
