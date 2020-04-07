<template>
  <div class="homeWrapper">
    <div class="left">
      <!-- 结构 -->
      <div class="structure">
        <Structure></Structure>
      </div>
      <!-- 视频小窗口 -->
      <div class="thumbnail">
        <!-- <img src="../../../assets/imgs/fangda.png" alt="" class="amplification"> -->
        <el-button icon="el-icon-sort" circle class="amplification" size='mini' @click="changeImg()"></el-button>
        <!-- <img src="../../../assets/imgs/03.png" alt="" class="littleImg"> -->
        <!-- <div class="defaultShowText">无数据</div> -->
        <!-- <Videowidget></Videowidget> -->
        <!-- <div class="VideoWidgetWrapper">
        </div> -->
      </div>
      <!-- 单位信息和消息 -->
      <div class="unitAndMessage">
        <div class="unitAndMessageTabHeader ">
          <div class="unitInforText shosedUnitAndMessageTab">单位信息</div>
          <div class="messageText">消息</div>
        </div>
        <div class="unitAndMessageTabContainer">
          <div class="unitInforContainer">
            <div class="unitInfor" :class="{unitInforOgg:index%2==0? false :true}" v-for="(item,index) in unitInforList" :key="index">
              <span class="unitIcon"><img :src="item.icon" alt=""></span>
              <span class="unitName">{{item.name}}</span>
              <span class="unitNum">{{item.num}}</span>
              <span class="unitStatus">{{item.status}}</span>
            </div>
          </div>
          <div class="messageContainer" v-show="showMessageContainer"></div>
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- 图片盒子 -->
      <div class="imgBox">
        <router-view></router-view>
      </div>
      <!-- 报警信息 -->
      <div class="warningInfor">
        <div class="warningInforTitle">
          <span>全部</span>
          <span>屏蔽</span>
          <span>火警</span>
          <span>监管</span>
          <span>启动</span>
          <span>反馈</span>
          <span>故障</span>
          <span>状态</span>
          <span>其他</span>
          <el-button type="primary" size="mini" class="testModel">测试模式</el-button>
          <el-button type="primary" size="mini">报警详情</el-button>
        </div>
        <div class="warningInforContainer">
          <div class="warningInforList">
            <div class="serialNum">序号</div>
            <div class="time">时间</div>
            <div class="equip">设备</div>
            <div class="coding">状态</div>
            <div class="control">控制器</div>
            <div class="position">位置</div>
            <div class="test">测试</div>
            <div class="look">查看</div>
            <div class="handle">操作</div>
          </div>
          <div class="warningInforList" :class="{oggBgc:index%2==0?true:false}" v-for="(item,index) in warningInforList" :key="index">
            <div class="serialNum">{{item.serialNum}}</div>
            <div class="time">{{item.time}}</div>
            <div class="equip">{{item.equip}}</div>
            <div class="coding">{{item.coding}}</div>
            <div class="control">{{item.control}}</div>
            <div class="position">{{item.position}}</div>
            <div class="test">{{item.test}}</div>
            <div class="look">
              <i class="el-icon-reading"></i>
              <img src="../../../assets/imgs/cameraIcon.png" alt="" @click="onCamera(item.cameraUrl)">
            </div>
            <div class="handle">
              <el-button type="danger" size="mini">接警</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 操作按钮组 -->
      <div class="operationBtns">
        <i class="el-icon-zoom-in"></i>
        <i class="el-icon-zoom-out"></i>
        <i class="el-icon-reading"></i>
        <i class="el-icon-close-notification"></i>
        <i class="el-icon-full-screen"></i>
        <i class="el-icon-monitor"></i>
      </div>
    </div>
    <div class="right">
      <!-- 可视化 -->
      <div class="visualization">
        <Visualization></Visualization>
      </div>

      <!-- 首火警 -->
      <div class="firstFire">
        <div class="firstFireText">
          <span class="firstFireInforTit">首火警</span>
          <span class="firstFirePaging">
            <span class="el-icon-arrow-left" @click="changFirstFireCurrent(-1)"></span>
            <span>{{firstFireCurrent}}</span>
            <span class="el-icon-arrow-right" @click="changFirstFireCurrent(1)"></span>
          </span>
        </div>
        <div class="firstFireContainer" v-show="showFirstFire">
          <div class="build">
            <span class="firstFireInforTit">建筑</span>
            <span>{{firstFire.alarmTime}}</span>
          </div>
          <div class="position">
            <span class="firstFireInforTit">位置</span>
            <span>{{firstFire.deviceUnitPosition}}</span>
          </div>
          <div class="equip">
            <span class="firstFireInforTit">设备</span>
            <span>{{firstFire.deviceUnitName}}</span>
          </div>
          <div class="max">
            <span class="firstFireInforTit">mac</span>
            <span>{{firstFire.mac}}</span>
          </div>
          <div class="control">
            <span class="firstFireInforTit">控制器</span>
            <span>
              <el-button type="primary" size="mini">消音</el-button>
            </span>
          </div>
          <div class="reset">
            <span class="firstFireInforTit"></span>
            <span>
              <el-button type="primary" size="mini">复位</el-button>
            </span>
          </div>

        </div>
        <div class="showNoFirstFire" v-show="showNoFirstFire">
          <h1>无数据</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Structure from "./Structure";
