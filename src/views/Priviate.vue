<template>
  <div class="private-policy-page">
    <h1>隐私政策</h1>
    <p>
      &emsp;&emsp;深圳市哲远科技有限公司（以下简称“我们”），非常重视用户的隐私和个人信息保护。本隐私政策规定了我们如何收集、存储、使用、共享和处置用户个人信息，我们所有的产品和服务都适用于本隐私政策，我们将严格遵守本隐私政策。
    </p>
    <p>
      <b>关于信息收集和使用</b><br />
      &emsp;&emsp;当用户使用我们的服务时，我们会收集以下类型的信息，我们不会将这些信息提供给任何第三方机构。我们会严格遵守各电商平台的开发者协议与相关数据保护政策。<br />
      &emsp;&emsp;1.我们会需要收集用户的姓名，电子邮件，手机号码，信用卡信息和联系地址等其他相关信息。这些信息仅用于识别用户的身份和维护客户支持体验。<br />
      &emsp;&emsp;2.用户授权我们访问的第三方信息，包括订单信息、运输信息和供应商信息等，这些信息仅用于履行顾客订单。<br />
    </p>
    <p>
      <b>关于信息存储和保护</b><br />
      &emsp;&emsp;我们一直都十分重视保护用户的个人信息安全，为此我们使用符合行业标准的安全技术措施存储并加密用户的个人信息，防止这些信息遭到未经授权的访问、使用、修改；我们从组织建设、人员管理、权限管控等多个方面提升我们系统的安全性，包括和员工签订信息保密协议，定期开展信息安全相关的培训课程，采用严格的数据访问权限控制策略等；我们遵守所有适用的数据隐私和数据保护的法律包括欧盟数据保护条例，中华人民共和国网络安全法等。
    </p>
    <p>
      <b>关于信息共享</b><br />
      &emsp;&emsp;除非法律要求我们必须将用户的个人信息进行提供，未经用户的授权同意，我们不会将用户的个人信息共享给任何第三方机构。
    </p>
    <p>
      <b>关于cookies的使用</b><br />
      &emsp;&emsp;cookies是网站为了辨别用户身份，存储在用户本地终端上的小数据文件，其中并没有包含任何个人信息。我们仅将cookies用于优化顾客的使用体验，不会将其共享给任何第三方机构。用户可以自主选择删除计算机上的cookies或通过浏览器选择禁用我们的cookies，但这可能会对用户的使用体验产生一定影响。
    </p>
    <p>
      <b>隐私政策更新</b><br />
      &emsp;&emsp;为了给用户提供更好的服务，我们会根据产品的更新情况以及相关法律法规的要求更新我们的隐私政策，我们将会将新的隐私政策发布在我们的网站首页。
    </p>
    <p>
      <b>如何联系我们</b><br />
      &emsp;&emsp;如对本政策或我们的产品有任何问题、意见或建议，请随时发送邮件至<a
        href="mailto:zeyunerp@outlook.com"
        style="color: #606266"
        >zeyunerp@outlook.com</a
      >联系我们。
    </p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Private",
  setup() {},
});
</script>

<style lang="less">
.private-policy-page {
  max-width: @pageWidth;
  margin: 30px auto;
  h1 {
    font-weight: normal;
    text-align: center;
    margin: 10px 0 0;
    line-height: 40px;
  }
  p {
    line-height: 30px;
    margin-top: 30px;
    b {
      margin-bottom: 10px;
    }
  }
}
</style>
