<template>
    <div>
        <span>过度跳转页</span>
    </div>
</template>

<script>
import { getKey } from "@/utils/local.js";
export default {
  created() {
    this.$router.history.push(getKey("repeatHash"))
  }
};
</script>

<style lang="less">
</style>