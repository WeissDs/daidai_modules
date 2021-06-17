<template>
  <ul class="btn" :class="{column:column}">
    <li
      :class="{active: item.path == curActive}"
      v-for="(item,index) in data"
      :key="index"
      @click="changeView(item, $event)"
    >{{item.name}}</li>
    <!-- <li class="active" index="./module" @click="changeView($event)">组件</li>
    <li index="./page" @click="changeView($event)">页面</li>
    <li index="./font" @click="changeView($event)">字体</li>-->
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [
          { name: "选项一", path: "/" },
          { name: "选项二", path: "/1" },
          { name: "选项三", path: "/2" }
        ];
      }
    },
    active: {
      type: String,
      default: "/"
    },
    column: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curActive: this.active
    };
  },
  watch: {
    curActive: {
      immediate: true,
      handler() {
        // this.$router.push(this.curActive);
        this.$router.push({ name: this.curActive });
      }
    }
  },
  methods: {
    changeView(item, event) {
      this.curActive = item.path;
      this.$emit("change", item, event);
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.btn {
  display: flex;
  &.column {
    flex-direction: column;
  }
  // justify-content: flex-end;
  li {
    font-size: 16px;
    font-weight: bold;
    user-select: none;
    height: 60px;
    // color: #409eff;
    color: #77899c;
    text-align: center;
    line-height: 60px;
    margin: 0 20px;
    position: relative;
    &:hover {
      color: #000;
    }
    &.active {
      // border-bottom: 2px solid #409eff;
      border-bottom: 2px solid #c2ceda;
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