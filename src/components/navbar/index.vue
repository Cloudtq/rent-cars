<template>
  <div class="navbar">
    <ul>
      <li><i class="icon icon-help icon-w-44"></i></li>
      <li><i class="icon icon-help icon-w-44"></i></li>
      <li><a href="javascript:void(0);" class="select-car-btn">选择车辆</a></li>
      <li><i class="icon icon-help icon-w-44" @click="selfLocation"></i></li>
      <li><i class="icon icon-help icon-w-44" @click="toUser"></i></li>
    </ul>
  </div>
</template>
<script>
import { getToken } from '@/utils/cookiesCars'
export default {
  name: 'NavBar',
  methods: {
    toUser() {
      this.$router.push({
        name: getToken() ? 'User' : 'Login',
      })
    },
    selfLocation() {
      this.$store.commit('location/SELF_LOCATION')
    },
  },
}
</script>
<style lang='scss'>
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 86px;
  z-index: 10;
  text-align: center;
  li {
    display: inline-block;
  }
  .icon {
    margin: 0 17px;
    vertical-align: middle;
    cursor: pointer;
    background-color: $color-main;
    border-radius: 100px;
  }
}
</style>