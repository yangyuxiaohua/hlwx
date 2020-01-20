<template>
<div id="imgbox">
    <div :class="picWrapper">
      <img src="../assets/imgs/quanping.png" alt="" class="fullScreen" @click="fullScreen">
      <div class="imgbox">
          <slot name="imgbox"></slot>
      </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      fullScreenFlag: false, //控制全屏
      picWrapper: "picWrapper1"
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
  .imgbox{
      margin: auto;
  }
  
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