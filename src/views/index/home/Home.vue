<template>
    <div id="homeWrapper">
          <div class="mapView">
                <Mymap></Mymap>         
          </div>
          <div class="imgbox"><img src="../../../assets/imgs/02.png" alt="" class="bgcImg"></div>
              <div class="indexContainerLeft1" v-show="isShowLeft">
                    
                    <!-- 缩略图 -->
                    <div class="thumbnail">
                        <img src="../../../assets/imgs/fangda.png" alt="" class="amplification">
                    </div>
                    <!-- 结构图 -->
                    <div class="structure">
                          <Structure></Structure>
                    </div>
                    <!-- 单位信息 -->
                    <div class="unitInformation"></div>
             </div>
             <div class="warningTab">
               <WarningInfor></WarningInfor>
             </div>
             <div class="indexContainerRight1" v-show="isShowRight">
                   
                    <!-- 警情分析 -->
                    <div class="warningAnalysis"></div>
                    <!-- 运行预警 -->
                    <div class="runWarning"></div>
                    <!-- 首火警 -->
                    <div class="firstFire"></div>
             </div>
          <div class="imgControl">
              <!-- <img src="../../../assets/imgs/jia.png" alt="">
              <img src="../../../assets/imgs/jian.png" alt=""> -->
              <img src="../../../assets/imgs/fangda.png" alt="" @click="amplificationBgcImg">
          </div>
          <span :class="closeLeftClass" @click="changeLeft">
               <img :src="closeLeftImg">
          </span>
          <span :class="closeRightClass" @click="changeRight">
                <img :src="closeRightImg">
          </span>
    </div>
</template>

<script>
import Mymap from "./Mymap";
import { addEvent, removeEvent, prEvent } from "../../../utils/publictool.js";
import Structure from "./Structure";
import WarningInfor from './WarningInfor'
export default {
  components: {
    Mymap,
    Structure,
    WarningInfor
  },
  data() {
    return {
      closeLeftClass: "closeLeft",
      closeRightClass: "closeRight",
      closeLeftImg: require("../../../assets/imgs/close.png"),
      closeRightImg: require("../../../assets/imgs/open.png"),
      // isShowAmplification:true,
      isShowLeft: true,
      isShowRight: true
    };
  },
  methods: {
    changeLeft() {
      //左右收起
      if (this.closeLeftClass === "closeLeft") {
        this.closeLeftClass = "openLeft";
        this.closeLeftImg = require("../../../assets/imgs/open.png");
        this.isShowLeft = false;
        // this.isShowAmplification = false
      } else {
        this.closeLeftClass = "closeLeft";
        this.closeLeftImg = require("../../../assets/imgs/close.png");
        // this.isShowAmplification = true
        this.isShowLeft = true;
      }
    },
    changeRight() {
      if (this.closeRightClass === "closeRight") {
        this.closeRightClass = "openRight";
        this.closeRightImg = require("../../../assets/imgs/close.png");
        this.isShowRight = false;
      } else {
        this.closeRightClass = "closeRight";
        this.closeRightImg = require("../../../assets/imgs/open.png");
        this.isShowRight = true;
      }
    },
    amplificationBgcImg() {
      this.changeLeft();
      this.changeRight();
    }
  },
  mounted() {
    /*添加滑轮事件*/
    function addWheelEvent(obj, callback) {
      if (window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
        addEvent(obj, "DOMMouseScroll", wheel);
      } else {
        addEvent(obj, "mousewheel", wheel);
      }
      function wheel(ev) {
        var oEvent = prEvent(ev),
          delta = oEvent.detail ? oEvent.detail > 0 : oEvent.wheelDelta < 0;
        callback && callback.call(oEvent, delta);
        return false;
      }
    }
    /*页面载入后*/
    window.onload = function() {
      var oImg = document.querySelector(".bgcImg");
      /*拖拽功能*/
      (function() {
        addEvent(oImg, "mousedown", function(ev) {
          var oEvent = prEvent(ev),
            oParent = oImg.parentNode,
            disX = oEvent.clientX - oImg.offsetLeft,
            disY = oEvent.clientY - oImg.offsetTop,
            startMove = function(ev) {
              if (oParent.setCapture) {
                oParent.setCapture();
              }
              var oEvent = ev || window.event,
                L = oEvent.clientX - disX,
                T = oEvent.clientY - disY;
              oImg.style.left = L + "px";
              oImg.style.top = T + "px";
              oParent.onselectstart = function() {
                return false;
              };
            },
            endMove = function(ev) {
              if (oParent.releaseCapture) {
                oParent.releaseCapture();
              }
              oParent.onselectstart = null;
              removeEvent(oParent, "mousemove", startMove);
              removeEvent(oParent, "mouseup", endMove);
            };
          addEvent(oParent, "mousemove", startMove);
          addEvent(oParent, "mouseup", endMove);
          return false;
        });
      })();
      /*以鼠标位置为中心的滑轮放大功能*/
      (function() {
        addWheelEvent(oImg, function(delta) {
          var ratioL = (this.clientX - oImg.offsetLeft) / oImg.offsetWidth,
            ratioT = (this.clientY - oImg.offsetTop) / oImg.offsetHeight,
            ratioDelta = !delta ? 1 + 0.1 : 1 - 0.1,
            w = parseInt(oImg.offsetWidth * ratioDelta),
            h = parseInt(oImg.offsetHeight * ratioDelta),
            l = Math.round(this.clientX - w * ratioL),
            t = Math.round(this.clientY - h * ratioT);
          oImg.style.width = w + "px";
          oImg.style.height = h + "px";
          oImg.style.left = l + "px";
          oImg.style.top = t + "px";
        });
      })();
    };
  }
};
</script>

