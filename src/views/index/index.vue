<template>
  <div>

    <!-- cars data渲染 -->
    <Cars ref="cars" />
    <!-- 地图 -->
    <Map ref='map' @callbackComponent="callbackComponent" />
    <!-- 导航 -->
    <NavBar />
    <!-- 会员 -->
    <div id="children-view" :class='{open:show}'>
      <router-view></router-view>
    </div>
    <Login />
    <div class="cars_Activation" v-if="cars_active && cars_active.order_no">
      <router-link :to="{path:'/orderDetailed',query:{order_no:cars_active.order_no}}" class="color-white">正在使用的车辆</router-link>
    </div>
    <div class="button_groure" v-if="cars_active && cars_active.order_no">
      <div v-if="cars_active.order_status==='RETURN'">
        停车场:
        <el-button @click="setParkingId(item.id)" :type="parking_id==item.id?'primary':''" v-for="item in getParkingInfo" :key="item.id">{{item.parkingName}}</el-button>
      </div>
      <el-button size="small" @click="carsGet" v-if="cars_active.order_status==='WAIT'">取车</el-button>
      <el-button size="small" @click="carsReturn" v-if="cars_active.order_status==='RETURN'">还车</el-button>
      <el-button size="small" @click="carsCancel" v-if="cars_active.order_status==='WAIT'">取消</el-button>
    </div>
  </div>
</template>
<script>
import Map from '../amap'
import Cars from '../cars'
import NavBar from '@c/navbar'
import Login from './login'
import { Parking } from '@/api/parking'
import {
  GetCarsActivation,
  CarsGet,
  CarsReturn,
  CarsCancel,
  CarsReturns,
} from '@/api/order'

export default {
  name: 'Index',
  components: {
    Map,
    Cars,
    NavBar,
    Login,
  },
  data() {
    return {
      cars_active: JSON.parse(localStorage.getItem('cars_active')),
      parking_id: '',
    }
  },
  computed: {
    show() {
      return this.$route.name === 'Index' ? false : true
    },
    getParkingInfo() {
      return this.$store.state.location.parking_info
    },
  },
  beforeMount() {
    !this.cars_active && this.getCarsActivation()
  },
  methods: {
    callbackComponent(params) {
      params.function && this[params.function](params.data)
    },

    //地图初始化回调
    loadMap() {
      this.getParking()
    },
    getParking() {
      Parking().then((res) => {
        const data = res.data.data
        data.forEach((item) => {
          item.position = item.lnglat.split(',')
          item.content =
            "<img src='" +
            require('@/assets/images/parking_location_img.png') +
            " ' />"
          item.offset = [-25, -55]
          item.offsetText = [-25, -55]
          item.text = `<div  style="width: 52px; font-size: 20px; color: #fff; text-align: center; height: 52px; border-radius: 100px;line-height:50px; ">${item.carsNumber}</div>`
          item.events = {
            click: (e) => {
              this.$store.commit('app/CHANGE_RequestListFlag', true)
              this.walking(e) //步行路线
              this.getCarsList(e) //车辆列表
            },
          }
        })
        //调地图的方法
        this.$refs.map.parkingData(data)

        //获取停车场的ID
        console.log(data)
        const parkingInfo = data.map((item) => {
          return { id: item.id, parkingName: item.parkingName }
        })
        this.$store.commit('location/SET_PARKING_INFO', parkingInfo)
        this.parkingInfo = parkingInfo
      })
    },
    walking(e) {
      this.$refs.map.handlerWaling(e.target.getExtData().lnglat.split(','))
      this.$refs.map.saveParkingDatas({
        key: 'parkingDatas',
        value: e.target.getExtData(),
      })
    },
    getCarsList(e) {
      // console.log(e)
      const data = e.target.getExtData()
      this.$refs.cars && this.$refs.cars.getCarsList(data.id)
    },

    /*
      获取正在使用的车辆

      简单的接口优化
      1、查找缓存里面的订单号
      2、没有就请求接口
      3、如果有就不请求
     */
    getCarsActivation() {
      GetCarsActivation().then((res) => {
        this.cars_active = res.data
        if (this.cars_active) {
          localStorage.setItem('cars_active', JSON.stringify(this.cars_active))
        }
      })
    },

    /* 取车 */
    carsGet() {
      CarsGet({
        order_no: this.cars_active.order_no,
        cars_id: this.cars_active.cars_id,
      }).then((res) => {
        this.$message({
          type: 'success',
          message: res.message,
        })
        if (res.data && res.data.order_status) {
          this.$set(this.cars_active, 'order_status', res.data.order_status)
          localStorage.setItem('cars_active', JSON.stringify(this.cars_active))
        }
      })
    },

    /* 还车 */
    carsReturn() {
      CarsReturns({
        parking_id: this.parking_id,
        order_no: this.cars_active.order_no,
        cars_id: this.cars_active.cars_id,
      }).then((res) => {
        this.$message({
          type: 'success',
          message: res.message,
        })
        this.cars_active = null
        localStorage.removeItem('cars_active')
      })
    },

    /* 取消订单 */
    carsCancel() {
      CarsCancel({
        order_no: this.cars_active.order_no,
        cars_id: this.cars_active.cars_id,
      }).then((res) => {
        this.$message({
          type: 'success',
          message: res.message,
        })
        this.cars_active = null
        localStorage.removeItem('cars_active')
      })
    },
    /* 获取点击的停车场id */
    setParkingId(id) {
      this.parking_id = id
    },
  },
  watch: {},
}
</script>
<style lang='scss'>
#children-view {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -600px;
  width: 410px;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, 0.4));
  background-color: #34393f;
  z-index: 101;
  &.open {
    right: 0px;
  }
}

.cars_Activation {
  position: fixed;
  left: 20px;
  top: 20px;
  border-radius: 100px;
  padding: 10px;
  font-size: 12px;
  background-color: $color-yellow;
  color: #fff;
}

.button_groure {
  position: fixed;
  left: 20px;
  top: 60px;
}
</style>