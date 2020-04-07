<template>
  <div class="floorWrapper">
    <div class="videoWidget">
      <div class="WidgetVBox">
        <FloorBuild></FloorBuild>
      </div>
    </div>
    <div id="imgBoxWrapper">
      <div id="imgBox" class="div-rows-col" @mousewheel="theZoom($event)">
        <img src="@/assets/imgs/微信截图_20200218103048.png" alt="">
        <div id="iconBox">
          <img :src="item.icon" v-for="item in iconList" :key="item.id" :style="{left:item.x+'px',top:item.y+'px'}" class='equipIcon'>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import { getOffset } from "@/utils/publictool.js";
import { getKey } from "@/utils/local.js";
import { listFireDevicesIcon, imgIp } from "@/apis/floor.js";
import FloorBuild from "./FloorBuild";
export default {
  components: {
    FloorBuild
  },
  data() {
    return {
      imgBoxW: 1000, //图片盒子宽
      imgBoxH: 600, //图片盒子高
      scaleSize: 1, //初始化缩放率
      bigBoxW: 0, //大盒子宽
      bigBoxH: 0, //大盒子高
      iconList: [], //cad内的图标位置信息
      bgX: 0, //图片盒子在大盒子内的X坐标
      bgY: 0, //图片盒子在大盒子内的Y坐标
      currentIconX: 0,
      currentIconY: 0,
      flag: false //控制两个拖动之间的影响
    };
  },
  created() {
    //  if(this.$route.path =='/index/home/floor'){
    //   this.$router.history.push('/index/home/floor/floorBuild')
    // }
    // console.log(getKey("currentMsg").allMsg.id);
    this.getIconList();
  },
  mounted() {
    //初始化缩放比例
    let that = this;
    this.initNs();
    // 图片盒子可以拖拽
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
  },
  methods: {
    theZoom(e) {
      event.preventDefault();

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
      // iconlist随着图片的缩放相对改变位置
      this.iconList = this.iconList.map(item => {
        item.y = item.y + item.y * (ns - this.scaleSize) / this.scaleSize;
        item.x = item.x + item.x * (ns - this.scaleSize) / this.scaleSize;
        return item;
      });
      img.top = this.bgY + "px";
      img.left = this.bgX + "px";
      this.scaleSize = ns; //更新倍率
    },
    //初始化图片坐标
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
    // 获取图标列表
    getIconList() {
      listFireDevicesIcon({
        floorId: getKey("currentMsg").allMsg.id
      })
        .then(res => {
          if (res.httpStatus == 200) {
            this.iconList = res.result.map(item => {
              item.icon = imgIp + item.icon;
              return item;
            });
            // console.log(this.iconList)
          } else {
            this.$message({
              type: "warning",
              message: "网络请求失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.floorWrapper {
  width: 100%;
  height: 100%;
  position: relative;
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
    height: 100%;
    width: 100%;
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
      #iconBox {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        img {
          position: absolute;
          width: 30px;
          height: 30px;
          left: 0;
          top: 0;
          z-index: 100;
        }
      }
    }
  }
}
</style>