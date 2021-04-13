<template>
  <div class="cars-wrap" v-if="carsList && carsList.length>0">
    <div class="cars-swiper-wrap">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for='item in carsList' :key="item.id">
          <CarsItem :data='item' />
        </swiper-slide>
        <!-- <swiper-slide>
          <CarsItem />
        </swiper-slide>
        <swiper-slide>
          <CarsItem />
        </swiper-slide>
        <swiper-slide>
          <CarsItem />
        </swiper-slide>
        <swiper-slide>
          <CarsItem />
        </swiper-slide> -->
      </swiper>
      <div @click="prev" class="swiper-button-prev" slot="button-prev"></div>
      <div @click="next" class="swiper-button-next" slot="button-next"></div>
    </div>

    <!-- <span @click="user">汽车列表</span>  -->
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import CarsItem from './component'

//API
import { GetCarsList } from '@/api/cars'

export default {
  name: 'Cars',
  // methods: {
  //   user() {
  //     this.$router.push('user')
  //   },
  // },
  components: {
    Swiper,
    SwiperSlide,
    CarsItem,
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      carsList: [],
    }
  },
  methods: {
    prev() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    next() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    getCarsList(parkingId) {
      GetCarsList({ parkingId }).then((res) => {
        res.data.data && (this.carsList = res.data.data)
        this.$store.commit('app/CHANGE_RequestListFlag', false)
        console.log('请求数据完成')
      })
    },
  },
  watch: {
    '$store.state.app.isClickCarsList': {
      handler(newValue) {
        console.log(newValue)
        if (newValue) {
          this.carsList = []
          this.$store.commit('app/CHANGE_CarsListFlag', true)
        }
      },
    },
  },
}
</script>
<style lang='scss'>
@import './index.scss';
</style>