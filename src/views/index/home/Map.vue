<template>
    <div>
        <!-- <div id="BmapContainer"></div>
        <div id="box"><Imgview style="width:100%;height:100%;position:absolute;" :imgUrl="imgUrl" background="#f2f2f2"></Imgview></div>
        <div id="box1"> 
         </div> -->
       

    </div>
</template>

<script>
// import Imgview from "../../components/Imgview";
export default {
  components: {
    // Imgview,
  },
  data() {
    return {
      // imgUrl: require("../../assets/imgs/01.png")
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   // 百度地图
    //   var map = new BMap.Map("BmapContainer"); // 创建Map实例
    //   map.centerAndZoom(new BMap.Point(104.06, 30.67), 11); // 初始化地图,设置中心点坐标和地图级别
    //   //添加地图类型控件

    //   map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
    //   map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    // });
  }
};
</script>

<style lang="less" scoped>
#BmapContainer {
  width: 300px;
  height: 300px;
  //   margin: 100px 200px;
  border: 1px solid gray;
}
#box {
  width: 400px;
  height: 400px;
  position: relative;
}
#box1{
width: 400px;
  height: 400px;
}
</style>