<template>
  <div class="cars-wrap">
    <!-- <div class="cars-swiper-wrap">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide><CarsItem height='820px' /></swiper-slide>
        <swiper-slide><CarsItem/></swiper-slide>
        <swiper-slide><CarsItem/></swiper-slide>
        <swiper-slide><CarsItem/></swiper-slide>
        <swiper-slide><CarsItem/></swiper-slide>
      </swiper>
      <div @click="prev" class="swiper-button-prev" slot="button-prev"></div>
      <div @click="next" class="swiper-button-next" slot="button-next"></div>
    </div> -->

    <!-- <span @click="user">汽车列表</span>  -->
  </div>
</template>
<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import CarsItem from '@c/carsList'

export default { 
   name: "Cars" ,
   methods: {
     user(){
       this.$router.push('user')
     }
   },
   components: {
     Swiper,
     SwiperSlide,
     CarsItem
   },
   data(){
     return {
       swiperOptions:{
         slidesPerView:3,
         spaceBetween:50,
         navigation:{
           nextEl:'.swiper-button-next',
           prevEl:'.swiper-button-prev'
         }
       }
     }
   },
   methods:{
     prev(){
       this.$refs.mySwiper.$swiper.slidePrev();
     },
     next(){
       this.$refs.mySwiper.$swiper.slideNext();
     }
   }
   
} 
</script>
<style lang='scss'>
@import './index.scss'
</style>