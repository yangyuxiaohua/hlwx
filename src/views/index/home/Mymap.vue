<template>
  <div id="mapbox">
      <!-- <div> -->
            <!-- <Pictureframe> -->
                  <!-- <template #imgbox> -->
                      <div id="allmap"></div>
                      <!-- <select id="stylelist">
                          <option value="normal">默认地图样式</option> 
                          <option value="light">清新蓝风格</option> 
                          <option value="dark">黑夜风格</option>    
                          <option value="redalert">红色警戒风格</option>
                          <option value="googlelite">精简风格</option>
                          <option value="grassgreen">自然绿风格</option>
                          <option value="midnight">午夜蓝风格</option>
                          <option value="pink">浪漫粉风格</option>
                          <option value="darkgreen">青春绿风格</option>
                          <option value="bluish">清新蓝绿风格</option>
                          <option value="grayscale">高端灰风格</option>
                          <option value="hardedge">强边界风格</option> 
                     </select>  -->
                  <!-- </template> -->
            <!-- </Pictureframe> -->
      <!-- </div> -->
  </div>
</template>

<script>
import BMap from "BMap";
export default {
  components: {},
  data() {
    return {
      points: [
        { lng: 116.331369, lat: 39.85632, data: "5" },
        { lng: 117, lat: 31, data: "9" },
        { lng: 116, lat: 34, data: "7" }
      ]
    };
  },
  mounted() {
    this.baiduMap();
  },
  methods: {
    baiduMap() {
      var map = new BMap.Map("allmap", { minZoom: 8, maxZoom: 15 ,enableMapClick:false}); // 创建地图实例
      var point = new BMap.Point(116.331398, 39.897445); // 创建点坐标
      map.disableInertialDragging() //禁用惯性拖拽
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.setMapStyle({ style: "midnight" }); //地图风格
      //多个点标注和火警数
      var points = [
        { lng: 116.331398, lat: 39.897445, data: "5" },
        { lng: 116.33, lat: 39, data: "9" },
        { lng: 116, lat: 39, data: "7" }
      ];

      var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: "信息窗口", // 信息窗口标题
        enableMessage: true //设置允许信息窗发送短息
      };

      // 创建标注对象并添加到地图
      for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
        var point = new BMap.Point(points[i].lng, points[i].lat);
        var marker = new BMap.Marker(point);
        var label = new BMap.Label(points[i].data, {
          offset: new BMap.Size(5, 4)
        });
        label.setStyle({
          background: "none",
          color: "#fff",
          border: "none" //只要对label样式进行设置就可达到在标注图标上显示数字的效果
        });
        marker.setLabel(label); //显示地理名称 a
        var content = points[i].data; //信息窗口信息
        map.addOverlay(marker);
        addClickHandler(content, marker);
      }
      function addClickHandler(content, marker) {
        marker.addEventListener("click", function(e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      }
      //创建多边形
      var polygon = new BMap.Polygon(
        [
          new BMap.Point(116.331398, 39.897445),
          new BMap.Point(116.345243, 39.89563),
          new BMap.Point(116.364226, 39.896988),
         
        ],
        { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 }
      );
      map.addOverlay(polygon);
      // map.addControl(new BMap.NavigationControl()); //控件
    }
  }
};
</script>

<style lang="less" scoped>
#mapbox {
  width: 100%;
  height: 100%;
}
#allmap {
  width: 100%;
  height: 100%;
}
</style>