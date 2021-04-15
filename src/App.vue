<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    document.addEventListener('mouseup', (e) => {
      // 会员侧边栏
      const userCon = document.getElementById('children-view')

      const carsSwiper = document.getElementsByClassName('cars-wrap')[0]

      if (carsSwiper && !carsSwiper.contains(e.target)) {
        const isRequestCarsList = this.$store.state.app.isRequestCarsList
        console.log('正在点击列表外')

        if (!isRequestCarsList) {
          this.$store.commit('app/CHANGE_CarsListFlag', false)
        }
      }

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
}
</script>
<style lang="scss">
#app {
}
</style>
