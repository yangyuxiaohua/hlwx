<template>
  <div class="login">
    <!-- 登录表单 -->
    <el-form :model="loginForm" :rules="rules" size="small" status-icon ref="loginForm" class="login-form">
      <div class="title">
        <h1>系统登录</h1>
      </div>
      <!-- 账号 -->
      <el-form-item prop="phone" label="账号">
        <el-input v-model="loginForm.phone" prefix-icon="iconfont icon-zhanghao" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password" label="密码">
        <el-input @click.native="changeType" v-model="loginForm.password" :suffix-icon="isOpen ? 'iconfont icon-yanjing-zheng' : 'iconfont icon-yanjing_bi'" prefix-icon="iconfont icon-mima" :type="isOpen ? 'text' : 'password'" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 系统 -->
      <el-form-item label="系统" prop="system">
        <el-select v-model="loginForm.system" placeholder="请选择系统">
          <el-option label="预警系统" value="1"></el-option>
          <el-option label="平台系统" value="50"></el-option>
        </el-select>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入本地存储工具函数
// import { setSid } from "@/utils/local";
// 引入请求接口的函数
import { login, getUserInfor } from "@/apis/login";
import { Message } from "element-ui";
import { setKey } from "@/utils/local";
export default {
  data() {
    return {
      loginFlag: true, //防抖
      // 登录表单
      loginForm: {
        phone: "",
        password: "",
        system: ""
      },
      //  眼睛状态
      isOpen: false,
      //   验证规则
      rules: {
        phone: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "账号长度 3 ~ 6 位", trigger: "blur" } // 长度
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "密码长度 3 ~ 6 位", trigger: "blur" } // 长度
        ],
        system: [{ required: true, message: "请选择系统", trigger: "blur" }]
      }
    };
  },
  created() {
    // 监听登录enter键
    // var _self = this;
    // document.onkeydown = function() {
    //   var key = window.event.keyCode;
    //   if (key == 13 || key == 100) {
    //     _self.submitForm();
    //   }
    // };
  },
  methods: {
    //  切换眼睛开和闭
    changeType(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    },

    // 登录
    submitForm() {
      console.log(this.loginForm);
      if (this.loginFlag) {
        login(this.loginForm)
          .then(res => {
            // console.log("直接拿到的数据", res);
            if (res.httpStatus === 200) {
              sessionStorage.sid = res.result;
              // 获取用户详情
              getUserInfor()
                .then(res => {
                  // console.log(res);
                  if (res.httpStatus == 200) {
                    setKey("userInfor", res.result);
                    this.$router.history.push("/index/home");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              Message.error("网络请求发生错误，请稍后再试");
            }
          })
          .catch(err => {
            console.log(err);
            Message.error("网络请求发生错误，请稍后再试");
          });
        setTimeout(() => {
          this.loginFlag = true;
        }, 3000);
        this.loginFlag = false;
      }
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 400px;
    .title {
      margin-bottom: 30px;
      h1 {
        font-size: 26px;
        font-weight: 700;
        text-align: center;
        color: #fff;
      }
    }
    .el-form-item {
      .el-input {
        border: none;
        input {
          background-color: #283443;
          border: none;
          color: #fff;
        }
      }
      .el-button {
        width: 100%;
      }
      .choseSystem {
        color: #f56c6c;
        margin-left: 20px;
      }
    }
  }
}
</style>