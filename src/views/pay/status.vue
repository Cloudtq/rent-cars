<template>
  <div class="user-container">
    <Back column="安全设置" />
    <div class="text-center color-white lh-40">
      <h4><strong>订单号</strong></h4>
      <p>a2121fads34fas31fa</p>
    </div>
    <div class="blank-40"></div>
    <div>
      <el-button type="warning" round class="button-block" @click="gotoPay"><strong>去支付</strong></el-button>
    </div>
    <div class="blank-20"></div>
    <div>
      <el-button type="primary" round class="button-block" @click="completePay"><strong>完成支付</strong></el-button>
    </div>
  </div>
</template>
<script>
import { OrderStatus } from '@/api/order'
export default {
  name: 'PayStatus',
  components: {},
  data() {
    return {
      timer: null,
    }
  },
  beforeMount() {
    this.getOrderStatus()
    this.setInter()
  },
  methods: {
    /* 
        当回到该页面后，已失去了订单号，要从本地内存中读取订单号，然后通过查询后台订单是否支付成功。
        查询时，第一次进入页面便发送一次异步请求，若成功则跳转至成功页面，并开启定时器每3s发起异步请求一次，直到请求成功。
        并且，通过点击完成支付与去支付都可以发送请求并将结果返回。
        此处使用异步请求的目的是：为了使各个请求能够互不影响，同时进行。
        因为如果不使用异步，在发起请求时，主线程被占用，其他操作如点击按钮发起请求都将无法执行，要等待请求完毕，会被阻塞

      */
    orderStatus() {
      const order_no = localStorage.getItem('order_no')
      return OrderStatus({ order_no }).then((res) => {
        const status = res.data.status
        return status
        // if (status === 'success') {
        //   clearInterval(this.timer)
        //   this.$router.replace({
        //     name: 'PayResult',
        //     query: {
        //       status,
        //     },
        //   })
        // }
      })
    },

    async getOrderStatus() {
      const status = await this.orderStatus()
      this.toResult(status)
    },
    setInter() {
      this.timer = setInterval(() => {
        this.getOrderStatus()
      }, 3000)
    },
    async gotoPay() {
      const status = await this.orderStatus()
      this.toResult(status)
    },
    async completePay() {
      const status = await this.orderStatus()
      this.toResult(status)
    },
    toResult(status) {
      if (status === 'success') {
        clearInterval(this.timer)
        this.$router.replace({
          name: 'PayResult',
          query: {
            status,
          },
        })
      }
    },
  },
}
</script>
<style lang="scss">
</style>