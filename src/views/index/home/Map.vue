<template>
  <div id="mapbox">
    <div class="videoWidget">
      <div class="WidgetVBox">
        <img src="../../../assets/imgs/03.png" alt="" class="littleImg">
      </div>
    </div>
    <div id="allmap"></div>
  </div>
</template>
<script>
import BMap from "BMap";
// import BMapLib from "BMapLib";
import styleJson from "../../../../public/static/bmap/custom_map_config.json";
import { getKey, setKey } from "@/utils/local";
import { getObjStr } from "@/utils/publictool";
import { setTimeout, setInterval } from "timers";
export default {
  components: {},
  data() {
    return {
      points: [
        { lng: 116.331369, lat: 39.85632, data: "5" },
        { lng: 117, lat: 31, data: "9" },
        { lng: 116, lat: 34, data: "7" }
      ],
      lng: 104.071096,
      lat: 30.572925,
      showPolyonList: [],
      fillColor: "#00C1FF",
      timer: null,
      polygon: {}, //创建多边形
      map: {}
    };
  },
  created() {
    if (
      getKey("currentMsg").mapMsg.points &&
      getKey("currentMsg").mapMsg.points !== "null"
    ) {
      this.showPolyonList = getObjStr(getKey("currentMsg").mapMsg.points);
      this.lat = this.showPolyonList[0].lat;
      this.lng = this.showPolyonList[0].lng;
    }
  },
  mounted() {
    this.baiduMap();
    let that = this;

    that.changefillColor();
    this.timer = setInterval(() => {
      getKey("terrMsg").forEach(item => {
        item.children.forEach(u => {
          u.children.forEach(s => {
            if (s.fireNum != getKey("currentMsg").mapMsg.fireNum) {
              if (s.fireNum > 0) {
                that.drawPolygon1();
              } else {
                that.drawPolygon2();
              }
              setKey("currentMsg", {
                allMsg: s,
                mapMsg: s
              });
            }
          });
        });
      });
    }, 1000);
  },
  methods: {
    baiduMap() {
      let that = this;
      this.map = new BMap.Map("allmap", {
        minZoom: 8,
        maxZoom: 18,
        enableMapClick: false
      }); // 创建地图实例
      var point = new BMap.Point(this.lng, this.lat); // 创建点坐标
      this.map.disableInertialDragging(); //禁用惯性拖拽
      this.map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      this.map.disableDoubleClickZoom();
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // this.map.setMapStyle({ style: "dark" }); //地图风格
      this.map.setMapStyleV2({ styleJson: styleJson });

      //多个点标注和火警数
      var points = [
        { lng: 104.05, lat: 30.6, data: "5" },
        { lng: 104.04, lat: 30.5, data: "9" },
        { lng: 104.03, lat: 30.4, data: "7" }
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
        this.map.addOverlay(marker);
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
        this.map.openInfoWindow(infoWindow, point); //开启信息窗口
      }
    },
    drawPolygon1() {
      this.map.removeOverlay(this.polygon);
      let that = this;
      // 绘制之前先清除
      this.polygon = new BMap.Polygon(
        this.showPolyonList.map(item => {
          return new BMap.Point(item.lng, item.lat);
        }),
        {
          fillColor: "red",
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 0
        }
      );
      this.map.addOverlay(this.polygon);

      // 点击获取地图点坐标
      this.map.addEventListener("dblclick", function(e) {
        let point = e.point;
        var result = BMapLib.GeoUtils.isPointInPolygon(point, that.polygon);
        if (result) {
          let region;
          getKey("terrMsg").map(i => {
            i.children.map(j => [
              j.children.map(k => {
                k.children.map(r => {
                  region = r;
                });
              })
            ]);
          });
          setKey("currentMsg", {
            allMsg: region,
            regionMsg: region,
            mapMsg: getKey("currentMsg").mapMsg
          });
          that.$router.history.push("/index/home/region");
        }
      });
    },
    drawPolygon2() {
      let that = this;
      this.map.removeOverlay(this.polygon);

      this.polygon = new BMap.Polygon(
        this.showPolyonList.map(item => {
          return new BMap.Point(item.lng, item.lat);
        }),
        {
          fillColor: "blue",
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 0
        }
      );
      this.map.addOverlay(this.polygon);

      // 点击获取地图点坐标
      this.map.addEventListener("dblclick", function(e) {
        let point = e.point;
        var result = BMapLib.GeoUtils.isPointInPolygon(point, that.polygon);
        if (result) {
          let region;
          getKey("terrMsg").map(i => {
            i.children.map(j => [
              j.children.map(k => {
                k.children.map(r => {
                  region = r;
                });
              })
            ]);
          });
          setKey("currentMsg", {
            allMsg: region,
            regionMsg: region,
            mapMsg: getKey("currentMsg").mapMsg
          });
          that.$router.history.push("/index/home/region");
        }
      });
    },
    changefillColor() {
      if (getKey("currentMsg").mapMsg.fireNum > 0) {
        // this.fillColor = "red";
        this.drawPolygon1();

        // console.log(getKey("currentMsg").mapMsg.fireNum);
        // console.log(2222);
        //      this.polygon = new BMap.Polygon(
        //   this.showPolyonList.map(item => {
        //     return new BMap.Point(item.lng, item.lat);
        //   }),
        //   { fillColor:this.fillColor,strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.3 }
        // );
        // this.map.addOverlay(this.polygon);
      } else {
        // console.log(1111111);
        // console.log(getKey("currentMsg").mapMsg.fireNum);

        // this.fillColor = "#00C1FF";
        this.drawPolygon2();
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
#mapbox {
  width: 100%;
  height: 100%;
  position: relative;
  #allmap {
    width: 100%;
    height: 100%;
  }
  .videoWidget {
    width: 355px;
    height: 270px;
    position: absolute;
    left: -355px;
    // background-color: #fff;
    top: 446px;
    .WidgetVBox {
      width: 100%;
      height: 100%;
      // background-color: red;
    }
    .littleImg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>