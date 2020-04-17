<template>
  <div class="regionWrapper">
    <div class="videoWidget">
      <div class="WidgetVBox">
        <Map></Map>
      </div>
    </div>
    <div id="imgBoxWrapper">
      <div id="imgBox" class="div-rows-col" @mousewheel="theZoom($event)">
        <img :src="bgcImg" alt="">
        <canvas id="canSave" :width="canvasW" :height="canvasH" @dblclick="goBuild($event)"></canvas>
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
import Map from "./Map";
export default {
  components: {
    Map
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
      clickX: 0, //点击画布x坐标
      clickY: 0, //点击画布y坐标
      clickBuildId: [], // 点击画布得到的数据
      fillColor: "#00C1FF",
      regionTimer: null
    };
  },
  created() {
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
      console.log(getKey("terrMsg"));
      console.log(this.pointArr);
    }
    // 初始化背景图片
    if (
      getKey("currentMsg").regionMsg.backgroundUrl ||
      getKey("currentMsg").regionMsg.backgroundUrl !== "null"
    ) {
      this.bgcImg = getKey("currentMsg").regionMsg.backgroundUrl;
    }
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
    // this.regionTimer = setInterval(() => {

    // }, 3000);
    this.changeRegionFireNum();
    // console.log(getKey('currentMsg'))
    // console.log(getKey('fireNum'))
    //初始化视图
    // this.drawctxSave();
    this.drawPolygon(this.pointArr);
    // this.changefillColor();
    // this.isDotInPolygon({x:10,y:10}, [{x:10,y:10},{x:20,y:10},{x:10,y:20}])
  },
  updated() {
    this.$nextTick(function() {
      // this.drawctxSave(); //视图改变，马上触发
      this.drawPolygon(this.pointArr);
    });
  },
  methods: {
    initCanvas() {
      //初始化
      this.canSave = document.getElementById("canSave");
      this.ctxSave = this.canSave.getContext("2d");
      this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
      this.ctxSave.lineWidth = 2; //线条粗细
      this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
      this.ctxSave.fillStyle = "red";
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
        // this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctxSave.beginPath();
        this.ctxSave.moveTo(pointArr[0].x, pointArr[0].y);
        for (let i = 1; i < pointArr.length; i++) {
          this.ctxSave.lineTo(pointArr[i].x, pointArr[i].y);
        }
        this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
        this.ctxSave.lineWidth = 2; //线条粗细
        // this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
        this.ctxSave.fillStyle = "#00C1FF";
        this.ctxSave.closePath();
        this.ctxSave.fill();
        this.ctxSave.stroke();
      }
    },
    //绘制2
    drawctxSave2(pointArr) {
      if (pointArr.length > 0) {
        // this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctxSave.beginPath();
        this.ctxSave.moveTo(pointArr[0].x, pointArr[0].y);
        for (let i = 1; i < pointArr.length; i++) {
          this.ctxSave.lineTo(pointArr[i].x, pointArr[i].y);
        }
        this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
        this.ctxSave.lineWidth = 2; //线条粗细
        // this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
        this.ctxSave.fillStyle = "red";
        this.ctxSave.closePath();
        this.ctxSave.fill();
        this.ctxSave.stroke();
      }
    },
    // 绘制多个多边形
    drawPolygon(pointArr) {
      // console.log(this.pointArr.points)
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
    // 双击进入下一级
    goBuild(e) {
      if (e.offsetX || e.layerX) {
        this.clickX = e.offsetX == undefined ? e.layerX : e.offsetX;
        this.clickY = e.offsetY == undefined ? e.layerY : e.offsetY;
      }
      //  console.log(this.clickX)
      //  console.log(this.clickY)
      //  console.log(this.pointArr)
      let clickObj = {
        x: this.clickX,
        y: this.clickY
      };
      let clickBuilds = this.pointArr.filter(item => {
        return isDotInPolygon(clickObj, item.arr);
        //  console.log(item.buildId)
        //  item.buildId
      });
      if (clickBuilds.length > 0) {
        this.clickBuildId = clickBuilds[0].buildId;
        let build;
        getKey("terrMsg").map(i => {
          i.children.map(j => [
            j.children.map(k => {
              k.children.map(r => {
                r.children.map(b => {
                  if (b.buildId == this.clickBuildId) {
                    // return b;
                    build = b;
                  }
                  // console.log(b)
                });
              });
            })
          ]);
        });
        setKey("currentMsg", {
          allMsg: build,
          buildMsg: build,
          regionMsg: getKey("currentMsg").regionMsg,
          mapMsg: getKey("currentMsg").mapMsg
        });
        this.$router.history.push("/index/home/build");
      }
      // console.log(build);
      // console.log(getKey("terrMsg"));
      // console.log(this.clickBuildId);
      //  this.clickBuildId =
      //  console.log(this.clickBuildId)
      //  if(this.clickBuildId)
      //  if(this.clickMsg.length>0){
      //  }
    },
    //监听火警变化
    changeRegionFireNum() {
      console.log(getKey("terrMsg"));
      getKey("terrMsg").map(u => {
        u.children.map(s => {
          s.children.map(a => {
            a.children.map(r=>{
              console.log(r)
              console.log(getKey("currentMsg").regionMsg.regionId)
            })
          });
        });
      });
    }
  },
  beforeDestroy() {
    // timer=null
    clearInterval(this.regionTimer);
  }
};
</script>

<style lang="less" scoped>
.regionWrapper {
  width: 100%;
  height: 100%;
  position: relative;
  // overflow: hidden;
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
      //   #canvas {
      //     z-index: 1;
      //   }
    }
  }
  // svg{
  //   width: 300px;
  //   height: 300px;
  // }
}
</style>