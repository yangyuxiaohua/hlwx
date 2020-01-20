<template>
    <div>
        <h1>设备</h1>
        <div id="allmap"></div>
    </div>
</template>

<script>
export default {
  mounted() {
    this.baiduMap();
  },
  methods: {
    baiduMap() {
      var map = new BMap.Map("allmap"); // 创建地图实例

      var point = new BMap.Point(116.331398, 39.897445); // 创建点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      //map.setMapStyle({ style: 'midnight' }) //地图风格

      var marker = new window.BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中

      //提示信息
      var infoWindow = new BMap.InfoWindow("这是提示信息");
      // 鼠标移上标注点要发生的事
      marker.addEventListener("mouseover", function() {
        this.openInfoWindow(infoWindow);
      });

      // 鼠标移开标注点要发生的事
      marker.addEventListener("mouseout", function() {
        //this.closeInfoWindow(infoWindow)
      });
    }
  }
};
</script>

<style lang="less" scoped>
#allmap {
  width: 400px;
  height: 400px;
  border: 1px solid red;
}
</style>