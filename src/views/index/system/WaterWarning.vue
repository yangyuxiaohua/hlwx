<template>
  <div class="configurationWrapper">
    <div id="configuration">
      <div id="configurationImg" @mousewheel="theZoom($event)">
        <img src="../../../assets/imgs/waterWarning.png" alt="">
        <div class="iconBox">
          <div class="numBox" :style="{left:numBoxX+'px',top:numBoxY+'px'}" title="水箱">{{currValue}}</div>
        </div>
      </div>
    </div>

    <div class="waterWarning">
      <div class="waterWarningHeader">
        <span class="num">序号</span>
        <span class="deviceName">设备</span>
        <span class="currVal">当前值</span>
        <span class="alarmTime">报警时间</span>
        <span class="position">位置</span>
        <span class="rangMin">最小值</span>
        <span class="rangMax">最大值</span>
        <span class="eventType">类型</span>
        <span class="isTest">测试</span>
        <span class="isNeedAlarm">接警</span>
      </div>
      <div class="waterWarningContainer">
        <div class="waterWarningInfor" v-for="item in waterWarningList" :key="item.num">
          <span class="num">{{item.num}}</span>
          <span class="deviceName">{{item.deviceName}}</span>
          <span class="currVal">{{item.currVal}}{{item.unit}}</span>
          <span class="alarmTime">{{item.alarmTime}}</span>
          <span class="position">{{item.position}}</span>
          <span class="rangMin">{{item.rangMin}}</span>
          <span class="rangMax">{{item.rangMax}}</span>
          <span class="eventType">
            <el-button type="primary" size="mini" v-show="item.primaryeventType">正常</el-button>
            <el-button type="warning" size="mini" v-show="item.warningeventType">预警</el-button>
            <el-button type="danger" size="mini" v-show="item.dangereventType">危险</el-button>
          </span>
          <span class="isTest">{{item.isTest}}</span>
          <span class="isNeedAlarm">
            <el-button type="primary" size="mini" v-show="item.isNeedAlarmNo">不需要</el-button>
            <el-button type="danger" size="mini" v-show="item.isNeedAlarm">接警</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOffset, getTime } from "@/utils/publictool.js";
