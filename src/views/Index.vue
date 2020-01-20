<template>
    <div id="indexWrapper">
        <div id="indexHeader">
          <div class="logo">
            <img src="../assets/imgs/logo.png"  class="imgLogo">
            <span>智慧消防系统</span>
            <img src="../assets/imgs/SwitchPlatformpng.png"  class="switchPlatform" title="系统切换">
          </div>
          <div class="indexHeaderRight">

         <ul class="indexNav">
              <li v-for="item in indexNav" :key="item.id" @click="changeMenu(item.path)">{{item.text}}</li>
            </ul>
            <div class="selfInfor">
              <div class="IndividualOperation">
                <img src="../assets/imgs/shebei.png" alt="设备" title="设备">
                <img src="../assets/imgs/jihua.png" alt="计划" title="计划">
                <img src="../assets/imgs/xiaoxi.png" alt="消息" title="消息">
              </div>
              <div class="userInfor">
                <img src="../assets/imgs/userInfor.png" alt="头像加载失败">
                <span>张三</span>
              </div>
            </div>
          </div>
        </div>
        <div id="indexContainer">
          <router-view></router-view>
          <!-- <div :class="indexContainerLeftClass">
           <span class="closeLeft" @click="changeLeft">
             <img :src="closeLeftImg">
           </span>
          </div>
          <div :class="indexContainerRightClass">
           <span class="openLeft" @click="changeRight">
             <img :src="closeRightImg">
           </span>

          </div>
          <div class="MessageTab"></div> -->
        </div>
       
    </div>
</template>

<script>
export default {
  components:{
  },
  data() {
    return {
      indexNav: [{id:1,text:"主页",path:'/index/home'}, {id:2,text:"设备",path:'/index/equipment'},{id:3,text:"服务",path:'/index/service'},{id:4,text:"统计",path:'/index/statistical'}],
      indexContainerLeftClass: "indexContainerLeft1",
      indexContainerRightClass: "indexContainerRight1",
      closeLeftImg: require("../assets/imgs/close.png"),
      closeRightImg: require("../assets/imgs/open.png")
    };
  },
  methods: {
    changeMenu(path){
           this.$router.history.push(path)
    }
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
    flex: 0 0 44px;
    line-height: 44px;
    color: #fff;
    display: flex;
    border: 1px solid #434956;
    .logo {
      display: flex;
      align-items: center;
      background-color: #1e2129;
      font-size: 20px;
      padding: 0 20px 0 20px;
      flex: 0 0 250px;
      justify-content: space-between;
      .imgLogo {
        // width: 20px;
        // height: 20px;
      }
      span {
        margin-left: -40px;
      }
    }
    .indexHeaderRight {
      flex: 1;
      display: flex;
      justify-content: space-between;
      background-color: #d6dce5;
      .indexNav {
        flex: 1;
        display: flex;
        // margin-left:-24px;
        li {
          width: 80px;
          text-align: center;
          color: #000;
        }
      }
      .selfInfor {
        flex: 0 0 290px;
        display: flex;
        // background-color: #f1f1f1;
        .IndividualOperation {
          flex: 0 0 150px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .userInfor {
          flex: 1;
          display: flex;
          align-items: center;
          color: #000;
          margin: 0 20px;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
  #indexContainer {
    flex: 1;
  }
}
</style>