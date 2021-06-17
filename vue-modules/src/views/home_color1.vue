<template>
  <div class="home-page">
    <ul class="dxy-tab">
      <li class="active" index="./module">组件</li>
      <li index="./page">页面</li>
      <li index="./font">字体</li>
    </ul>
    <div class="main">
      <el-card>
        <div slot="header" class="title">
          <span>穿梭框</span>
        </div>
        <TransferDXY
          :data="transferData"
          v-model="transferValue"
          :titles="transferTitle"
          style="height:280px"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.home-page {
  .main {
    width: 1140px;
    margin: 40px auto 0;
  }
}
// card样式
.title {
  position: relative;
  span {
    padding-left: 26px;
    &::before {
      content: "";
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #ff982e;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.dxy-tab {
  // background-image: linear-gradient(#ffffff47, #ffffffa1);
  // background: #e7e9e8;
  // height: 200px;
  padding: 100px 400px 0;
  display: flex;
  justify-content: flex-end;
  li {
    font-size: 18px;
    font-weight: bold;
    user-select: none;
    height: 60px;
    color: #1d5037;
    // color: #046164;
    text-align: center;
    line-height: 60px;
    margin: 0 20px;
    position: relative;
    &:hover {
      color: #000;
    }
    &.active {
      border-bottom: 4px solid #1d5037;
      // &::before {
      //   content: "";
      //   height: 10px;
      //   background: #1d5037;
      //   width: 100%;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      // }
    }
  }
}
</style>