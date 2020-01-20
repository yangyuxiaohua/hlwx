<template>
  <div class="login">
    <!-- 登录表单 -->
    <el-form
      :model="loginForm"
      :rules="rules"
      size="small"
      status-icon
      ref="loginForm"
      class="login-form"
    >
      <div class="title">
        <h1>系统登录</h1>
      </div>
      <!-- 账号 -->
      <el-form-item prop="account">
        <el-input
          v-model="loginForm.account"
          prefix-icon="iconfont icon-zhanghao"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          @click.native="changeType"
          v-model="loginForm.password"
          :suffix-icon="isOpen ? 'iconfont icon-yanjing-zheng' : 'iconfont icon-yanjing_bi'"
          prefix-icon="iconfont icon-mima"
          :type="isOpen ? 'text' : 'password'"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入工具函数
// import { pwdReg } from "../utils/reg";

// 引入本地存储工具函数
// import {setToken} from "@/utils/local";

// 引入请求接口的函数
// import { checkLogin } from "@/api/account";
// import { async } from "q";

export default {
  data() {
    // 自定义验证密码
    const validatePwd = (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!rule.pattern.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
      } else {
        callback();
      }
    };

    return {
      // 登录表单
      loginForm: {
        account: "",
        password: ""
      },
      //  眼睛状态
      isOpen: false,
      //   验证规则
      rules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "账号长度 3 ~ 6 位", trigger: "blur" } // 长度
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "密码长度 3 ~ 6 位", trigger: "blur" }, // 长度
          {
            validator: validatePwd,
            // pattern: pwdReg(),
            trigger: "blur"
          }
        ]
      }
    };
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
    //   let acc = this.username;
    //   let pwd = this.pwd;
    //   // console.log(this.username,this.pwd)
    //   if (this.flag) {
    //     login(acc, pwd)
    //       .then(res => {
    //         if (res.data.code === "ok") {
    //           //拿到token存入本地
    //           local.set('token',res.data.token)
    //           localStorage.username = acc;
    //           localStorage.avartar = res.data.data[0].avatarUrl;
    //           localStorage.userGroup = res.data.data[0].userGroup;
    //           this.$router.history.push("/index/account/addAccount");
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //     setTimeout(() => {
    //       this.flag = true;
    //     }, 3000);
    //     this.flag = false;
    //   }
    this.$router.history.push('/index')
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
    }
  }
}
</style>