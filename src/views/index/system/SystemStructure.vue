<template>
  <div class="SystemStructureWrapper">
    <!-- 结构图组件 -->
    <div class="structureSearch">
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="structureSearch">
      </el-input>
    </div>
    <div class="structureTabContainer">
      <div class="structureMenu">
        <el-tree :data="structureData" node-key="id" default-expand-all :props="defaultProps" :expand-on-click-node='onNode' @node-click='clickNode'>
          <span class="custom-tree-node" slot-scope="{node,data}">
            <span class="buildIconWrapper">
              <img :src="data.iconUrl" alt="" class="buildIcon">

              <!-- <i :class="node.iconUrl"></i> -->
            </span>
            <span class="nodeText">{{node.label }}</span>
            <span class="fireWarningNum" v-show="fireNum">{{fireNum}}</span>
          </span>
        </el-tree>
      </div>
      <div class="systemContainer" v-show="showSystemContainer"></div>
      <!-- <div class="treeMask">
        <div class='grid' v-for="(item,index) in mask" :key="index"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getOffset } from "@/utils/publictool";
import { getKey, setKey } from "@/utils/local";
// import { listSelfFactoryRegionalByUserId } from "@/apis/home";
import { listSelfFactoryRegionalByUserId } from "@/apis/systemStructure";

