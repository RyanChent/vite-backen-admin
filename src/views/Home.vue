<template>
  <div class="home-page">
    <section class="home-platform">
      <div class="left-pic" />
      <div class="right-desc">
        <p style="color: #323232; font-size: 24px">
          <b>对接平台</b>
          <span class="divider" />
        </p>
        <p style="color: #5f6062; font-size: 14px; line-height: 24px">
          Amazon，AliExpress，Ebay，Wish，DHgate，Lazada，Shopee，Shopify，Magento，
          Newegg，Joom，woocommerce，Rumall，Souq，Jumia，Gmarket，Bigcommerce，
          Priceminister，walmart
        </p>
      </div>
    </section>
    <section class="home-core">
      <p style="color: #323232; font-size: 24px; text-align: center">
        <b>核心功能</b>
        <span class="divider" style="margin: 10px auto" />
      </p>
      <ul class="home-core-list">
        <li>
          <div class="bg" style="width: 75px; height: 75px" />
          <div class="desc">
            <span>智能补货</span><br />
            <span>动态推荐捕获数据</span>
          </div>
        </li>
        <li>
          <div
            class="bg"
            style="background-position: 75px 0; width: 75px; height: 75px"
          />
          <div class="desc">
            <span>广告管理</span><br />
            <span>自动化广告策略设置</span>
          </div>
        </li>
        <li>
          <div
            class="bg"
            style="background-position: 150px 0; width: 75px; height: 75px"
          />
          <div class="desc">
            <span>客服管理</span><br />
            <span>高效客服管理体系</span>
          </div>
        </li>
        <li>
          <div
            class="bg"
            style="background-position: 225px 0; width: 75px; height: 75px"
          />
          <div class="desc">
            <span>利润报表</span><br />
            <span>精准展现利润数据</span>
          </div>
        </li>
        <li style="margin-top: 60px">
          <div
            class="bg"
            style="background-position: 0 74px; height: 74px; width: 75px"
          />
          <div class="desc">
            <span>赶跟卖工具</span><br />
            <span>便捷管理跟卖数据</span>
          </div>
        </li>
        <li style="margin-top: 60px">
          <div
            class="bg"
            style="background-position: 75px 74px; height: 74px; width: 75px"
          />
          <div class="desc">
            <span>ASIN分析</span><br />
            <span>精细化运营分析必备</span>
          </div>
        </li>
        <li style="margin-top: 60px">
          <div
            class="bg"
            style="background-position: 150px 74px; height: 74px; width: 75px"
          />
          <div class="desc">
            <span>物流对接</span><br />
            <span>多方位物流解决方案</span>
          </div>
        </li>
        <li style="margin-top: 60px">
          <div
            class="bg"
            style="background-position: 225px 74px; height: 74px; width: 75px"
          />
          <div class="desc">
            <span>采购管理</span><br />
            <span>统一管理供应商信息</span>
          </div>
        </li>
      </ul>
    </section>
    <section class="home-select">
      <div class="content">
        <div style="color: #eae9ff; font-size: 24px; text-align: center">
          <b>选择我们</b>
          <span
            class="divider"
            style="margin: 10px auto; background-color: #adacff"
          />
        </div>
        <ul class="content-list">
          <li>
            <div class="bg" style="width: 40px; height: 37px" />
            <div class="desc">
              <span>多平台对接</span><br />
              <span>20+主流平台完成对接，一个系统管理多个平台</span>
            </div>
          </li>
          <li>
            <div
              class="bg"
              style="width: 40px; height: 37px; background-position: 40px 0"
            />
            <div class="desc">
              <span>一站式服务</span><br />
              <span>从采购到售后，协助卖家构建完整的数据化运营闭环</span>
            </div>
          </li>
          <li>
            <div
              class="bg"
              style="width: 40px; height: 37px; background-position: 80px 0"
            />
            <div class="desc">
              <span>完善的产品售后支持</span><br />
              <span>全天候为客户提供技术支持，解答客户疑问</span>
            </div>
          </li>
          <li>
            <div
              class="bg"
              style="width: 40px; height: 37px; background-position: 120px 0"
            />
            <div class="desc">
              <span>定制化服务</span><br />
              <span>以客户业务发展需求为导向，定制化跨境电商ERP服务</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="home-logistic">
      <div style="color: #323232; font-size: 24px; text-align: center">
        <b>合作物流</b>
        <span class="divider" style="margin: 10px auto" />
      </div>
      <div class="logistic-map" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style lang="less">
.home-page {
  margin-bottom: 60px;
  .home-platform {
    width: @pageWidth;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    user-select: none;
    .left-pic {
      background-image: url(../assets/duijie.png);
      background-size: cover;
      background-repeat: no-repeat;
      width: 367px;
      margin-right: 100px;
      height: 140px;
    }
    .right-desc {
      flex: 1;
      margin-top: 15px;
    }
  }
  .home-core {
    width: @pageWidth;
    margin: 100px auto 0;
    user-select: none;
    .home-core-list {
      display: flex;
      flex-flow: row wrap;
      li {
        flex: 0 0 25%;
        .bg {
          margin: 10px auto;
          background-image: url(../assets/heixin.png);
        }
        .desc {
          text-align: center;
          span {
            font-size: 16px;
            color: #323232;
            &:not(:first-child) {
              font-size: 14px;
              color: #5f6062;
            }
          }
        }
      }
    }
  }
  .home-select {
    margin: 100px 0 0;
    user-select: none;
    background-color: #360073;
    .content {
      width: @pageWidth;
      margin: 0 auto;
      padding: 50px 0 90px;
    }
    .content-list {
      display: flex;
      flex-flow: row wrap;
      margin-top: 50px;
      li {
        flex: 0 0 25%;
        .bg {
          margin: 10px auto;
          background-image: url(../assets/xuanzhe.png);
        }
        .desc {
          text-align: center;
          span {
            color: #eae9ff;
            font-size: 18px;
            font-weight: bold;
            &:not(:first-child) {
              font-size: 14px;
              font-weight: normal;
              color: #c3c0e0;
              display: inline-block;
              width: 65%;
              margin-top: 10px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
  .home-logistic {
    margin: 100px auto 0;
    user-select: none;
    width: @pageWidth;
    .logistic-map {
      background-image: url(../assets/wuliu.jpg);
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      min-height: 305px;
    }
  }
}
</style>
