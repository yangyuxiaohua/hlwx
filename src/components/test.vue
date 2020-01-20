<template>
<div id="imgbox">
    <div :class="picWrapper">
      <img src="../assets/imgs/quanping.png" alt="" class="fullScreen" @click="fullScreen">
      <div class="imgbox">
         <Imgview style="width:100%;height:100%;position:absolute;" :imgUrl="imgUrl" background="#f2f2f2"></Imgview>
      </div>
    </div>
</div>
</template>

<script>
import Imgview from "./Imgview";
export default {
  components: {
    Imgview
  },
  data() {
    return {
      fullScreenFlag: false, //控制全屏
      picWrapper: "picWrapper1",
      imgUrl: require("./../assets/imgs/01.png"),
      style1: {
        width: "100%",
        height: "100%",
        position: "absolute"
      }
    };
  },
  methods: {
    fullScreen() {
      this.picWrapper =
        this.picWrapper === "picWrapper1" ? "picWrapper2" : "picWrapper1";
    }
  }
};
</script>

<style lang="less" scoped>
#imgbox {
  width: 100%;
  height: 100%;
}
.picWrapper1 {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  position: relative;
}
.picWrapper2 {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  position: fixed;
  left: 0;
  top: 0;
}
.picWrapper1:hover .fullScreen {
  display: block;
}
.picWrapper2:hover .fullScreen {
  display: block;
}
.fullScreen {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: none;
  z-index: 100;
}
.imgbox {
  width: 100%;
  height: 100%;
}
</style>