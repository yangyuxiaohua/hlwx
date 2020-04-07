<template>
    <div class="visualizationWrapper">
        <!-- 警情分析 -->
        <div class="warningAnalysis">
            <div class="warningAnalysisText headText">警情分析
                <div class="numericalText">
                    <span>报警：11</span>
                    <span>误报：1</span>
                    <span>7天</span>
                </div>
            </div>

            <div class="warningAnalysisContainer" ref="warningAnalysisEcharts">
            </div>
        </div>
        <!-- 运行预警 -->
        <div class="runWarning">
            <div class="runWarningText headText">运行预警</div>
            <div class="runWarningContainer">
                <div class="safetyPeril">
                    <div class="safetyPerilText">
                        <span>安全隐患：9/11</span>
                        <span>30天</span>
                    </div>
                    <div class="safetyPerilContainer" ref="safetyPerilEchrts"></div>
                </div>
                <div class="EquipmentFailure">
                    <div class="EquipmentFailureText">
                        <span>设备故障：9/11</span>
                        <span>30天</span>
                    </div>
                    <div class="EquipmentFailureContainer" ref="EquipmentFailureEcharts"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      warningAnalysisOption: {
        title: {
          text: "Biu~简单柱状图示例",
          show: false
        },
        grid: {
          x: "10%", //x 偏移量
          y: "35px", // y 偏移量
          width: "85%", // 宽度
          height: "70%" // 高度
        },
        // tooltip: {},
        legend: {
          //图例
          data: ["火警", "误报"], //与series的name对应
          left: "75%", //图例的位置，可以用像素，可以用百分比，也可以用center，right等
          show: false,
          top: 12.5, //图例的位置
          itemWidth: 10, //图例图标的宽
          itemHeight: 10, //图例图标的高
          textStyle: {
            color: "#878787" //值的具体的颜色
          }
        },
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          type: "category",
          splitLine: { show: false }, //去除网格分割线
          // splitArea: {show: true},//保留网格区域
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: "#06bec9", //轴线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisTick: {
            //刻度
            show: false //不显示刻度线
          },
          //   axisLine:{
          //     symbol : ['none', 'arrow']
          //   },
          axisLabel: {
            textStyle: {
              color: "#06bec9" //坐标值的具体的颜色
            }
          },
          splitLine: {
            show: false //去掉分割线
          }
          //   offset:'2px'
        },
        yAxis: {
          // data:['0','5','10','15','20']
          //   name: "单位：次", //轴的名字，默认位置在y轴上方显示
          //   max: 30, //最大刻度
          type: "value",
          axisLine: {
            //线
            lineStyle: {
              type: "solid",
              color: "#06bec9", //轴线的颜色
              width: "1" //坐标线的宽度
            }
            //  symbol : ['none', 'arrow']
          },
          axisTick: {
            //刻度
            show: false,
            inside: true
          },
          axisLabel: {
            textStyle: {
              color: "#06bec9" //坐标值得具体的颜色
            }
          },
          minInterval: 10, //标值的最小间隔
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "火警",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 10],
            color: "#006dfd",
            itemStyle: {
              normal: {
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                  textStyle: {
                    color: "#fff" //值得颜色
                  }
                }
              }
            },
            barWidth: 10 //设置柱子宽度，单位为px
          },
          {
            name: "误报",
            type: "bar",
            data: [10, 30, 6, 20, 20, 10, 30],
            color: "#00c1ff",
            itemStyle: {
              normal: {
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                  textStyle: {
                    color: "#fff" //值得颜色
                  }
                }
              }
            },
            barWidth: 10 //设置柱子宽度，单位为px
          }
        ]
      },
      safetyPerilOption: {
        title: {
          text: "Biu~简单柱状图示例",
          show: false
        },
        grid: {
          x: "15%", //x 偏移量
          y: "20px", // y 偏移量
          width: "80%", // 宽度
          height: "70%" // 高度
        },
        // tooltip: {
        //   trigger: "axis"
        // },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        // 保存到本地
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          type: "category",
          splitLine: { show: false }, //去除网格分割线
          // splitArea: {show: true},//保留网格区域
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: "#06bec9", //轴线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisTick: {
            //刻度
            show: false //不显示刻度线
          },
          //   axisLine:{
          //     symbol : ['none', 'arrow']
          //   },
          axisLabel: {
            textStyle: {
              color: "#06bec9" //坐标值的具体的颜色
            }
          },
          splitLine: {
            show: false //去掉分割线
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            //线
            lineStyle: {
              type: "solid",
              color: "#06bec9", //轴线的颜色
              width: "1" //坐标线的宽度
            }
            //  symbol : ['none', 'arrow']
          },
          axisTick: {
            //刻度
            show: false,
            inside: true
          },
          axisLabel: {
            textStyle: {
              color: "#06bec9" //坐标值得具体的颜色
            }
          },
          minInterval: 10, //标值的最小间隔
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            type: "line",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            type: "line",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            type: "line",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      EquipmentFailureOption: {
        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          show: false,
          textStyle: {
            color: "#ccc"
          }
        },
        //hover的文字
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['red', 'green','yellow','blueviolet'],
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "80%", //大小
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问",},
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
                // color: "#016cfa",
            //   color: ["red", "green", "yellow", "blueviolet"],

              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {
      // 警情分析
      this.chart1 = echarts.init(this.$refs.warningAnalysisEcharts);
      // 使用刚指定的配置项和数据显示图表。
      this.chart1.setOption(this.warningAnalysisOption);
      //运行预警
      //安全隐患
      this.chart2 = echarts.init(this.$refs.safetyPerilEchrts);
      this.chart2.setOption(this.safetyPerilOption);
      //设备故障
      this.chart3 = echarts.init(this.$refs.EquipmentFailureEcharts);
      this.chart3.setOption(this.EquipmentFailureOption);
    }
  }
};
</script>

<style lang="less" scoped>
.visualizationWrapper {
  width: 100%;
  height: 100%;
  color: #f9fafc;
  .warningAnalysis {
    width: 100%;
    height: 246px;
    display: flex;
    flex-direction: column;
    position: relative;
    .warningAnalysisText {
      .numericalText {
        width: 220px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        z-index: 10;
        right: 15px;
        bottom: 162px;
        display: flex;
        justify-content: space-around;
        font-size: 14px;
      }
    }
    .warningAnalysisContainer {
      flex: 1;
    }
  }
  .runWarning {
    width: 100%;
    height: 470px;
    .runWarningContainer {
      .safetyPeril {
        font-size: 14px;
        .safetyPerilText {
          box-sizing: border-box;
          width: 100%;
          height: 32px;
          background-color: #262e2f;
          line-height: 32px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
        }
        .safetyPerilContainer {
          width: 100%;
          height: 167px;
        }
      }
      .EquipmentFailure {
        font-size: 14px;
        .EquipmentFailureText {
          box-sizing: border-box;
          width: 100%;
          height: 32px;
          background-color: #262e2f;
          line-height: 32px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
        }
        .EquipmentFailureContainer {
          width: 100%;
          height: 167px;
        }
      }
    }
  }
  .headText {
    width: 100%;
    height: 52px;
    line-height: 52px;
    text-align: center;
    border-radius: 18px 18px 0 0;
    background-color: #5d616d;
    font-size: 20px;
  }
}
</style>