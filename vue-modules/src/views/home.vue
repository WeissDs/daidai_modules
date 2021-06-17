<template>
  <div class="home-page">
    <div class="dxy-tab" v-if="showTop">
      <div>
        <span class="logo">VUE栈组件{{menuPath}}={{topMenuPath}}=={{$route.meta}}</span>
        <menuDXY
          :data="menuData"
          :active="menuPath"
          @change="topMenuChange"
          style="justify-content: flex-end;"
        ></menuDXY>
      </div>
    </div>
    <div class="bg-img">
      <div>
        <img src="../assets/images/undraw_content_team_3epn.svg" alt />
      </div>
    </div>

    <div class="main">
      <menuDXY
        class="left-menu"
        :class="{fixed:fixedLeftMenu}"
        :data="leftMenuData"
        :active="menuPath"
        :column="true"
      ></menuDXY>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTop: true,
      fixedLeftMenu: false,
      // top栏
      menuData: [
        { name: "组件", path: "module" },
        { name: "页面", path: "page" },
        { name: "字体", path: "font" }
      ],
      //侧边栏
      leftMenuData: [
        { name: "自己写的组件", path: "module" },
        { name: "依赖element封装的组件", path: "cmp-element" },
        { name: "依赖echarts封装的组件", path: "cmp-echart" }
      ],
      // 使用路由的path为初始化值，刷新页面保留本页位置
      menuPath: this.$route.name,
      // 用来记录top的path 用来做左侧菜单leftMenuData的切换
      topMenuPath: this.$route.name
    };
  },
  watch: {
    // 监听路由切换，保证menuPath当前值正确（否则切换后menuPath还是为第一次进入的路由）
    $route() {
      this.menuPath = this.$route.name;
    }
  },
  methods: {
    topMenuChange(data) {
      console.log(data);
      this.topMenuPath = data.path;
    }
  },
  mounted() {
    let that = this;
    window.onscroll = function() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // top导航栏在下拉到一定位置消失
      if (scrollTop && scrollTop > 335) {
        that.showTop = false;
      } else {
        that.showTop = true;
      }
      // 左侧导航栏在下拉到一定位置给固定定位
      if (scrollTop && scrollTop > 430) {
        that.fixedLeftMenu = true;
      } else {
        that.fixedLeftMenu = false;
      }
    };
  }
};
</script>

<style lang='scss' scoped>
.home-page {
  .main {
    width: 1140px;
    margin: 40px auto 0;
    // display: flex;
    .view {
      // flex: 1;
      // width: 0;
      width: calc(100% - 300px);
      float: right;
    }
  }
  .bg-img {
    background: #bee4ff;
    margin-top: 70px;
    & > div {
      width: 1140px;
      margin: 0 auto;
      background: url("../assets/images/top.png") no-repeat;
    }
    img {
      width: 400px;
      padding: 70px 0 0;
    }
  }
}

.dxy-tab {
  position: fixed;
  top: 0;
  background-image: linear-gradient(#ffffffb3, #ffffff);
  width: 100%;
  height: 60px;
  margin: 0 auto;
  & > div {
    width: 1140px;
    margin: 0 auto;

    .logo {
      font-size: 20px;
      float: left;
      color: #304e6d;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
    }
  }
}

.left-menu {
  width: 280px;
  margin-right: 20px;
  height: 600px;
  overflow-y: auto;
  float: left;
  border: 1px solid #409eff;
  background-color: #e2fff8;
  &.fixed {
    position: fixed;
    top: 40px;
    top: 0;
  }
}
</style>