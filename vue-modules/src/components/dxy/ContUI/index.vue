<template>
  <div>
    <button type="text" class="endbtn">
      {{ content }}
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Cont',
  data: function () {
    return {
      content: '发送校验码', // 按钮文字
      canClick: true, // 按钮是否可以点击
      totalTime: this.totalTimeProp // 60s倒计时
    };
  },
  props: {
    // 倒计时
    totalTimeProp: {
      type: Number,
      default: 60
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val){
      if (val){
        this.totalTime = 60;
        this.runtimer();
      } else {
        this.clearTimer();
      }
    }
  },
  methods: {
    runtimer() {
      if (!this.canClick) return;
      this.canClick = false;
      this.content = this.totalTime + 's后重新发送';
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + 's后重新发送';
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          if (this.value){
            this.content = '重新发送验证码';
          } else {
            this.content = '发送校验码';
          }
          this.totalTime = 60;
          this.canClick = true; // 这里重新开启
          this.$emit('input', false);
        }
      }, 1000);
      //   请求验证码的接口
      //   let res = await loginService.SendEmailCode();
    },
    // 关闭定时器
    clearTimer() {
      this.totalTime = 0;
      // window.clearInterval(clock);
      // this.content = '发送校验码';
      // this.totalTime = 60;
      // this.canClick = true;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "style.less";
</style>
