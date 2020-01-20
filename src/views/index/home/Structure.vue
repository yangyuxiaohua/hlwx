<template>
  <div class="structureWrapper">
    <!-- 结构图组件 -->
    <div class="search">
      <span class="area">区域</span>
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="areaSearch">
      </el-input>
      <span class="topologyIcon"><img src="../../../assets/imgs/tuopu.png" alt="">
        <img src="../../../assets/imgs/fanhui.png" class="returnIcon"></span>
    </div>
    <div class="structureMenu">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" accordion></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaSearch: "",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  mounted() {
    document.querySelectorAll(".el-tree-node__children").onclick = function() {
      console.log(this);
    };
  }
};
</script>

<style lang="less" >
.structureWrapper {
  width: 100%;
  height: 100%;
  color: #fff;
  margin: 0;
  overflow-y: auto;
  .search {
    height: 26px;
    padding: 5px 12px;
    position: relative;
    .area {
      font-size: 18px;
      margin-right: 5px;
      line-height: 26px;
      color: #778182;
    }
    .el-input {
      width: 140px;
      height: 26px;
      .el-input__inner {
        height: 26px;
      }
      .el-input__icon {
        line-height: 26px;
      }
    }
    .topologyIcon {
      position: absolute;
      right: 20px;
      top: 7px;
      img {
        width: 26px;
        height: 26px;
      }
      .returnIcon {
        margin-left: 7px;
      }
    }
  }
  .structureMenu {
    .el-tree {
      //   background-color: #233141;
      .is-current {
        background-color: salmon !important;
      }
      .is-focusable {
        background-color: #262a34;
      }
      .el-tree-node__content:hover {
        //   background-color: #262a34;
        background-color: red;
      }
      .el-tree-node__children:hover {
        background-color: red;
      }
      .el-tree-node:focus > .el-tree-node__content {
        // background-color: yellow;
      }
      .el-tree-node.is-current > .el-tree-node__content {
        background-color: #c2d6ea !important;
      }                                                                                        
    }
  }
}
</style>