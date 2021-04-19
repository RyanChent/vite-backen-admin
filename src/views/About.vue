<template>
  <div class="about-page">
    <div style="color: #323232; font-size: 36px; text-align: center">
      公司简介
      <span class="divider" style="margin: 20px auto 0" />
    </div>
    <div class="jianjie-section">
      <div class="left-pic" />
      <div class="right-desc">
        &emsp;&emsp;深圳哲远贸易有限公司一直致力于为跨境电商企业提供软件支持和电子商务解决方案，为企业跨境出海提供更高效便捷的服务。公司总部位于广东省深圳市，在义乌、广州、杭州等城市均设有服务中心，能够为客户提供及时、周到和专业的服务。<br />
        &emsp;&emsp;目前，义达ERP已经深度对接Amazon，AliExpress，Ebay，Wish，DHgate，Lazada，Shopee，Shopify等20+主流跨境电商平台。
      </div>
    </div>
    <div
      style="
        color: #323232;
        font-size: 36px;
        text-align: center;
        margin-top: 105px;
      "
    >
      企业文化
      <span class="divider" style="margin: 20px auto 0" />
      <div class="culture-section">
        <div>
          <div class="bg" />
          <div class="desc">
            <p>理念</p>
            <p>坚持以顾客的需求为导向</p>
          </div>
        </div>
        <div>
          <div class="bg" style="background-position: center" />
          <div class="desc">
            <p>宗旨</p>
            <p>以质量求生存&emsp;以服务求发展</p>
          </div>
        </div>
        <div>
          <div class="bg" style="background-position: right" />
          <div class="desc">
            <p>愿景</p>
            <p>成为全球最大的电商ERP平台</p>
          </div>
        </div>
      </div>
    </div>
    <div class="develop-section">
      <div class="develop-section-content">
        <header style="color: #323232; font-size: 36px; text-align: center">
          发展历程
          <span class="divider" style="margin: 20px auto 0" />
        </header>
        <section>
          <el-timeline>
            <el-timeline-item />
            <el-timeline-item>
              <template v-slot:dot>
                <span>2021年</span>
              </template>
              <el-card>
                <p>泽云ERP2.0正式推出，合作企业达300+</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item>
              <template v-slot:dot>
                <span>2020年</span>
              </template>
              <el-card>
                <p>逐步与多家大型知名企业达成合作协议， 泽云开放平台相继推出</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item>
              <template v-slot:dot>
                <span>2019年</span>
              </template>
              <el-card>
                <p>正式成立深圳哲远贸易有限公司， 推出泽云ERP正式版"</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item>
              <template v-slot:dot>
                <span>2018年</span>
              </template>
              <el-card>
                <p>公司主创人员组建，研发泽云ERP</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item />
          </el-timeline>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
});
</script>

<style lang="less">
.about-page {
  margin: 0 auto;
  .jianjie-section {
    width: @pageWidth;
    margin: 50px auto 0;
    display: flex;
    justify-content: space-between;
    .left-pic {
      background-size: cover;
      background-image: url(../assets/jianjie.png);
      background-repeat: no-repeat;
      width: 340px;
      height: 170px;
    }
    .right-desc {
      margin-left: 55px;
      font-size: 14px;
      color: #5f6062;
      line-height: 30px;
      flex: 1;
    }
  }
  .culture-section {
    width: @pageWidth;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 55px auto 0;
    & > div {
      flex: 0 0 calc(33.33% - 100px);
      min-width: 280px;
      background-color: #ffffff;
      border-radius: 4px;
      border: solid 1px #e2e2e2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px 15px;
    }
    .desc {
      margin-top: 60px;
      p {
        line-height: 30px;
        color: #323232;
        font-size: 22px;
        &:last-child {
          font-size: 16px;
          color: #5f6062;
          margin-top: 10px;
        }
      }
    }
    .bg {
      width: 80px;
      height: 80px;
      background-image: url(../assets/iconabout.png);
      background-repeat: no-repeat;
    }
  }
  .develop-section {
    margin: 85px 0 0;
    padding: 75px 0;
    user-select: none;
    background-color: #f3f5f6;
    .develop-section-content {
      width: @pageWidth;
      margin: 0 auto;
      section {
        margin-top: 60px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
