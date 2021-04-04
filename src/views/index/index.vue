<template>
    <div>

        <!-- cars data渲染 -->
        <Cars/>
        <!-- 地图 -->
        <Map/>
        <!-- 导航 -->
        <NavBar/>
        <!-- 会员 -->
        <div id="children-view" :class='{open:show}'>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Map from '../amap'
import Cars from '../cars'
import NavBar from '@c/navbar'


export default { 
    name: "Index",
    components: {
        Map,
        Cars,
        NavBar
    },
    data () {
        return {}
    },
    computed: {
        show(){
            return this.$route.name === 'Index' ? false : true
        }
    },
    mounted () {
        document.addEventListener('mouseup',(e)=>{
            const userCon = document.getElementById('children-view')
            if(userCon && !userCon.contains(e.target)){
                this.$router.push('/')
            }
        })
    },
    watch: {

    }

} 
</script>
<style lang='scss'>
#children-view{
    position: fixed;
    top: 0;
    bottom: 0;
    right: -600px;
    width: 410px;
    @include webkit(transition,all .3s ease 0s);
    @include webkit(box-shadow,-5px 0 38px 0 rgba(0,0,0,.4));
    background-color: #34393f;
    z-index: 101;
    &.open {
        right: 0px;
    }
}

</style>