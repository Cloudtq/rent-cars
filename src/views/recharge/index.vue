<template>
  <div class="user-container">
    <Back />
    <div class="amount-list">
      <div class="item" v-for="item in data" :key="item.id">
        <div class="a-wrap" :class="{current:currentId===item.id}" @click="checkAmount(item)">{{item.amount}}</div>
      </div>
    </div>
    <div class="cars-form-ui">
      <el-form ref="form">
        <el-form-item>
          <el-input placeholder="请输入充值金额" v-model.number="amount_number" v-on:input='inputEvent'></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="blank-100"></div>
    <section class="section-mode">
      <header>
        <h4 class="title">支付类型</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li class="">
            <span class="pull-left">微信</span>
            <i class="icon check-round current"></i>
          </li>
          <li>
            <span class="pull-left">支信宝</span>
            <i class="icon check-round"></i>
          </li>
        </ul>
      </div>
    </section>
    <div class="blank-100"></div>
    <el-button type="primary" class="button-block" :disabled="disabled_button" @click="confirmSubmit" round>确认充值</el-button>
  </div>
</template>
<script>
import { AmountList, Pay } from '@/api/pay'

export default {
  name: 'User',
  components: {},
  data() {
    return {
      data: [],
      currentId: '',
      amount: '',
      type: this.$route.query.type,
      amount_number: '',
      disabled_button: true,
    }
  },
  beforeMount() {
    this.getAmountList()
  },
  methods: {
    inputEvent() {
      const reg = /^[0-9]*$/
      const flag = reg.test(this.amount_number)
      if (flag && (this.amount_number || this.amount))
        this.disabled_button = false
      else this.disabled_button = true
    },
    getAmountList() {
      AmountList().then((res) => {
        this.data = res.data
      })
    },
    //选择金额
    checkAmount(data) {
      this.currentId = data.id
      this.amount = data.amount
      this.disabled_button = false
    },

    //确认充值
    confirmSubmit() {
      //存在输入金额与选项金额时，取选项金额
      let amount = this.amount_number || this.amount

      Pay({ amount, type: this.type }).then((res) => {
        const orderNo = res.data.order_no
        const payUrl = res.data.pay_url
        // if (payUrl) {
        //   window.location.href = payUrl
        //   return false
        // }

        //进行支付时，请求后台接口将返回订单号，并会跳转至回调地址，将订单号保存至本地内存，当完成支付后从回调地址返回。

        localStorage.setItem('order_no', orderNo)
        this.$router.push({
          path: '/payStatus',
        })
      })
    },
  },
}
</script>
<style lang="scss">
.section-mode {
  padding-bottom: 30px;
  margin-bottom: 30px;
  header {
    margin-bottom: 20px;
  }
  .title {
    font-size: 14px;
    color: #fff;
    opacity: 0.5;
  }
}
.price {
  color: #fff;
  span {
    font-size: 40px;
    font-family: 'bahnschrift';
  }
  em {
    font-size: 18px;
  }
}
.goto {
  display: inline-block;
  height: 36px;
  padding: 0 20px;
  font-size: 18px;
  line-height: 36px;
  border: 2px solid #00a3ff;
  border-radius: 100px;
  color: #00a3ff;
}
.links {
  li {
    display: block;
    height: 20px;
    line-height: 20px;
    position: relative;
    padding: 11px 0;
    color: #fff;
    font-size: 16px;
  }
}
.amount-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  .item {
    padding: 0 10px;
    margin-bottom: 20px;
    flex: 1;
    @include webkit(box-sizing, border-box);
    width: 33.33333%;
    min-width: 33.33333%;
    max-width: 33.33333%;
  }
  .a-wrap {
    height: 48px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #fff;
    font-family: 'bahnschrift';
    line-height: 48px;
    font-size: 24px;
    &.current {
      background-color: #00a3ff;
      border: 1px solid #00a3ff;
    }
  }
}
.check-round {
  position: relative;
  float: right;
  width: 18px;
  height: 18px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    left: 3px;
    top: 6px;
    width: 10px;
    height: 4px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    @include webkit(transform, rotate(-45deg));
  }
  &.current {
    border: 1px solid #00a3ff;
    background-color: #00a3ff;
    &::before {
      content: '';
      border-left: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>