import $ from "jquery";
import "webpack-jquery-ui";
import "webpack-jquery-ui/css";
import {
  pageIotAlarmRealRecord,
  listWaterIotDevices
} from "@/apis/waterWarning";
export default {
  data() {
    return {
      imgBoxW: 1100, //图片盒子宽
      imgBoxH: 600, //图片盒子高
      scaleSize: 1, //初始化缩放率
      bgX: 0, //图片盒子在大盒子内的X坐标
      bgY: 0, //图片盒子在大盒子内的Y坐标
      startX: 0, //图片盒子拖动之前位置
      startY: 0,
      endX: 0,
      endY: 0,
      numBoxX: 900,
      numBoxY: 468,
      waterWarningList: [],
      currValue: 0, //水位
      timer: null // 定时任务
      //   showEventType: false,
      // primaryeventType: false, // 事件类型
      // warningeventType: false,
      // dangereventType: false,
      // isNeedAlarm: false, // 接警
      // isNeedAlarmNo: false
    };
  },
  created() {
     this.getWaterWarningList();
      this.getListWaterIotDevices();
  },
  mounted() {
    //初始化盒子居中
    this.initNs();
    let that = this;
    this.timer = setInterval(() => {
      that.getWaterWarningList();
      that.getListWaterIotDevices();
    }, 3000);
    $("#configurationImg").draggable({
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
    //初始化小盒子居中
    initNs() {
      this.bigBoxH = parseInt(
        document.getElementById("configuration").offsetHeight
      );
      this.bigBoxW = parseInt(
        document.getElementById("configuration").offsetWidth
      );
      this.bgX = -(this.imgBoxW - this.bigBoxW) / 2;
      this.bgY = -(this.imgBoxH - this.bigBoxH) / 2;
      document.getElementById("configurationImg").style.left = this.bgX + "px";
      document.getElementById("configurationImg").style.top = this.bgY + "px";
    },
    //鼠标滚动事件
    theZoom(e) {
      event.preventDefault();
      var $b = document.getElementById("configuration"), //大盒子
        i = document.getElementById("configurationImg"), //小盒子
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
      // this.canvasW = this.imgBoxW * ns;
      // this.canvasH = this.imgBoxH * ns;
      //   // 处理放大之后的画布点数组
      //   this.numBoxX = this.pointArr.map(item => {
      //     item.y = item.y + item.y * (ns - this.scaleSize) / this.scaleSize;
      //     item.x = item.x + item.x * (ns - this.scaleSize) / this.scaleSize;
      //     return { x: item.x, y: item.y };
      //   });
      this.numBoxX =
        this.numBoxX + this.numBoxX * (ns - this.scaleSize) / this.scaleSize;
      this.numBoxY =
        this.numBoxY + this.numBoxY * (ns - this.scaleSize) / this.scaleSize;

      img.top = this.bgY + "px";
      img.left = this.bgX + "px";

      this.scaleSize = ns; //更新倍率
    },
    // 获取报警列表
    getWaterWarningList() {
      pageIotAlarmRealRecord({
        index: 1,
        size: 5
      })
        .then(res => {
          console.log(res);
          if (res.httpStatus == 200) {
            this.waterWarningList = res.result.result.map((item, index) => {
              item.num = index + 1;
              item.alarmTime = getTime(item.alarmTime);
              item.rangMin = item.rangMin + "m";
              item.rangMax = item.rangMax + "m";
              // item.unit = item.unit
              switch (item.eventType) {
                case 1000:
                  item.primaryeventType = true;
                  break;
                case 2000:
                  item.warningeventType = true;
                  break;
                default:
                  item.dangereventType = true;
              }
              item.isTest = item.isTest == 1 ? "是" : "否";
              // if (item.isNeedAlarm == 1) {
              //   this.isNeedAlarm = true;
              //   this.isNeedAlarmNo = false;
              // } else {
              //   this.isNeedAlarmNo = true;
              //   this.isNeedAlarm = false;
              // }
              item.isNeedAlarm = item.isNeedAlarm == 1 ? true : false;
              item.isNeedAlarmNo = item.isNeedAlarm == 1 ? false : true;
              return item;
            });
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
    },
    //获取实时水位
    getListWaterIotDevices() {
      listWaterIotDevices({ build: "1ecd2a9f2e4543fe9fe0c5fcacb60e05" })
        .then(res => {
          console.log(res);
          this.currValue = res.result[0].currValue + "m";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.configurationWrapper {
  width: 100%;
  height: 100%;
  #configuration {
    width: 100%;
    height: 776px;
    background-color: #61c3d0;
    overflow: hidden;
    position: relative;
    #configurationImg {
      width: 1100px;
      height: 600px;
      img {
        width: 100%;
        height: 100%;
      }
      .iconBox {
        .numBox {
          position: absolute;
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #493e46;
          border: 2px solid #72777b;
          color: #ecebef;
          z-index: 20;
          cursor: pointer;
        }
      }
    }
  }
  .waterWarning {
    width: 100%;
    height: 254px;
    color: #ecebef;
    .waterWarningHeader {
      width: 100%;
      height: 40px;
      border-bottom: 2px solid #5690c5;
      border-top: 2px solid #5690c5;
      line-height: 40px;
      font-size: 18px;
      span {
        display: inline-block;
        text-align: center;
      }
    }
    .waterWarningContainer {
      width: 100%;
      .waterWarningInfor {
        width: 100%;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        span {
          display: inline-block;
          text-align: center;
        }
      }
      .waterWarningInfor:nth-child(2n-1) {
        background-color: #2d4455;
      }
    }
    .num {
      width: 76px;
    }
    .deviceName {
      width: 150px;
    }
    .currVal {
      width: 140px;
    }
    .alarmTime {
      width: 200px;
    }
    .position {
      flex: 1;
      width: 250px;
    }
    .rangMin {
      width: 140px;
    }
    .rangMax {
      width: 140px;
    }
    .eventType {
      width: 150px;
    }
    .isTest {
      width: 50px;
    }
    .isNeedAlarm {
      width: 200px;
    }
  }
}
</style>