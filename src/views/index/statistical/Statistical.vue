<template>
    <div>
        <h1>统计</h1>
        <canvas id="quad" width="700" height="700" style="background: antiquewhite"></canvas>
        <el-button type="primary">编辑</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    var canvas = document.getElementById("quad");
    var context = canvas.getContext("2d");
    context.fillStyle = "white"; // 内部使用白色，如不指定，默认为黑色
    context.strokeStyle = "#008"; // 深蓝色外边框
    context.lineWidth = 2; // 2个像素宽

    var poly = [0, 416, 529, 424, 639, 499, 52, 490];
    this.polygon(poly, context);
  },
  methods: {
    polygon(poly, context) {
      context.beginPath();
      context.moveTo(poly[0], poly[1]);

      for (var i = 2; i < 8; i += 2) {
        context.lineTo(poly[i], poly[i + 1]);
        console.log(poly[i], poly[i + 1]);
      }
      context.closePath();
      context.fill();
      context.stroke();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>