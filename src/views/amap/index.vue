<template>
  <div class="amap-wrap">
    <el-amap ref="map" vid="amapContainer" :zoom='zoom' :amap-manager="amapManager" :events="events" :center="center" class="amap-demo">
      <!-- 覆盖物，自身定位 -->
      <el-amap-circle v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity"
        :strokeWeight="item.strokeWeight">
      </el-amap-circle>
      <!-- 覆盖物，停车场 -->
      <el-amap-marker v-for="(item,index) in parking" :offset="item.offset" :key="item.id" :content="item.content" :position="item.position" :vid="index"></el-amap-marker>
      <!-- 覆盖物，停车场，车辆数 -->
      <el-amap-marker v-for="(item,index) in parking" :extData='item' :key="item.id+index" :offset='item.offsetText' :position="item.position" :content="item.text" :events="item.events">
      </el-amap-marker>
      <!-- 覆盖物，停车场，距离信息 -->
      <el-amap-marker v-for="item in parkingInfo" zIndex="1000" :key="item.id" :offset="item.offset" :position="item.position" :content="item.text">
      </el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
import { Selflocation } from './location'
import { Walking } from './walking'

import styleCss from './style'

let amapManager = new AMapManager()
export default {
  name: 'Index',
  data() {
    const _this = this
    return {
      amapManager,
      center: [114.4141, 23.03339],
      events: {
        init(o) {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap()
          })
        },
      },
      map: null,
      zoom: 18,
      circle: [
        {
          center: [0, 0],
          color: '#393e43',
          radius: 4,
          strokeOpacity: 0.2,
          strokeWeight: 30,
        },
      ],
      parking: [
        // {
        //   id: 1,
        //   content:
        //     "<img src='" +
        //     require('@/assets/images/parking_location_img.png') +
        //     " ' />",
        //   position: [114.4141, 23.03339],
        //   offset: [-25, -55],
        // },
      ],
      parkingCarsNumber: [],
      self_lng: '',
      self_lat: '',
      parkingInfo: [],
      parkingDatas: {},
    }
  },
  methods: {
    initMap() {
      this.map = amapManager.getMap()

      //地图初始化完成回调
      this.$emit('callbackComponent', {
        function: 'loadMap',
      })

      this.selflocation()
    },
    selflocation() {
      //自身定位
      Selflocation({
        map: this.map,
        complete: (val) => this.onComplete(val),
      })
    },
    onComplete(data) {
      this.self_lng = data.position.lng
      this.self_lat = data.position.lat
      this.circle[0].center = [this.self_lng, this.self_lat]
    },
    parkingData(data) {
      this.parking = data
    },
    handlerWaling(data) {
      this.parkingDatas = data
      const lnglatArr = data.lnglat.split(',')
      //步行路线规划
      Walking({
        map: this.map,
        position_start: [this.self_lng, this.self_lat],
        position_end: lnglatArr,
        complete: (val) => this.handlerWalkingComplete(val),
      })
    },
    handlerWalkingComplete(val) {
      console.log(val)
      this.parkingInfo = [
        {
          id: 1,
          position: this.parkingDatas.lnglat.split(','),
          text: `<div style='${styleCss.parkingInfoWrap}'>
            <span style='${styleCss.parkingInfoNumber}'>${this.parkingDatas.carsNumber}</span>辆车
            <span style='${styleCss.parkingInfoLine}'></span>
            距离您${val.routes[0].distance}米
            </div>`,
          offset: [-25, -55],
        },
      ]
    },
  },
  mounted() {},
  watch: {
    '$store.state.location.selfLocation': {
      handler() {
        this.selflocation()
      },
    },
  },
}
</script>
<style scoped>
.amap-wrap {
  height: 100vh;
}
</style>