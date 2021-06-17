<template>
  <el-tabs v-model="tabVal" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="(item,index) in data" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    data: Array,
    value: String
  },
  data() {
    return {
      tabVal: ""
    };
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.tabVal = this.value && JSON.parse(JSON.stringify(this.value));
      }
    }
  },
  computed: {},
  methods: {
    handleClick(tab, event) {
      // this.tabVal = tab.name;
      this.$emit("click", tab, event);
      this.$emit("input", this.tabVal);
    },
    fn() {
      this.value = 1;
    }
  },
  mounted() {
    this.tabVal = this.value && JSON.parse(JSON.stringify(this.value));
  }
};
</script>

<style lang='scss' scoped>
// 分页
::v-deep {
  .el-tabs__nav-wrap::after {
    background-color: #00a4fc;
  }
  .el-tabs__header {
    border-bottom: 1px solid #409eff;
    margin: none !important;
  }
  .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #409eff;
  }
  .el-tabs__header .el-tabs__nav {
    border: 1px solid #409eff;
  }
  .el-tabs__header .el-tabs__item {
    border-left: 1px solid #409eff;
  }
  .el-tabs__item {
    font-size: 16px;
    color: #ffffff;
  }
  .el-tabs__content {
    height: calc(100% - 60px);
  }
  .el-tab-pane {
    // height: 100%;
  }
  .el-tabs__item.is-active {
    background: #409eff;
    color: #ffffff;
  }
}
</style>