export default {
  data() {
    return {
      onNode: false, //点击节点展开
      indent: 26, // 相邻节点缩进距离
      structureSearch: "", //搜索单位
      structureData: [
        {
          id: "0002121",
          label: "新世纪环球中心",
          children: [
            {
              id: "0002",
              label: "东区写字楼",
              children: [
                {
                  id: "0003",
                  label: "东区N1"
                }
              ]
            },
            {
              id: "0004",
              label: "北区写字楼",
              children: [
                {
                  id: "0005",
                  label: "北区写字楼N1"
                },
                {
                  id: "0006",
                  label: "北区写字楼N1"
                },
                {
                  id: "0007",
                  label: "北区写字楼N1"
                },
                {
                  id: "0008",
                  label: "北区写字楼N1"
                },
                {
                  id: "0009",
                  label: "北区写字楼N1"
                },
                {
                  id: "0000",
                  label: "北区写字楼N1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        icon: "iconUrl"
      },
      mask: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      showSystemContainer: false, // tab切换
      fireNum:false, //隐藏火警数
    };
  },
  created() {
    listSelfFactoryRegionalByUserId({ userId: getKey("userInfor").userId })
      .then(res => {
        if (res.httpStatus == 200) {
          this.structureData = res.result.map(item => {
            let sites = item.sites.map(s => {
              let builds = s.builds.map(b => {
                let iotSystems = b.iotSystems.map(i => {
                  switch (i.iotSystem) { // 如果为30则为水系统，绑定路由
                    case 30:
                      i.url = "/index/system/waterWarning";
                      break;
                  }
                  return {
                    id: i.iotSystem,
                    label: i.systemName,
                    url: i.url,
                    iconUrl: require("../../../assets/imgs/楼层.png")
                  };
                });
                return {
                  id: b.buildId,
                  label: b.buildName,
                  children: iotSystems,
                  iconUrl: require("../../../assets/imgs/楼栋.png")
                };
              });
              return {
                id: s.siteId,
                label: s.siteName,
                children: builds,
                iconUrl: require("../../../assets/imgs/分区.png")
              };
            });
            return {
              id: item.factoryId,
              label: item.name,
              children: sites,
              iconUrl: require("../../../assets/imgs/区域.png")
            };
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(getKey("userInfor"));
    // listSelfFactoryRegionalByUserId({ userId: getKey("userInfor").userId })
    // .then(res => {
    //   // console.log(res);
    //   if (res.httpStatus == 200) {
    //     this.structureData = res.result.map(item => {
    //       let siteArray = item.sites.map(i => {
    //         let areaArray = i.areas.map(k => {
    //           let areaBuildsArray = k.areaBuilds.map(j => {
    //             let BuildsArray = j.builds.map(l => {
    //               let floorsArray = l.floors.map(m => {
    //                 return {
    //                   id: m.floorId,
    //                   label: m.floorName,
    //                   url: "/index/home/floor",
    //                   showChildren: false,
    //                   // floor: m.floorId,
    //                   points: m.points,
    //                   areaId: m.areaId,
    //                   buildId: m.buildId,
    //                   factoryId: m.factoryId,
    //                   regionId: m.regionId,
    //                   siteId: m.siteId,
    //                   system: m.system,
    //                   backgroundUrl: m.backgroundUrl,
    //                   iconUrl: require("../../../assets/imgs/楼层.png")
    //                 };
    //               });
    //               return {
    //                 id: l.buildId,
    //                 label: l.buildName,
    //                 url: "/index/home/build",
    //                 children: floorsArray,
    //                 showChildren: true,
    //                 build: l.buildId,
    //                 buildId: l.buildId,
    //                 regionId: l.regionId,
    //                 areaId: l.areaId,
    //                 factoryId: l.factoryId,
    //                 siteId: l.siteId,
    //                 points: l.points,
    //                 backgroundUrl: l.backgroundUrl,
    //                 iconUrl: require("../../../assets/imgs/楼栋.png")
    //               };
    //             });
    //             return {
    //               id: j.regionId,
    //               label: j.regionName,
    //               url: "/index/home/region",
    //               children: BuildsArray,
    //               region: j.regionId,
    //               regionId: j.regionId,
    //               areaId: j.areaId,
    //               factoryId: j.factoryId,
    //               siteId: j.siteId,
    //               points: j.points,
    //               backgroundUrl: j.backgroundUrl,
    //               iconUrl: require("../../../assets/imgs/分区.png")
    //             };
    //           });
    //           return {
    //             id: k.areaId,
    //             label: k.areaName,
    //             url: "/index/home/map",
    //             children: areaBuildsArray,
    //             area: k.areaId,
    //             areaId: k.areaId,
    //             factoryId: k.factoryId,
    //             siteId: k.siteId,
    //             points: k.points,
    //             lat: k.lat,
    //             lon: k.lon,
    //             iconUrl: require("../../../assets/imgs/区域.png")
    //           };
    //         });
    //         return {
    //           id: i.siteId,
    //           label: i.siteName,
    //           children: areaArray,
    //           site: i.siteId,
    //           factoryId: i.factoryId,
    //           siteId: i.siteId,
    //           iconUrl: require("../../../assets/imgs/站点.png")
    //         };
    //       });
    //       return {
    //         id: item.factoryId,
    //         label: item.name,
    //         children: siteArray,
    //         factoryId: item.factoryId,
    //         iconUrl: require("../../../assets/imgs/build.png")
    //       };
    //     });
    //   }
    // if (!getKey("currentMsg")) {
    //   setKey("currentMsg", {
    //     allMsg: this.structureData[0].children[0].children[3],
    //     mapMsg: this.structureData[0].children[0].children[3]
    //   });
    //   this.clickNode(this.structureData[0].children[0].children[3]);
    // } else {
    //   this.clickNode(this.structureData[0].children[0].children[3]);
    // }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  },
  methods: {
    //点击节点
    clickNode(a, b = {}, c) {
      if (a.url) {
        // if (a.url == "/index/home/floor") {
        //   setKey("currentMsg", {
        //     allMsg: a,
        //     floorMsg: a,
        //     buildMsg: b.parent.data,
        //     regionMsg: b.parent.parent.data,
        //     mapMsg: b.parent.parent.parent.data
        //   });
        // } else if (a.url == "/index/home/build") {
        //   setKey("currentMsg", {
        //     allMsg: a,
        //     buildMsg: a,
        //     regionMsg: b.parent.data,
        //     mapMsg: b.parent.parent.data
        //   });
        //   setKey("currentMsg", {
        //     allMsg: a,
        //     buildMsg: a,
        //     regionMsg: b.parent.data,
        //     mapMsg: b.parent.parent.data
        //   });
        // } else if (a.url == "/index/home/region") {
        //   setKey("currentMsg", {
        //     allMsg: a,
        //     regionMsg: a,
        //     mapMsg: b.parent.data
        //   });
        // } else {
        //   setKey("currentMsg", {
        //     allMsg: a,
        //     mapMsg: a
        //   });
        // }
        // this.$router.history.push(a.url);
        this.$router.history.push(a.url);
      }
      // console.log("点击节点", a, b, c);
    }
  },
  mounted() {},
  updated() {}
};
</script>

<style lang="less">
.SystemStructureWrapper {
  width: 100%;
  height: 100%;
  color: #fff;
  margin: 0;
  display: flex;
  flex-direction: column;
  .structureSearch {
    width: 100%;
    height: 42px;
    border-top: 1px solid #5d8bb4;
    border-bottom: 1px solid #5d8bb4;
    .el-input {
      border: none;
      .el-input__inner {
        background-color: #272f30;
        border: none;
        padding: 0 30px;
        font-size: 16px;
      }
      .el-icon-search {
        font-size: 20px;
        width: 75px;
        cursor: pointer;
      }
      .el-icon-search:hover {
        background-color: #333a3c;
      }
    }
  }
  .structureTabContainer {
    overflow-y: auto;
    flex: 1;
    position: relative;
    .structureMenu {
      .el-tree {
        background-color: #272f30;
        color: #ecebef;
        padding-left: 56px;
        & > .el-tree-node {
          & > .el-tree-node__content {
            font-size: 20px;
            height: 62px;
            line-height: 62px;
            position: relative;
            border-bottom: 1px solid #3b4d5a;
            z-index: 10;
          }
        }
        .buildIconWrapper {
          border-bottom: 1px solid #3b4d5a;
          position: absolute;
          left: -56px;
          top: 0;
          display: inline-block;
          height: 62px;
          width: 56px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .buildIcon {
          width: 26px;
          height: 24px;
        }
        .fireWarningNum {
          display: inline-block;
          width: 36px;
          height: 20px;
          position: absolute;
          right: 22px;
          top: 22px;
          background-color: red;
          font-size: 12px;
          line-height: 20px;
          text-align: center;
          color: #ecebef;
          border-radius: 10px;
        }
        .expanded,
        .el-tree-node__expand-icon,
        .el-icon-caret-right {
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
        .el-tree-node__children {
          font-size: 18px;
          overflow: visible;
          color: #a4a5a8;
          .el-tree-node__content {
            position: relative;
            height: 62px;
            line-height: 62px;
            border-bottom: 1px solid #3b4d5a;
          }
        }
        //点击之后的节点子集
        .is-current {
          background-color: #272f30;
        }
        // 失去焦点的时候
        .el-tree-node:focus > .el-tree-node__content {
          background-color: #272f30;
        }
        .el-tree-node__content:hover {
          background-color: #333a3c;
          // background-color: red;
        }
        .el-tree-node__content:hover .buildIconWrapper {
          background-color: #333a3c;
          // background-color: red;
        }
        // 点击之后的node背景
        .el-tree-node.is-current > .el-tree-node__content {
          background-color: #2c4355;
        }
        .el-tree-node.is-current > .el-tree-node__content .buildIconWrapper {
          background-color: #2c4355;
        }
      }
    }
    // .treeMask {
    //   width: 100%;
    //   // height: 100%;
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   overflow: hidden;
    //   z-index: 1;
    //   div {
    //     width: 100%;
    //     height: 1px;
    //     outline: red solid 42px;
    //   }
    //   .grid:nth-child(2n) {
    //     background-color: rgba(45, 69, 85, 0.5);
    //     // display: none;
    //     // position: relative;
    //      width: 100%;
    //     height: 1px;
    //     outline: #fff solid 42px;
    //   }
    // }
  }
  .structureTabContainer::-webkit-scrollbar {
    width: 4px;
    display: none;
  }
  .structureTabContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
    //    box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
  }
  .structureTabContainer::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>