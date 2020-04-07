<template>
    <div class="systemWrapper">
        <div class="systemLeft">
            <div class="systemTree">
                <SystemStructure></SystemStructure>
            </div>
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
        <div class="systemRight">
            <SystemStatistical></SystemStatistical>
        </div>
    </div>
</template>

<script>
import SystemStructure from "./SystemStructure";
import SystemStatistical from "./SystemStatistical";
export default {
  components: {
    SystemStructure,
    SystemStatistical
  },
  data() {
    return {
      unitInforList: [
        //单位信息列表
        {
          icon: require("@/assets/imgs/建筑.png"),
          name: "建筑",
          num: 5,
          status: 0
        },
        {
          icon: require("@/assets/imgs/重点部位.png"),
          name: "重点部位",
          num: 37,
          status: 0
        },
        {
          icon: require("@/assets/imgs/微型消防站.png"),
          name: "微型消防站",
          num: 4,
          status: 0
        },
        {
          icon: require("@/assets/imgs/消防通道.png"),
          name: "消防通道",
          num: 12,
          status: 0
        },
        {
          icon: require("@/assets/imgs/消防员.png"),
          name: "消防员",
          num: 55,
          status: 0
        },
        {
          icon: require("@/assets/imgs/消防车.png"),
          name: "消防车",
          num: 5,
          status: 0
        }
      ],
      showMessageContainer: false //消息
    };
  }
};
</script>

<style lang="less" scoped>
.systemWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #1a2224;
  .systemLeft {
    width: 355px;
    height: 978px;
    margin-top: 52px;
    .systemTree {
      width: 100%;
      height: 546px;
    }
    .unitAndMessage {
      width: 100%;
      height: 432px;
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
            height: 62px;
            line-height: 62px;
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
              img {
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
  .systemRight {
    width: 100%;
    height: 100%;
  }
}
</style>