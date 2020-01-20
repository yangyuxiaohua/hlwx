<template>
  <div>
    <div id="box" v-html="content"></div>
    <el-button type="success" id="addele">元素</el-button>
  </div>
</template>

<script>
export default {
  data() {
      return{
          content: ''
      }
  },
  mounted() {
      this.content='<el-button type="success" id="addele">新增的元素</el-button>'
     console.log(document.querySelector('#addele'))
     console.log(document.querySelector('#addele'))
  }
};
</script>

<style lang="scss" scoped>
</style>