<template>
  <div id="buildRegionWrapper">
    <div id="buildRegionBox" @mousewheel="theZoom($event)">
      <img :src="bgcImg" alt="">
      <canvas id="can" :width="canvasW" :height="canvasH"></canvas>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import { getOffset, getObjStr } from "@/utils/publictool.js";
import { getKey, setKey } from "@/utils/local.js";
export default {
  data() {
    return {
      pointX: 0, //鼠标点
      pointY: 0,
      pointArr: [], // 存放坐标的数组
      canSave: {}, //画布2
      oIndex: -1, //判断数遍是否移动到起始点处
      imgBoxW: 1000, //图片盒子宽
      imgBoxH: 600, //图片盒子高
      scaleSize: 1, //初始化缩放率
      bigBoxW: 0, //大盒子宽
      bigBoxH: 0, //大盒子高
      canvasW: 1000,
      canvasH: 600,
      canvasL: 0,
      canvasT: 0,
      bgX: 0, //图片盒子在大盒子内的X坐标
      bgY: 0, //图片盒子在大盒子内的Y坐标
      startX: 0, //图片盒子拖动之前位置
      startY: 0,
      endX: 0,
      endY: 0,
      bgcImg: "",
      fillColor: "#00C1FF",
      buildRegionTimer: null,
      regionFire: 0
    };
  },
  created() {
    // console.log(this.pointArr);
    this.init()
  },
  mounted() {
    this.initNs();
    this.initCanvas();

    let that = this;

    $("#buildRegionBox").draggable({
      start: function(event) {
        that.startX = event.pageX;
        that.startY = event.pageY;
      },
      stop: function(event) {
        that.endX = event.pageX;
        that.endY = event.pageY;
        that.bgX = that.bgX + that.endX - that.startX;
        that.bgY = that.bgY + that.endY - that.startY;
      }
    });
    //初始化视图
    // this.drawctxSave();
    this.drawPolygon(this.pointArr);
    // that.changefillColor();

    this.buildRegionTimer = setInterval(() => {
      // console.log("buildRegion");
      let realFire = 0,
        realdata;
      getKey("terrMsg").forEach(u => {
        u.children.forEach(s => {
          s.children.forEach(a => {
            a.children.forEach(r => {
              if (r.regionId == getKey("currentMsg").regionMsg.regionId) {
                // console.log(r.backgroundUrl)
                realFire = r.fireNum;
                realdata = r;
                // this.bgcImg = r.backgroundUrl
              }
            });
          });
        });
      });
      if (that.regionFire != realFire) {
        that.pointArr = getObjStr(getKey("currentMsg").regionMsg.points);
        that.pointArr = that.pointArr.map(item => {
          // item.fireNum = 1
          // console.log(item)
          realdata.children.forEach(i => {
            if (item.buildId == i.buildId) {
              item.fireNum = i.fireNum;
            }
          });
          return item;
        });
        // console.log(that.pointArr)
        that.drawPolygon(that.pointArr);
        that.regionFire = realFire;
      }
    }, 1000);
  },
  updated() {
    this.$nextTick(function() {
      // this.drawctxSave(); //视图改变，马上触发
      this.drawPolygon(this.pointArr);
    });
  },
  methods: {
    //初始化点位和图片
    init() {
      if (
        getKey("currentMsg") &&
        getKey("currentMsg").regionMsg.points !== "null"
      ) {
        this.pointArr = getObjStr(getKey("currentMsg").regionMsg.points);
        this.pointArr = this.pointArr.map(item => {
          // item.fireNum = 1
          getKey("currentMsg").regionMsg.children.forEach(i => {
            if (item.buildId == i.id) {
              item.fireNum = i.fireNum;
            }
          });
          return item;
        });
      }
      if (
        getKey("currentMsg") &&
        getKey("currentMsg").regionMsg.backgroundUrl !== "null"
      ) {
        this.bgcImg = getKey("currentMsg").regionMsg.backgroundUrl;
      }
    },
    //初始化
    initCanvas() {
      this.canSave = document.getElementById("can");
      this.ctxSave = this.canSave.getContext("2d");
      this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
      this.ctxSave.lineWidth = 2; //线条粗细
      this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
    },
    //绘制1
    drawctxSave(pointArr = []) {
      if (pointArr.length > 0) {
        // this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctxSave.beginPath();
        this.ctxSave.moveTo(pointArr[0].x, pointArr[0].y);
        for (let i = 1; i < pointArr.length; i++) {
          this.ctxSave.lineTo(pointArr[i].x, pointArr[i].y);
        }
        this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
        this.ctxSave.lineWidth = 2; //线条粗细
        this.ctxSave.fillStyle = "#00C1FF";
        this.ctxSave.closePath();
        this.ctxSave.fill();
        this.ctxSave.stroke();
      }
    },
    //绘制2
    drawctxSave2(pointArr = []) {
      if (pointArr.length > 0) {
        // this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctxSave.beginPath();
        this.ctxSave.moveTo(pointArr[0].x, pointArr[0].y);
        for (let i = 1; i < pointArr.length; i++) {
          this.ctxSave.lineTo(pointArr[i].x, pointArr[i].y);
        }
        this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
        this.ctxSave.lineWidth = 2; //线条粗细
        this.ctxSave.fillStyle = "red";
        this.ctxSave.closePath();
        this.ctxSave.fill();
        this.ctxSave.stroke();
      }
    },
    // 绘制多个多边形
    drawPolygon(pointArr = []) {
      pointArr.forEach(item => {
        if (item.fireNum > 0) {
          this.drawctxSave2(item.arr);
        } else {
          this.drawctxSave(item.arr);
        }
      });
    },
    //初始化小盒子居中
    initNs() {
      this.bigBoxH = parseInt(
        document.getElementById("buildRegionWrapper").offsetHeight
      );
      this.bigBoxW = parseInt(
        document.getElementById("buildRegionWrapper").offsetWidth
      );
      this.bgX = -(this.imgBoxW - this.bigBoxW) / 2;
      this.bgY = -(this.imgBoxH - this.bigBoxH) / 2;
      document.getElementById("buildRegionBox").style.left = this.bgX + "px";
      document.getElementById("buildRegionBox").style.top = this.bgY + "px";
    },
    //鼠标滚动事件
    theZoom(e) {
      event.preventDefault();
      this.initCanvas();
      var $b = document.getElementById("buildRegionWrapper"), //大盒子
        i = document.getElementById("buildRegionBox"), //小盒子
        img = i.style;
      //鼠标坐标
      let l = getOffset($b);
      let x = e.pageX;
      let y = e.pageY;
      //相对坐标
      x = x - l.left;
      y = y - l.top;
      var p = e.wheelDelta / 1200;
      var ns = this.scaleSize;
      ns += p;
      ns = ns < 0.5 ? 0.5 : ns > 10 ? 10 : ns; //可以缩小到0.1,放大到5倍

      //计算位置，以鼠标所在位置为中心
      //以每个点的x、y位置，计算其相对于图片的位置，再计算其相对放大后的图片的位置
      this.bgX =
        this.bgX - (x - this.bgX) * (ns - this.scaleSize) / this.scaleSize;
      this.bgY =
        this.bgY - (y - this.bgY) * (ns - this.scaleSize) / this.scaleSize;
      //设置放大的宽度和新坐标
      img.width = this.imgBoxW * ns + "px";
      img.height = this.imgBoxH * ns + "px";
      //设置放大之后的画布大小
      this.canvasW = this.imgBoxW * ns;
      this.canvasH = this.imgBoxH * ns;
      // 处理放大之后的画布点数组
      this.pointArr = this.pointArr.map(item => {
        item.arr.map(i => {
          i.y = i.y + i.y * (ns - this.scaleSize) / this.scaleSize;
          i.x = i.x + i.x * (ns - this.scaleSize) / this.scaleSize;
          return i;
        });
        return item;
      });
      img.top = this.bgY + "px";
      img.left = this.bgX + "px";

      // 放大之后重新绘制在ctxSave
      this.scaleSize = ns; //更新倍率
    }
    //   //根据火警变化颜色
    //   changefillColor() {
    //     console.log(getKey("currentMsg").regionMsg)
    //     if (getKey("currentMsg").regionMsg.fireNum > 0) {
    //       console.log('有火警')
    //       this.fillColor = "red";
    //       this.drawPolygon(this.pointArr);
    //       // console.log(11111)
    //     } else {
    //       this.fillColor = "#00C1FF";
    //       this.drawPolygon(this.pointArr);
    //     }
    //   }
  },
  beforeDestroy() {
    clearInterval(this.buildRegionTimer);
    this.buildRegionTimer = null;
  }
};
</script>

<style lang="less">
#buildRegionWrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  #buildRegionBox {
    width: 1000px;
    height: 600px;
    position: absolute;
    border: none;
    // overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
}
</style>