<template>
  <div class="header-back">
      <div class="back">
        <i class="icon"></i>
        <h4 class="title">{{column}}</h4> 
      </div>
  </div>
</template>
<script>
export default { 
   name: "Back" ,
   props:{
     column:{
       type:String,
       default:''
     }
   }
} 
</script>
<style lang='scss'>

.header-back{
  position: relative;
  padding-bottom: 147px;
}

.back{
  position: absolute;
  top: 24px;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  .icon {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    &:before{
      content:"";
      left: 0;
      top: 12px;
      width: 12px;
      height: 12px;
      display: block;
      cursor: pointer;
      position: absolute;
      border-top: 2px solid #00a3ff;
      border-left: 2px solid #00a3ff;
      @include webkit(transform,rotate(-45deg));
    }
  }
}

.title{
  color: #fff;
  font-size: 16px;
  margin-left: 33px;
}



</style>