import Visualization from "./Visualization";
import { getKey, setKey } from "@/utils/local";
import { pageFirstAlarmRecord, listRealTimeAlarmRecord } from "@/apis/home";
import { setInterval, clearInterval } from "timers";
import { getTime } from "@/utils/publictool.js";
export default {
  components: {
    Structure,
    Visualization
  },
  data() {
    return {
      showMessageContainer: false,
      unitInforList: [
        //单位信息列表
        { icon: require('@/assets/imgs/建筑.png'), name: "建筑", num: 5, status: 0 },
        { icon: require("@/assets/imgs/重点部位.png"), name: "重点部位", num: 37, status: 0 },
        { icon: require("@/assets/imgs/微型消防站.png"), name: "微型消防站", num: 4, status: 0 },
        { icon: require("@/assets/imgs/消防通道.png"), name: "消防通道", num: 12, status: 0 },
        { icon: require("@/assets/imgs/消防员.png"), name: "消防员", num: 55, status: 0 },
        { icon: require("@/assets/imgs/消防车.png"), name: "消防车", num: 5, status: 0 }
      ],
      //报警数组
      warningInforList: [],
      //首火警当前页码
      firstFireCurrent: 1,
      maxNum: 16,
      showFirstFire: false,
      showNoFirstFire: true,
      firstFire: {},
      timer: null
    };
  },
  created() {
    this.getFirstFire(this.firstFireCurrent);
    this.getListRealTimeAlarmRecord()
  },
  mounted() {
    // 定时查询首火警信息
    let that = this;
    this.timer = setInterval(() => {
      that.getFirstFire(1);
      that.getListRealTimeAlarmRecord();
    }, 3000);
  },
  methods: {
    //变化首火警页码
    changFirstFireCurrent(num) {
      this.firstFireCurrent += num;
      this.firstFireCurrent =
        this.firstFireCurrent < 1 ? 1 : this.firstFireCurrent;
      this.firstFireCurrent =
        this.firstFireCurrent > this.maxNum
          ? this.maxNum
          : this.firstFireCurrent;
      this.getFirstFire(this.firstFireCurrent);
    },
    // 查询首火警
    getFirstFire(num) {
      pageFirstAlarmRecord({ index: num, size: 1 })
        .then(res => {
          // console.log(res);
          if (res.httpStatus == 200) {
            if (res.result.result.length > 0) {
              this.showFirstFire = true;
              this.showNoFirstFire = false;
              this.firstFire = res.result.result[0];
              this.maxNum = res.result.pageNum;
            }
          } else {
             this.showFirstFire = false;
              this.showNoFirstFire = true;
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
    // 查看摄像头
    onCamera(url) {
      console.log(url);
    },
    //查询时时报警
    getListRealTimeAlarmRecord() {
      listRealTimeAlarmRecord({ index: 1, size: 5 })
        .then(res => {
          // console.log(res);
          if (res.httpStatus == 200) {
            this.warningInforList = res.result.result.map((item, index) => {
              let eventType = "";
              switch (item.eventType) {
                case 64:
                  eventType = "状态";
                  break;
                case 10:
                  eventType = "屏蔽";
                  break;
                case 2:
                  eventType = "火警";
                  break;
                case 4:
                  eventType = "监管";
                  break;
                case 32:
                  eventType = "故障";
                  break;
                case 8:
                  eventType = "启动";
                  break;
                case 12:
                  eventType = "反馈";
                  break;
                case 15:
                  eventType = "延时";
                  break;
                default:
                  eventType = "复位";
              }
              return {
                serialNum: index + 1,
                time: getTime(item.alarmTime),
                equip: item.deviceName,
                coding: eventType,
                control: "",
                position: item.floorName + item.position,
                test: item.isTest == 1 ? "是" : "否",
                cameraUrl: item.cameraUrl
              };
            });
          } else {
            this.$message({
              type: "warning",
              message: "请求列表失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 三途合一
    changeImg() {
      console.log(getKey("currentMsg"));
      if (getKey("currentMsg")) {
        if (getKey("currentMsg").floorMsg) {
          console.log("当前在楼层");
          this.$router.history.push("/index/home/build");
          let { allMsg, buildMsg, regionMsg, mapMsg } = getKey("currentMsg");
          setKey("currentMsg", {
            allMsg: buildMsg,
            buildMsg: buildMsg,
            regionMsg: regionMsg,
            mapMsg: mapMsg
          });
        } else if (getKey("currentMsg").buildMsg) {
          this.$router.history.push("/index/home/region");
          let { allMsg, regionMsg, mapMsg } = getKey("currentMsg");
          setKey("currentMsg", {
            allMsg: regionMsg,
            regionMsg: regionMsg,
            mapMsg: mapMsg
          });
          console.log("当前在楼栋");
        } else if (getKey("currentMsg").regionMsg) {
          this.$router.history.push("/index/home/map");
          let { allMsg, mapMsg } = getKey("currentMsg");
          setKey("currentMsg", {
            allMsg: mapMsg,
            mapMsg: mapMsg
          });
          console.log("当前在分区");
        } else {
          console.log("当前在地图");
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.homeWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    flex: 0 0 355px;
    .structure {
      width: 100%;
      height: 446px;
      background-color: #272e30;
    }
    .thumbnail {
      width: 100%;
      height: 270px;
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      .el-button {
        background-color: #5d616d;
        color: #f2f2f2;
        opacity: 0.5;
      }
      .amplification {
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 10;
        // cursor: pointer;
      }
      .littleImg {
        width: 100%;
        height: 100%;
      }
      // .defaultShowText{
      //   width: 100%;
      //   height: 100%;
      //   line-height: 270px;
      //   font-size: 30px;
      //   text-align: center;
      // }
    }
    .unitAndMessage {
      width: 100%;
      height: 314px;
      background-color: #262d2f;
      display: flex;
      flex-direction: column;
      .unitAndMessageTabHeader {
        width: 100%;
        height: 52px;
        line-height: 52px;
        display: flex;
        .unitInforText,
        .messageText {
          width: 50%;
          background-color: #333a3c;
          border-radius: 18px 18px 0 0;
          cursor: pointer;
          color: #d0d0d3;
          text-align: center;
          font-size: 20px;
        }
        .shosedUnitAndMessageTab {
          background-color: #5d616d;
          color: #ecebef;
        }
      }

      .unitAndMessageTabContainer {
        flex: 1;
        overflow: auto;
        .unitInforContainer {
          width: 100%;
          height: 100%;
          .unitInfor {
            height: 42px;
            line-height: 42px;
            color: #fff;
            display: flex;
            span {
              display: inline-block;
            }
            .unitIcon {
              width: 56px;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                width: 22px;
                height: 23px;
              }
            }
            .unitName {
              width: 135px;
              text-indent: 20px;
              // text-align: center;
            }
            .unitNum {
              width: 80px;
            }
            .unitStatus {
              width: 84px;
            }
          }
          .unitInforOgg {
            background-color: #2d4455;
          }
        }
      }
      .unitAndMessageTabContainer::-webkit-scrollbar {
        width: 4px;
        display: none;
      }
    }
  }
  .middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    .imgBox {
      flex: 1;
    }
    .warningInfor {
      flex: 0 0 314px;
      background-color: #28313f;
      color: #ecebef;
      .warningInforTitle {
        height: 52px;
        background-color: #5d616d;
        border-radius: 18px 18px 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;
        padding-right: 10px;
      }
      .warningInforContainer {
        width: 100%;
        background-color: #272e30;
        .warningInforList {
          width: 100%;
          height: 42px;
          display: flex;
          line-height: 42px;
          text-align: center;
          .serialNum {
            width: 60px;
          }
          .time {
            width: 170px;
          }
          .equip {
            width: 160px;
            overflow: hidden;
          }
          .coding {
            width: 106px;
          }
          .control {
            width: 106px;
          }
          .position {
            flex: 1;
            overflow: hidden;
          }
          .test {
            width: 64px;
          }
          .look {
            width: 100px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 20px;
            padding: 0 15px;
            box-sizing: border-box;
            img {
              width: 20px;
              height: 20px;
              cursor: pointer;
            }
            i {
              cursor: pointer;
            }
          }
          .handle {
            width: 106px;
          }
        }
        .oggBgc {
          background-color: #2c4355;
        }
      }
    }
    .operationBtns {
      width: 312px;
      height: 24px;
      // background-color: #fff;
      position: absolute;
      right: 0;
      top: 24px;
      font-size: 24px;
      color: #fff;
      i {
        margin-right: 28px;
        cursor: pointer;
      }
    }
  }
  .right {
    flex: 0 0 355px;
    .visualization {
      width: 100%;
      height: 716px;
    }

    .firstFire {
      width: 100%;
      height: 314px;
      background-color: #28313f;
      display: flex;
      flex-direction: column;
      color: #ecebef;
      .firstFireText {
        width: 100%;
        height: 52px;
        background-color: #5d616d;
        border-radius: 18px 18px 0 0;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .firstFireInforTit {
          display: inline-block;
          line-height: 52px;
          width: 92px;
          text-align: center;
        }
        .firstFirePaging {
          margin-right: 20px;
          span {
            display: inline-block;
            width: 20px;
            text-align: center;
          }
          span:hover {
            cursor: pointer;
            background-color: #28313f;
          }
        }
      }
      .firstFireContainer {
        flex: 1;
        background-color: #272e30;
        & > div {
          width: 100%;
          height: 42px;
          display: flex;
          line-height: 42px;
          text-align: center;
          color: #ecebef;
          .firstFireInforTit {
            display: inline-block;
            width: 92px;
            text-align: center;
          }
          & > span:nth-child(2n) {
            text-indent: 28px;
          }
        }
        & > div:nth-child(2n) {
          background-color: #2c4355;
        }
      }
      .showNoFirstFire {
        text-align: center;
        flex: 1;
        line-height: 200px;
      }
    }
  }
}
</style>