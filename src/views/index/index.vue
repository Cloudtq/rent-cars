<template>
  <div>

    <!-- cars data渲染 -->
    <Cars />
    <!-- 地图 -->
    <Map ref='map' @callbackComponent="callbackComponent" />
    <!-- 导航 -->
    <NavBar />
    <!-- 会员 -->
    <div id="children-view" :class='{open:show}'>
      <router-view></router-view>
    </div>
    <Login />
  </div>
</template>
<script>
import Map from '../amap'
import Cars from '../cars'
import NavBar from '@c/navbar'
import Login from './login'
import { Parking } from '@/api/parking'

export default {
  name: 'Index',
  components: {
    Map,
    Cars,
    NavBar,
    Login,
  },
  data() {
    return {}
  },
  computed: {
    show() {
      return this.$route.name === 'Index' ? false : true
    },
  },
  mounted() {
    document.addEventListener('mouseup', (e) => {
      const userCon = document.getElementById('children-view')
      if (userCon && !userCon.contains(e.target)) {
        const routerName = this.$route.name
        if (routerName === 'Index') {
          return false
        }
        this.$router.push({
          name: 'Index',
        })
      }
    })
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
            click: (e) => this.walking(e),
          }
        })
        //调地图的方法
        this.$refs.map.parkingData(data)
      })
    },
    walking(e) {
      this.$refs.map.handlerWaling(e.target.getExtData())
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
</style>