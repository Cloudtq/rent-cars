<template>
  <div class="amap-wrap">
    <el-amap ref="map" vid="amapContainer" :zoom='zoom' :amap-manager="amapManager" :events="events" :center="center" class="amap-demo">
      <el-amap-circle v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity"
        :strokeWeight="item.strokeWeight">
      </el-amap-circle>
    </el-amap>
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
let amapManager = new AMapManager()
export default {
  name: 'Index',
  data() {
    const _this = this
    return {
      amapManager,
      center: [113.289934, 23.149503],
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
    }
  },
  methods: {
    initMap() {
      this.map = amapManager.getMap()

      //地图初始化完成回调
      this.$emit('callbackComponent', {
        function: 'loadMap',
      })

      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        buttonPosition: 'RB',
        buttonOffset: new AMap.Pixel(-50, 0),
        zoomToAccuracy: true,
        markerOptions: {
          content: ' ',
        },
      })

      this.map.addControl(geolocation)

      geolocation.getCurrentPosition((status, result) => {
        if (status == 'complete') {
          const lng = result.position.lng
          const lat = result.position.lat
          this.circle[0].center = [lng, lat]
        } else {
        }
      })

      //   let marker = new AMap.Marker({
      //     position: [113.289934, 23.149503],
      //   })

      //   marker.setMap(this.map)
    },
  },
  mounted() {
    // lazyAMapApiLoaderInstance.load().then(() => {
    //   // your code ...
    //   this.map = new AMap.Map('amapContainer', {
    //     center: [113.289934, 23.149503],
    //     zoom: this.zoom,
    //   })
    // })
  },
}
</script>
<style scoped>
.amap-wrap {
  height: 100vh;
}
</style>