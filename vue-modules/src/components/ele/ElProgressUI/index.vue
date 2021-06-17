<template>
  <div class="progress-box">
    <p
      v-if="title.lineName"
      class="title2"
      :style="{fontSize:title.size,top:title.top}"
    >{{title.lineName}}</p>
    <el-progress
      class="main"
      :class="{line:title.lineName}"
      :type="typeData"
      :percentage="data"
      :width="width?width:200"
      :stroke-width="8"
      :color="color"
      stroke-linecap="round"
    ></el-progress>
    <p v-if="title.name" class="title" :style="{fontSize:title.size,top:title.top}">{{title.name}}</p>
    <p
      v-if="title.circleName"
      class="title1"
      :style="{fontSize:title.size,top:title.top}"
    >{{title.circleName}}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: [String, Number],
    typeData: {
      type: String
    },
    color: [String, Array],
    width: Number,
    title: {
      type: Object,
      default: function() {
        return {
          name: "",
          size: "",
          circleName: "",
          top: ""
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.el-progress__text {
  color: #9dbeff;
}
.progress-box {
  position: relative;
  text-align: center;
  display: flex;
}
.main {
  margin: 0 auto;
  &.line {
    flex: 1;
    align-items: center;
    padding-right: 20px;
  }
}
.title {
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 72%;
  border: 1px solid #3058f7;
  padding: 2% 4%;
  border-radius: 4px;
  white-space: nowrap;
  transform: translateX(-50%);
}
.title1 {
  position: absolute;
  left: 50%;
  top: 84%;
  transform: translateX(-50%);
  white-space: nowrap;
  &,
  + el-progress-circle {
    .el-progress__text {
      top: 31%;
    }
  }
}
.title2 {
  padding: 0 20px;
  margin-top: -6px;
}
</style>