<template>
  <div>

    <!-- cars data渲染 -->
    <Cars />
    <!-- 地图 -->
    <Map @callbackComponent="callbackComponent" />
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
        console.log(res)
      })
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