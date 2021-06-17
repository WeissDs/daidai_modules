<template>
  <div class="login">
    <div class="login-box animated bounceInDown">
      <div class="left">
        <img src="../assets/login_bg_center.png" alt />
      </div>
      <div class="right">
        <div class="login-title">欢迎登录案件分配管理系统</div>
        <div class="login-form">
          <el-form
            :model="form"
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            label-position="left"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="account">
              <el-input v-model="form.account" placeholder="请输入用户名" autofocus="true"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                :type="viewVisible?'text':'password'"
                placeholder="请输入密码"
                autocomplete="off"
                @keyup.enter.native="login"
              >
                <i
                  slot="suffix"
                  class="el-input__icon pwd-visible"
                  :class="viewVisible?'el-icon-unlock':'el-icon-lock'"
                  :style="viewVisible?{color:'#2f89ff'}:{}"
                  @mousedown="changeViewVisible(true)"
                  @mouseup="changeViewVisible(false)"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-btn">
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      viewVisible: false,
      form: {}
    };
  },
  computed: {
    rules() {
      return {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ]
      };
    },
    ...mapState({
      isLogin: state => state.login.isLogin
    })
  },
  methods: {
    changeViewVisible(visible) {
      this.viewVisible = visible;
    },
    login() {
      console.log(this.$store.state.login.isLogin);
      this.$store.state.login.isLogin = false;
      setTimeout(() => {
        this.$store.state.login.isLogin = "300";
        alert(this.isLogin);
      }, 600);
      alert(this.isLogin);
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.$store.dispatch("account/login", this.form).then(
      //       res => {
      //         this.$message({
      //           showClose: true,
      //           message: "登录成功",
      //           type: "success"
      //         });
      //         this.$router.push("/");
      //       },
      //       err => {}
      //     );
      //   } else {
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
  background: url(../assets/login_bg.png);
  background-size: cover;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .pwd-visible {
    cursor: pointer;
    user-select: none;
    font-size: 18px;
  }
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  .bounceInDown {
    animation-name: bounceInDown;
  }

  @-webkit-keyframes bounceInDown {
    0%,
    60%,
    75%,
    90%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes bounceInDown {
    0%,
    60%,
    75%,
    90%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }

  .login-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    width: 1160px;
    height: 542px;
    box-shadow: 0 5px 12px #2068a2;
    .left {
      display: block;
      width: 679px;
      height: 542px;
      text-align: center;
      line-height: 542px;
      background-color: #2580f8;
      font-size: 0;
    }
    .right {
      width: 481px;
      height: 542px;
      background-color: #fff;
      .login-title {
        height: 150px;
        font-size: 36px;
        text-align: center;
        line-height: 150px;
      }
      .login-form {
        box-sizing: border-box;
        padding: 20px 80px 0 80px;
      }
      .login-btn {
        box-sizing: border-box;
        padding: 10px 80px;
      }
    }
  }
}
</style>