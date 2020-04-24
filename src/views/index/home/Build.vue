<template>
  <div class="BuildWrapper">
    <div class="videoWidget">
      <div class="WidgetVBox">
        <BuildRegion></BuildRegion>
      </div>
    </div>
    <div id="imgBoxWrapper">
      <div id="imgBox" class="div-rows-col" @mousewheel="theZoom($event)">
        <img :src="bgcImg" alt="">
        <canvas id="canSave" :width="canvasW" :height="canvasH" @dblclick="goFloor($event)"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { getOffset, getObjStr, isDotInPolygon } from "@/utils/publictool.js";
import { getKey, setKey } from "@/utils/local.js";
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import BuildRegion from "./BuildRegion";
export default {
  components: {
    BuildRegion
  },
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
      clickFloorId: "",
      buildTimer: null,
      buildFire: 0,
      fillColor: "#00C1FF"
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.initNs();
    this.initCanvas();
    let that = this;
    $("#imgBox").draggable({
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

    this.buildTimer = setInterval(() => {
      // console.log("build");
      let realFire = 0,
        realdata;
      getKey("terrMsg").forEach(u => {
        u.children.forEach(s => {
          s.children.forEach(a => {
            a.children.forEach(r => {
              r.children.forEach(b => {
                if (b.buildId == getKey("currentMsg").buildMsg.buildId) {
                  realFire = b.fireNum;
                  realdata = b;
                }
              });
            });
          });
        });
      });
      if (that.buildFire != realFire) {
        that.pointArr = getObjStr(getKey("currentMsg").buildMsg.points);
        that.pointArr = that.pointArr.map(item => {
          realdata.children.forEach(i => {
            if (item.floorId == i.id) {
              item.fireNum = i.fireNum;
            }
          });
          return item;
        });
        that.drawPolygon(that.pointArr);
        that.buildFire = realFire;
      }
    }, 1000);
  },
  updated() {
    this.$nextTick(function() {
      //视图改变，马上触发
      this.drawPolygon(this.pointArr);
    });
  },
  watch: {
    // pointArr: function(old, newData) {
    //   console.log(old, newData);
    // }
  },
  methods: {
    //初始化点位和图片
    init() {
      if (
        getKey("currentMsg") &&
        getKey("currentMsg").buildMsg.points !== "null"
      ) {
        this.pointArr = getObjStr(getKey("currentMsg").buildMsg.points);
        this.pointArr = this.pointArr.map(item => {
          // item.fireNum = 1
          // console.log(item)
          getKey("currentMsg").buildMsg.children.forEach(i => {
            if (item.floorId == i.id) {
              item.fireNum = i.fireNum;
            }
          });
          return item;
        });
      }
      // console.log(this.pointArr)
      // 初始化背景图片
      if (
        getKey("currentMsg").buildMsg.backgroundUrl ||
        getKey("currentMsg").buildMsg.backgroundUrl !== "null"
      ) {
        this.bgcImg = getKey("currentMsg").buildMsg.backgroundUrl;
      }
    },
    initCanvas() {
      //初始化
      this.canSave = document.getElementById("canSave");
      this.ctxSave = this.canSave.getContext("2d");
      this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
      this.ctxSave.lineWidth = 2; //线条粗细
      this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
    },
    //鼠标滚动事件
    theZoom(e) {
      event.preventDefault();
      this.initCanvas();
      var $b = document.getElementById("imgBoxWrapper"), //大盒子
        i = document.getElementById("imgBox"), //小盒子
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
      ns = ns < 1 ? 1 : ns > 10 ? 10 : ns; //可以缩小到0.1,放大到5倍

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
    },
    //绘制1
    drawctxSave(pointArr) {
      if (pointArr.length > 0) {
        this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
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
    drawctxSave2(pointArr) {
      if (pointArr.length > 0) {
        this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
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
    drawPolygon(pointArr) {
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
        document.getElementById("imgBoxWrapper").offsetHeight
      );
      this.bigBoxW = parseInt(
        document.getElementById("imgBoxWrapper").offsetWidth
      );
      this.bgX = -(this.imgBoxW - this.bigBoxW) / 2;
      this.bgY = -(this.imgBoxH - this.bigBoxH) / 2;
      document.getElementById("imgBox").style.left = this.bgX + "px";
      document.getElementById("imgBox").style.top = this.bgY + "px";
    },
    // 双击去楼层
    goFloor(e) {
      if (e.offsetX || e.layerX) {
        this.clickX = e.offsetX == undefined ? e.layerX : e.offsetX;
        this.clickY = e.offsetY == undefined ? e.layerY : e.offsetY;
      }
      let clickObj = {
        x: this.clickX,
        y: this.clickY
      };
      let clickFloors = this.pointArr.filter(item => {
        return isDotInPolygon(clickObj, item.arr);
      });
      if (clickFloors.length > 0) {
        this.clickFloorId = clickFloors[0].floorId;
        let floor;
        getKey("terrMsg").map(i => {
          i.children.map(j => [
            j.children.map(k => {
              k.children.map(r => {
                r.children.map(b => {
                  b.children.map(f => {
                    if (f.id == this.clickFloorId) {
                      floor = f;
                    }
                  });
                });
              });
            })
          ]);
        });
        setKey("currentMsg", {
          // allMsg: floor,
          buildMsg: getKey("currentMsg").buildMsg,
          regionMsg: getKey("currentMsg").regionMsg,
          mapMsg: getKey("currentMsg").mapMsg,
          floorMsg: floor
        });
        this.$router.history.push("/index/home/floor");
      }
    }
    //根据火警变化颜色
    // changefillColor() {
    //   if (getKey("currentMsg").buildMsg.fireNum > 0) {
    //     this.fillColor = "red";
    //     this.drawPolygon(this.pointArr);
    //     console.log('build火警')
    //   } else {
    //     console.log('无build火警')

    //     this.fillColor = "#00C1FF";
    //     this.drawPolygon(this.pointArr);
    //   }
    // }
  },
  beforeDestroy() {
    clearInterval(this.buildTimer);
    this.timer = null;
  }
};
</script>

<style lang="less">
.BuildWrapper {
  width: 100%;
  height: 100%;
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
  }
  #imgBoxWrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    #imgBox {
      width: 1000px;
      height: 600px;
      position: absolute;
      border: none;
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
}
</style>