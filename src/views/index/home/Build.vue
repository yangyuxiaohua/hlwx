<template>
  <div class="BuildWrapper">
    <div class="videoWidget">
      <div class="WidgetVBox">
        <BuildRegion></BuildRegion>
      </div>
    </div>
    <div id="imgBoxWrapper">
      <div id="imgBox" class="div-rows-col" @mousewheel="theZoom($event)">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583733137772&di=05428e7b4019bc6010e565289bf030bd&imgtype=0&src=http%3A%2F%2Fimg2.xafc.com%2Fbuilding%2F20180115%2F5a5c3d0f906c2.jpg" alt="">
        <canvas id="canSave" :width="canvasW" :height="canvasH"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { getOffset, getObjStr } from "@/utils/publictool.js";
import { getKey, setKey } from "@/utils/local.js";
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import BuildRegion from './BuildRegion'
export default {
  components:{
    BuildRegion,
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
      bgcImg: ""
    };
  },
  created() {
    // if(this.$route.path =='/index/home/build'){
    //   this.$router.history.push('/index/home/build/buildRegion')
    // }
    if (
      getKey("currentMsg") &&
      getKey("currentMsg").buildMsg.points !== "null"
    ) {
      this.pointArr = getObjStr(getKey("currentMsg").buildMsg.points);
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
    this.drawctxSave();
  },
  updated() {
    this.$nextTick(function() {
      this.drawctxSave(); //视图改变，马上触发
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
        item.y = item.y + item.y * (ns - this.scaleSize) / this.scaleSize;
        item.x = item.x + item.x * (ns - this.scaleSize) / this.scaleSize;
        return { x: item.x, y: item.y };
      });
      img.top = this.bgY + "px";
      img.left = this.bgX + "px";

      // 放大之后重新绘制在ctxSave
      this.scaleSize = ns; //更新倍率
    },
    drawctxSave() {
      if (this.pointArr.length > 0) {
        this.ctxSave.clearRect(0, 0, this.canvasW, this.canvasH);
        this.ctxSave.beginPath();
        this.ctxSave.moveTo(this.pointArr[0].x, this.pointArr[0].y);
        for (let i = 1; i < this.pointArr.length; i++) {
          this.ctxSave.lineTo(this.pointArr[i].x, this.pointArr[i].y);
        }
        this.ctxSave.strokeStyle = "rgba(102,168,255,.5)"; //线条颜色
        this.ctxSave.lineWidth = 2; //线条粗细
        this.ctxSave.fillStyle = "rgba(161,195,255,0.5)";
        this.ctxSave.closePath();
        this.ctxSave.fill();
        this.ctxSave.stroke();
      }
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
    }
  }
};
</script>

<style lang="less" scoped>
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