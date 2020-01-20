<template>
  <div class="warningInforWrapper">
    <div class="warningInforTabHeader">
      <div class="warningInforNav">
        <span v-for="(item,index) in warningInforNav" :key="index">{{item}}</span>
      </div>
      <div class="Switchmode">
        <button>测试模式</button>
        <button>报警详情</button>
      </div>
    </div>
    <div class="warningBox">

      <table class="warningInfor">
        <thead>
          <tr>
            <td class="tdFirstRadus">序号</td>
            <td>时间</td>
            <td>设备</td>
            <td>编码</td>
            <td>控制器</td>
            <td>位置</td>
            <td>测试</td>
            <td>查看</td>
            <td class="tdLastRadus">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
          <tr>
            <td class="first">序号</td>
            <td>时间1111111</td>
            <td>设备2</td>
            <td>编码222222222222222</td>
            <td>控制器2</td>
            <td>位置2</td>
            <td>测试2</td>
            <td>查看222</td>
            <td>操作2222</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      warningInforNav: [
        "全部",
        "屏蔽",
        "火警",
        "监管",
        "启动",
        "反馈",
        "故障",
        "状态",
        "其他"
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.warningInforWrapper {
  width: 100%;
  height: 100%;
  color: #fff;
  // overflow-y: auto;

  .warningInforTabHeader {
    border: 1px solid #434956;
    border-radius: 8px;
    font-style: 16px;
    line-height: 40px;
    // margin: 1px 0;
    display: flex;
    .warningInforNav {
      // text-indent: 20px;
      flex: 1;
      display: flex;
      justify-content: space-around;
    }
    .Switchmode {
      flex: 0 0 200px;
      button {
        background-color: #434956;
        color: #fff;
        width: 90px;
        border: none;
        outline: none;
        margin: 0 5px;
        border-radius: 8px;
        line-height: 20px;
      }
    }
  }
  .warningBox {
    width: 100%;
    height: 127px;
    overflow: auto;
    .warningInfor {
      width: 100%;
      margin-top: 2px;
      border-collapse: collapse;
      td {
        text-align: center;
        height: 30px;
        line-height: 30px;
        // padding: 0 10px;
      }
      tr {
        & > td:first-child {
          border-radius: 7px 0 0 7px;
          // text-indent: 5px;
          width: 54px;
        }
        & > td:last-child {
          border-radius: 0 7px 7px 0;
        }
      }
      thead {
        width: 100%;
        background-color: #8a97af;
        tr {
          border: 1px solid #434956;
        }
      }
      tbody {
        tr {
          border: 1px solid #434956;
        }
        td {
          text-align: center;
          background-color: #46607d;
        }
      }
    }
  }
  .warningBox::-webkit-scrollbar {
    width: 4px;
  }
  .warningBox::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
    //    box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
  }
  .warningBox::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>