<style lang="less" scoped>
#homeWrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .mapView {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .imgbox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #282c36;
    display: none;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
    }
  }
  .indexContainerLeft1 {
    width: 290px;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    position: absolute;
    left: 2px;
    top: 0;
    display: flex;
    flex-direction: column;
    z-index: 200;
    .thumbnail {
      flex: 0 0 185px;
      border: 2px solid #434956;
      background-color: rgba(45, 50, 62, 0.7);
      border-radius: 8px;
      position: relative;
      .amplification {
        position: absolute;
        right: 5px;
        bottom: 5px;
      }
    }
    .structure {
      flex: 1;
      border: 2px solid #434956;
      background-color: rgba(45, 50, 62, 0.7);
      border-radius: 8px;
      margin-top: 5px;
    }
    .unitInformation {
      flex: 0 0 170px;
      border: 2px solid #434956;
      background-color: rgba(45, 50, 62, 0.7);
      border-radius: 8px;
      margin-top: 5px;
    }
  }
  .warningTab {
    height: 170px;
    border: 1px solid #434956;
    background-color: rgba(45, 50, 62, 0.7);
    border-radius: 8px;
    position: absolute;
    bottom: 0;
    right: 300px;
    left: 300px;
    z-index: 100;
  }
  .indexContainerRight1 {
    width: 290px;
    height: 100%;
    position: absolute;
    right: 2px;
    top: 0;
    z-index: 1000;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    .warningAnalysis {
      flex: 0 0 185px;
      border: 2px solid #434956;
      background-color: rgba(45, 50, 62, 0.7);
      border-radius: 8px;
    }
    .runWarning {
      flex: 1;
      border: 2px solid #434956;
      background-color: rgba(45, 50, 62, 0.7);
      border-radius: 8px;
      margin-top: 5px;
    }
    .firstFire {
      flex: 0 0 170px;
      border: 2px solid #434956;
      background-color: rgba(45, 50, 62, 0.7);
      border-radius: 8px;
      margin-top: 5px;
    }
  }
  .imgControl {
    position: absolute;
    width: 32px;
    bottom: 180px;
    right: 310px;
    // display: flex;
    // justify-content: space-around;
    z-index: 200;
  }
  .closeLeft {
    position: absolute;
    top: 48%;
    left: 260px;
    z-index: 2000;
  }
  .openLeft {
    position: absolute;
    top: 48%;
    left: 0;
    z-index: 2000;
  }
  .closeRight {
    position: absolute;
    top: 48%;
    right: 260px;
    z-index: 2000;
  }
  .openRight {
    position: absolute;
    top: 48%;
    right: 0;
    z-index: 2000;
  }
}
</style>