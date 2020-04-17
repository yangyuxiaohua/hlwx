<template>
  <div id="indexWrapper" @mouseover="autoPaly()">
    <div id="indexHeader">
      <div class="logo">
        <img src="../assets/imgs/logo.png" class="imgLogo">
        <span>智慧消防预警监控系统</span>
        <i class="el-icon-copy-document"></i>
      </div>
      <div class="midTitle">
        <p>新世纪环球中心智慧消防 [监控中心]</p>
      </div>
      <div class="handleBtnList">
        <img src="../assets/imgs/shebei.png" alt="设备" title="设备">
        <img src="../assets/imgs/jihua.png" alt="计划" title="历史记录" @click="goToHistoryRecoding()">
        <img src="../assets/imgs/xiaoxi.png" alt="消息" title="设置" @click="palyAudio()" id="autoPlay">
        <img src="../assets/imgs/userInfor.png" alt="头像加载失败" @click="stopAudio()">
      </div>
      <audio loop muted autoplay id="audio">
        <source src="@/assets/music/fireWarning.mp3"></audio>
    </div>
    <div id="indexContainer">
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
      <router-view></router-view>
    </div>
    <div class="routerView">
      <div class="goTissue" @click="goHome('/index/home/map')" :class="{chosedTissue:goToChild==1}">组织结构</div>
      <div class="goSystem" @click="goHome('/index/system/systemStatistical')" :class="{chosedTissue:goToChild==2}">系统结构</div>
    </div>
  </div>
</template>

<script>
import { inDexOfStr } from "@/utils/publictool.js";
import { countFires } from "@/apis/home";
import { getKey, setKey } from "@/utils/local.js";
import { setInterval } from "timers";
export default {
  components: {},
  data() {
    return {
      // indexContainerLeftClass: "indexContainerLeft1",
      // indexContainerRightClass: "indexContainerRight1",
      // closeLeftImg: require("../assets/imgs/close.png"),
      // closeRightImg: require("../assets/imgs/open.png")
      goToChild: 1,
      fireVoiceTimer: null
    };
  },
  created() {
    if (inDexOfStr(this.$route.path, "home")) {
      this.goToChild = 1;
    } else {
      this.goToChild = 2;
    }
  },
  mounted() {
    let that = this;
    // 去除浏览器默认事件
    document.oncontextmenu = function() {
      return false;
    };
    // // 设置音频消音
    // document.getElementById("palyAudio").click()
    // document.getElementById("audio").muted = true;
    // document.getElementById("audio").autopaly = true;
    // console.log(document.getElementById("audio").muted);
    // console.log(document.getElementById("audio").autopaly);
    // console.log(document.getElementById("audio").play)
    // 查询首火警
    this.fireVoiceTimer = setInterval(function() {
      that.getFireNum();
      // that.autoPaly()
    }, 1000);
    // document.getElementById('audio')
    // let audio = new Audio()
    // audio.src = "@/assets/music/fireWarning.mp3"
    // audio.play();
  },
  methods: {
    changeMenu(path) {
      this.$router.history.push(path);
    },
    // changeLeft() {
    //   //左右收起
    //   if (this.indexContainerLeftClass === "indexContainerLeft1") {
    //     this.indexContainerLeftClass = "indexContainerLeft2";
    //     this.closeLeftImg = require("../assets/imgs/open.png");
    //   } else {
    //     this.indexContainerLeftClass = "indexContainerLeft1";
    //     this.closeLeftImg = require("../assets/imgs/close.png");
    //   }
    // },
    // changeRight() {
    //   if (this.indexContainerRightClass === "indexContainerRight1") {
    //     this.indexContainerRightClass = "indexContainerRight2";
    //     this.closeRightImg = require("../assets/imgs/close.png");
    //   } else {
    //     this.indexContainerRightClass = "indexContainerRight1";
    //     this.closeRightImg = require("../assets/imgs/open.png");
    //   }
    // }
    goHome(path) {
      if (path == "/index/home/map") {
        this.goToChild = 1;
      } else {
        this.goToChild = 2;
      }
      this.$router.history.push(path);
    },
    goToHistoryRecoding() {
      // console.log(this.$route.path)
      // let str = this.$route.path
      // if(str.indexOf('home')!=-1){
      //   console.log('主页')
      // }else{
      //   console.log('物联网')
      // }
      this.$router.push("/index/historyRecoding");
    },
    //开始播放
    palyAudio() {
      // this.stopAudio()
      console.log("开始播放");
      document.getElementById("audio").muted = false;
      document.getElementById("audio").play();
      // console.log(document.getElementById("audio").muted)
    },
    // 停止播放
    stopAudio() {
      console.log("停止播放");
      // console.log(document.getElementById("audio").muted)
      document.getElementById("audio").muted = true;

      document.getElementById("audio").currentTime = 0;
      document.getElementById("audio").pause();
    },
    //自动播放
    autoPaly() {
      // console.log(11111)
      // document.getElementById("audio").muted = true;
      // document.getElementById("audio").play();
    },
    // 查询火警数
    getFireNum() {
      countFires().then(res => {
        // console.log(res);
        if (res.httpStatus == 200) {
          if (getKey("fireNum")) {
            // countRows
            if (res.result > getKey("fireNum")) {
              this.palyAudio();
            }
            setKey("fireNum", res.result);
          } else {
            if (res.result > 0) {
              this.palyAudio();
              // console.log("有火警");
            } else {
              this.stopAudio();
            }
            setKey("fireNum", res.result);
          }
          // console.log(res);
        }
      });
    }
  },
  beforeDestroy() {
    // timer=null
    clearInterval(this.fireVoiceTimer);
  }
};
</script>

<style lang="less" scoped>
#indexWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #indexHeader {
    flex: 0 0 50px;
    line-height: 50px;
    display: flex;
    .logo {
      flex: 0 0 329px;
      display: flex;
      align-items: center;
      padding: 0 0 0 26px;
      font-size: 26px;
      position: relative;
      .imgLogo {
        width: 36px;
        height: 40px;
      }
      span {
        margin-left: 12px;
      }
      .el-icon-copy-document {
        position: absolute;
        right: -26px;
      }
    }
    .midTitle {
      flex: 1;
      display: flex;
      justify-content: center;
      font-size: 26px;
    }
    .handleBtnList {
      flex: 0 0 237px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 30px 0 88px;
      img {
        width: 26px;
        height: 26px;
        cursor: pointer;
      }
    }
  }
  #indexContainer {
    flex: 1;
    // height: 1030px;
    background-color: #141a3e;
    // overflow: hidden;
  }
  .routerView {
    width: 355px;
    height: 52px;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 10;
    display: flex;
    line-height: 52px;
    .goTissue,
    .goSystem {
      width: 50%;
      background-color: #333a3c;
      border-radius: 18px 18px 0 0;
      cursor: pointer;
      color: #d0d0d3;
      text-align: center;
      font-size: 20px;
    }
    .chosedTissue {
      background-color: #5d616d;
      color: #ecebef;
    }
  }
}
</style>