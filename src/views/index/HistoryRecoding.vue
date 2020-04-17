<template>
  <div class="historyRecodingWrapper">
    <div class="historyRecodingLists">
      <div class="historyRecodingListsTit">
        <h2>历史记录</h2>
      </div>
      <div class="historyRecodingListsContainer">
        <div class="historyRecodingHeader">
          <div class="historyRecoding">
            <span class="deviceName">设备名称</span>
            <span class="eventType">状态</span>
            <span class="alarmTime">报警时间</span>
            <span class="acceptTime">接警时间</span>
            <span class="restoreTime">复位时间</span>
            <span class=" isResult">处理状态</span>
            <span class="is_need_alarm">接警操作</span>
          </div>
        </div>
        <div class="historyRecodingContainer">
          <div class="historyRecoding" v-for="(item,index) in historyList" :key="index">
            <span class="deviceName">{{item.deviceName}}</span>
            <span class="eventType">{{item.eventType}}</span>
            <span class="alarmTime">{{item.alarmTime}}</span>
            <span class="acceptTime">{{item.acceptTime}}</span>
            <span class="restoreTime">{{item.restoreTime}}</span>
            <span class=" isResult">{{item.isResult}}</span>
            <span class="is_need_alarm">
              <el-button type="primary" size="mini" v-show="item.isNeedAlarmNo">不需要</el-button>
              <el-button type="danger" size="mini" v-show="item.isNeedAlarm">接警</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="historyRecodingListsPaging">
        <el-pagination background layout="prev, pager, next" :total="historyTotal" :pager-count="pageCount" :page-size='historyCurrentNum' :current-page.sync='historyCurrentPage' @current-change='getHistoryList'>
        </el-pagination>
        <el-button type='primary' @click="returnPrevious()">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  pageHistoryAlarmRecord,
  pageIotAlarmHistoryRecord
} from "@/apis/historyRecoding";
import { getTime, inDexOfStr } from "@/utils/publictool";
import { getKey } from "@/utils/local";

export default {
  data() {
    return {
      //分页
      historyTotal: 0,
      pageCount: 5,
      historyCurrentNum: 10,
      historyCurrentPage: 1,
      historyList: [],
      // isNeedAlarm: false, // 接警
      // isNeedAlarmNo: false
    };
  },
  created() {
    console.log(inDexOfStr(getKey("url"), "waterWarning"));
    this.getHistoryList(this.historyCurrentPage);
    console.log(getKey("url"));
  },
  methods: {
    getHistoryList(val) {
      if (
        inDexOfStr(getKey("url"), "home") ||
        inDexOfStr(getKey("url"), "systemStatistical")
      ) {
        pageHistoryAlarmRecord({ index: val, size: this.historyCurrentNum })
          .then(res => {
            if (res.httpStatus == 200) {
              this.historyTotal = res.result.countRows;
              this.historyList = res.result.result.map(item => {
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
                if (item.isNeedAlarm == 1) {
                  this.isNeedAlarm = true;
                  this.isNeedAlarmNo = false;
                } else {
                  this.isNeedAlarmNo = true;
                  this.isNeedAlarm = false;
                }
                return {
                  deviceName: item.deviceName,
                  eventType: eventType,
                  alarmTime: getTime(item.alarmTime),
                  acceptTime: getTime(item.acceptTime),
                  restoreTime: getTime(item.restoreTime),
                  isResult: item.isResult == 1 ? "已处理" : "未处理"
                  // isNeedAlarm: item.isNeedAlarm == 1 ? "需要" : "不需要"
                };
              });
            }
          })
          .catch(err => {
            //   console.log(err);
            this.$message({
              type: "warning",
              message: "网络请求失败"
            });
          });
      } else if (inDexOfStr(getKey("url"), "waterWarning")) {
        pageIotAlarmHistoryRecord({ index: val, size: this.historyCurrentNum })
          .then(res => {
            console.log(res);
            if (res.httpStatus == 200) {
              this.historyTotal = res.result.countRows;
              this.historyList = res.result.result.map(item => {
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
                // if (item.isNeedAlarm == 1) {
                //   this.isNeedAlarm = true;
                //   this.isNeedAlarmNo = false;
                // } else {
                //   this.isNeedAlarmNo = true;
                //   this.isNeedAlarm = false;
                // }
                return {
                  deviceName: item.deviceName,
                  eventType: eventType,
                  alarmTime: getTime(item.alarmTime),
                  acceptTime: getTime(item.acceptTime),
                  restoreTime: getTime(item.restoreTime),
                  isResult: item.isResult == 1 ? "已处理" : "未处理",
                  isNeedAlarm: item.isNeedAlarm == 1 ? true : false,
                  isNeedAlarmNo: item.isNeedAlarm == 1 ? false : true
                  // isNeedAlarm: item.isNeedAlarm == 1 ? "需要" : "不需要"
                };
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    returnPrevious() {
      this.$router.history.push(getKey("url"));
    }
  }
};
</script>

<style lang="less" scoped>
.historyRecodingWrapper {
  width: 100%;
  height: 100%;
  color: #d5d5d5;
  // background-color: #fff;
  position: relative;
  .historyRecodingLists {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    background-color: #111a28;
    padding: 0 30px 20px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .historyRecodingListsTit {
      h2 {
        line-height: 80px;
      }
    }
    .historyRecodingListsContainer {
      flex: 1;
      .historyRecoding {
        display: flex;
        // justify-content: space-around;
        line-height: 30px;
        span {
          display: inline-block;
          padding: 0 10px;
          text-align: center;
          line-height: 60px;
          //   flex: 1;
        }
        .deviceName {
          width: 250px;
        }
        .eventType {
          width: 100px;
        }
        .alarmTime {
          width: 200px;
        }
        .acceptTime {
          width: 200px;
        }
        .restoreTime {
          width: 200px;
        }
        .isResult {
          width: 100px;
        }
        .is_need_alarm {
          width: 200px;
        }
      }
      .historyRecodingHeader {
        width: 100%;
        background-color: #1f2f49;
      }
    }
    .historyRecodingListsPaging {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>