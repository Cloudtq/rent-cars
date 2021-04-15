import Vue from "vue";
//高德地图
// 引入vue-amap
import AMap from "vue-amap";

Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
    // 申请的高德key
    key: "94eaf8e38c1597a30a7a4ab37b56aea4",
    // 插件集合
    plugin: ["AMap.Geolocation", "AMap.Walking"],
});