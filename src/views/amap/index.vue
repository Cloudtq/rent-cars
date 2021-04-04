<template>
    <div class="amap-wrap">
        <el-amap ref="map"  vid="amapContainer" class="amap-demo"></el-amap>
    </div>
</template>
<script>
import { AMapManager,lazyAMapApiLoaderInstance } from 'vue-amap';

export default { 
   name: "Index",
   data () {
       return {
            map:null,
            zoom:18
        }
       
    },
   mounted () {
        lazyAMapApiLoaderInstance.load().then(() => {
        // your code ...
            this.map = new AMap.Map('amapContainer', {
                center: [113.289934,23.149503],
                zoom:this.zoom
            });
        });
   }
} 
</script>
<style scoped>

.amap-wrap{
    height: 100vh;
}
</style>