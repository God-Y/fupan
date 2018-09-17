<template>
  <div>
    <div class="compact-content">
      <h4>出借咨询与服务协议</h4>
      <p>本协议由以下双方于______年______月______日在中华人民共和国北京市朝阳区签署 </p>
      <p>甲方（出借人）： <span v-if="userInfo.idName">{{userInfo.idName}}</span></p>
      <p>证件类型：<span>{{userInfo.type}}</span></p> 
      <p>证件号：<span>{{userInfo.idNumber}}</span></p>
      <p>乙方：信和上融网络科技（北京）有限公司 </p>
      <p>住所地：北京市朝阳区东三环北路甲19号嘉盛中心3603室 </p>
      <p>鉴于： </p>
      <p>1.甲方有一定的出借需求，其自愿委托乙方及其合作公司为其提供出借咨询、资金委托划扣、 寻求合适的借款人等服务。 </p>
      <p>2.乙方作为互联网金融居间服务商，信和大金融平台（www.xinhe99.com网站）为其经营的 提供专业居间撮合服务的P2P平台，乙方及其合作公司将向甲方提供居间撮合服务，并向甲 方推荐相匹配的借款人，促成双方的交易并提供投资管理服务。 现双方就以上服务达成一致，特订立本协议。 </p>
      <p>第2条居间服务费 </p>
      <p>2.1居间服务费：指甲方通过乙方提供居间服务，成功进行资金出借或者回款再出借后，在 借款人偿还每期本息时，甲方需向乙方支付的费用。居间服务费的收取规则为：在达到甲方 年化借款利率的前提下，根据借款年利率、借款期限、出借期限等因素的不同，从借款人利 息回款中直接收取的一定比例的费用。 </p>
      <p>2.2甲方授权委托乙方合作的第三方支付机构/银行或乙方委托专业公司合作的第三方支付 机构/银行直接从甲方专用账户扣划相应金额用于支付本协议项下的各项费用（包括但不限 于居间服务费等）。</p>
      <p>第3条甲方权利与义务 </p>
      <p>3.1甲方自签署本协议之日起，即视为其自愿接受本协议所有条款所约定的内容。 </p>
      <p>3.2对于甲方与特定的借款人签订的《借款协议》所规定的任何应从甲方专用账户划扣的款 项，甲方在此同意并不可撤销地授权乙方合作的第三方支付机构/银行或乙方委托专业公司 合作的第三方支付机构/银行将甲方的出借资金一次性全额（或部分）出借给借款人。 </p>
      <p>3.3甲方有权收取出借资金产生的利息。 </p>
      <p>3.4 甲方承诺其向乙方提供的全部信息均真实、准确、完整。 </p>
      <p>3.5 甲方保证其所用于出借的资金为来源合法的自有资金。如果因其资金的归属及合法性问 题与第三方发生争议，由甲方自行负责解决；如因此给乙方、借款人造成任何经济损失的， 均由甲方承担。 </p>
      <p>3.6 甲方应按照本协议的规定向乙方支付居间服务费等费用。 </p>
      <p>3.7 甲方同意，甲方成功出借后，乙方依据出借人的委托协调借款人按照约定期限及金额进 行还款，甲方有义务无条件及时配合乙方工作。如出现借款人违约的情形，甲方应积极协助 乙方(包括但不限于签署、提供法律文件和相应书面材料等）向借款人追讨。 </p>
      <p>3.8 甲方承诺其具备参与网络借贷的投资风险意识、风险识别能力、拥有非保本类金融产品 投资的经历并熟悉互联网。 </p>
      <p>3.9 未经乙方同意，甲方不得将在信和大金融平台上对借款人享有的债权转让给任何第三方。 </p>
      <div class="footer-style">
        <div class="sign-box">
          <span>甲方(电子签章)：</span>
          <div @click="jumpSignatrue" :style="signBg" class="sign"><img class="sign-style" :src=userInfo.contactSign alt=""></div>
        </div>
        <div class="sign-box">
          <span>乙方(电子签章)：</span>
          <img :src=userInfo.companySeal alt="">
        </div>
      </div>
      <div>
        <van-button v-if="status" @click="submit" class="button" type="warning">提交</van-button>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "compactContent",
  data() {
    return {
      userInfo: {
        contactSign: "1 "
      } /* 请求接收到的信息，渲染至合同中 */,
      sendData: {},
      status: false
    };
  },
  created() {
    this.status = false;
    console.log(this.$route.query.status);
    if (this.$route.query.status) {
      this.status = true;
    }
    this.getInfo(); /* 获取合同信息 */
    this.getSign(); /* 获取签名url */
  },

  computed: {
    signBg() {
      if (this.userInfo.contactSign) {
        return { background: "#fff" };
      } else {
        return { background: "#f7f7f7" };
      }
    }
  } /* 计算属性改变签名box 背景 */,
  mounted() {},
  methods: {
    getInfo() {
      //获取id传至请求方法中
      let id = this.$route.query.id;
      console.log(id);
      if (id) {
        this.$api.commend.getCompactInfo(id).then(res => {
          console.log(res);
          if (res.data.data != null) {
            this.userInfo = res.data.data;
          }
        });
      }
    } /* 获取合同信息 */,
    jumpSignatrue() {
      this.$router.push({
        path: "/compactOne/signatrue"
      });
    } /* 跳转至签名页面 */,
    getSign() {
      this.userInfo.contactSign = JSON.parse(sessionStorage.getItem("url"));
      console.log(this.userInfo.contactSign);
    } /* 获取签名 url */,
    submit() {
      this.sendData.id = this.$route.query.id;
      this.sendData.contactSign = this.userInfo.contactSign;
      this.$api.commend.renewalInvestment(this.sendData).then(res => {
        console.log(res.data);
        if (res.data.code != 1) {
          Toast.fail(res.data.message);
        }
      });
    } /* 产品续投 */
  }
};
</script>
<style lang="scss" scoped>
.compact-content {
  padding: 0 15px 90px 15px;
  background: #fff;
  h4 {
    margin: 0;
    padding: 20px 0;
    text-align: center;
    font-size: 16px;
  }
} /* 合同文本 */
.footer-style {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
} /* 签章 box */
.sign-box {
  display: flex;
  align-items: center;
} /* 签名 box */
.sign {
  display: flex;
  width: 80px;
  height: 80px;
} /* 签名img box */
.sign-style {
  max-width: 100%;
  max-height: 100%;
} /* 签名 */

.bgOne {
  background: #f7f7f7;
}
.bgTwo {
  background: #fff;
} /* img签名背景色 */
.button {
  width: 100%;
}
</style>
