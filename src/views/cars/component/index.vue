<template>
  <div>
    <section class="cars-item" @click="openCarsInfo">
      <header>
        <h4 class="cars-logo">
          <img :src="data.imgUrl" alt="图片">
          <span class="name">{{data.carsMode}}</span>
        </h4>
        <p class="cars-attr">
          {{data|GetEnergyType}} {{data|GetSeatNumber}}
        </p>
      </header>
      <div class="cars-content">
        <div class="info">
          <div>
            <h4 class="cars-number">{{data.carsNumber}}</h4>
            <div>
              <ul class="cars-electric " :class="data | electricNumber">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p class="distance">
                <sub>约</sub>
                <strong>{{Math.round(data.countKm)}}</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img src="../../../assets/images/pic001.png" alt="">
      </div>
      <footer>
        <a href="javascript:void(0);" class="parking-link">{{data.parkingName}}</a>
      </footer>
    </section>
    <section class="cars-item cars-detailed" :style="'height:' + cars_info_height" v-if="cars_info_show">
      <div class="scroll">
        <h4 class="column">
          {{data.parkingName}}
          <i class="close" @click="closeCarsInfo"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img :src="data.imgUrl" alt="图片">
            <span class="name">{{data.carsMode}}</span>
          </h4>
          <p class="cars-attr">
            {{data|GetEnergyType}} {{data|GetSeatNumber}}
          </p>
        </header>
        <img src="../../../assets/images/pic001.png" alt="" width="100%">
        <div class="clearfix">
          <div class="pull-left fs-24">{{data.carsNumber}}</div>
          <p class="distance pull-right">
            <sub>约</sub>
            <strong>{{Math.round(data.countKm)}}</strong>
            <sub>KM</sub>
          </p>
        </div>
        <div class="cars-electric-box">
          <div class="p-r">
            <span class="e-high" :style="data | electricNumber('width')"></span>
            <span class="e-bg"></span>
          </div>
          <div></div>
        </div>
        <p class="info color-main text-center">取车约支付12.0元停车费，实际补贴12.0元</p>
        <ul class="cars-type-list">
          <li v-for="item in leaseListData" :class="{'current': leaseId == item.carsLeaseTypeId}" :key="item.carsLeaseTypeId" @click="selectLeaseType(item)">
            <h4 class="name">{{ item.carsLeaseTypeName }}</h4>
            <span class="price">￥{{ item.price }}</span>
          </li>
        </ul>
        <div class="clause-dec">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i class="current"></i>
        </div>
      </div>

      <a href="javascript:void(0);" class="select-car-btn" @click="confirmCars">预约用车</a>
    </section>
  </div>
</template>
<script>
import { GetLeaseList, ConfirmCars } from '@/api/cars'

export default {
  name: 'CarsList',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cars_info_show: false,
      cars_info_height: 0,
      timer: null,
      // 租赁类型列表
      leaseListData: [],
      leaseId: '',
      token: this.$store.state.account.token,
      message_item: this.$store.state.config.message_item,
      //临时 key
      backup_key: '',
      audit_status: [
        'check_real_name',
        'check_cars',
        'gilding',
        'illegalAmount',
      ],
    }
  },
  filters: {
    electricNumber(data, str) {
      if (data.energyType == 1) {
        let sum = Math.round(data.electric / 10)
        return str === 'width' ? `width:${sum * 10}%` : `active-li-${sum}`
      } else if (data.energyType == 2) {
        let sum = Math.round(data.oil / 10)
        return str === 'width' ? `width:${sum * 10}%` : `active-li-${sum}`
      } else {
        let sum = parseInt(data.oil) + parseInt(data.electric)
        sum = Math.round(sum / 20)
        return str === 'width' ? `width:${sum * 10}%` : `active-li-${sum}`
      }
    },
    GetEnergyType(data) {
      if (data.energyType) {
        if (data.energyType == 1) {
          return '新能源汽车'
        } else if (data.energyType == 2) {
          return '汽油汽车'
        } else return '混合动力汽车'
      }
    },
    GetSeatNumber(data) {
      if (data.carsAttr) {
        let attr = JSON.parse(data.carsAttr)
        return attr.carsBody.seat + '座'
      }
    },
  },
  methods: {
    //打开车辆信息
    openCarsInfo() {
      //视图高度
      const viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight

      //汽车信息高度
      const height = viewHeight - 145
      this.cars_info_show = true
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.cars_info_height = `${height}px`
        clearTimeout(this.timer)
      }, 10)

      this.getLaseList()
    },

    //关闭车辆信息
    closeCarsInfo() {
      this.cars_info_height = 0
      this.cars_info_show = false
    },

    /** 选择租赁类型 */
    selectLeaseType(data) {
      this.leaseId = data.carsLeaseTypeId
    },
    /** 获取租赁类 */
    getLaseList() {
      if (this.leaseListData && this.leaseListData.length > 0) {
        return false
      }
      GetLeaseList({ carsId: this.data.id }).then((response) => {
        const dataItem = response.data

        if (dataItem) {
          this.leaseListData = dataItem.data
        }
      })
    },

    // 预约用车
    confirmCars() {
      if (!this.token) {
        this.$router.push({
          name: 'Login',
        })
        return false
      }
      if (!this.leaseId) {
        this.$message({
          type: 'error',
          message: '请选择租赁类型！',
        })
        return false
      }
      const requestData = {
        cars_id: this.data.id,
        cars_lease_type_id: this.leaseId,
      }

      ConfirmCars(requestData).then((res) => {
        const data = res.data
        const key = Object.keys(data)

        if (key && key.length > 0) {
          if (this.audit_status.includes(key[0])) {
            if (
              !data.check_real_name ||
              !data.check_cars ||
              !data.gilding ||
              !data.illegalAmount
            ) {
              let message = ''

              this.backup_key = key[0]
              this.message_item[key[0]].msg &&
                (message = this.message_item[key[0]].msg)
              this.$confirm(message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                let router =
                  this.message_item[this.backup_key].router &&
                  this.message_item[this.backup_key].router
                if (router) {
                  this.$router.push({
                    path: router,
                    query: {
                      type: this.message_item[this.backup_key].type,
                    },
                  })
                }
              })
              return false
            }
          } else {
            let message = ''
            this.message_item[key[0]].msg &&
              (message = this.message_item[key[0]].msg)

            this.$message({
              type: 'error',
              message,
            })
          }
        }
        this.$message({
          type: 'success',
          message: data.message,
        })
      })
    },
  },
}
</script>
<style lang='scss'>
@import './index.scss';
</style>