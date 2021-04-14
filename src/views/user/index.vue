<template>
  <div class="user-container">
    <Back />
    <div class="user-info">
      <img src="~@/assets/images/avatar.jpg" alt="">
      <div class="meta">
        <h4 class="email">{{username}}</h4>
        <span>
          文明驾驶分
          <strong>0</strong>
        </span>
      </div>
    </div>

    <ul class="group-links">
      <router-link to="/user" tag="a" class="arrow">
        <i class="icon icon-user-link001"></i>
        我的账户
      </router-link>
      <router-link to="/user" tag="a" class="arrow">
        <i class="icon icon-user-link002"></i>
        租车订单
      </router-link>
      <router-link to="/user" tag="a" class="arrow">
        <i class="icon icon-user-link003"></i>
        实名认证
      </router-link>
      <router-link to="/safe" tag="a" class="arrow">
        <i class="icon icon-user-link004"></i>
        安全设置
      </router-link>
      <router-link to="/user" tag="a" class="arrow">
        <i class="icon icon-user-link005"></i>
        帮助中心
      </router-link>
    </ul>
    <button class="logout" @click="logout">登出</button>
  </div>
</template>
<script>
export default {
  name: 'User',
  data() {
    return {
      username: this.$store.state.account.username,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('account/logoutAction').then((res) => {
        this.$router.replace({
          name: 'Index',
        })
        this.$message({
          type: 'success',
          message: '账号已安全退出',
        })
      })
    },
  },
}
</script>
<style lang='scss'>
@import './index.scss';
.logout {
  position: absolute;
  bottom: 60px;
  left: 50%;
  margin-left: -82px;
  cursor: pointer;
  width: 165px;
  height: 58px;
  text-align: center;
  line-height: 58px;
  color: #fff;
  border-radius: 100px;
  background-color: #2d3339;
  font-size: 18px;
  border: none;
  outline: none;
}
</style>