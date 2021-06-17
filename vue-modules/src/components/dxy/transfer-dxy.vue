<template>
  <div class="transfer">
    <div class="left-box">
      <div class="title">
        <dCheckbox v-model="leftCheckAll" :data="titles[0]" @change="handleLeftCheckAllChange"></dCheckbox>
      </div>
      <div class="content">
        <p v-for="(item,index) in leftData" :key="index" class="check">
          <dCheckbox v-model="item.check" @change="leftSelect(arguments, index)" />
          <span @dblclick="toRightOwn(index)">{{item.label}}</span>
        </p>
      </div>
    </div>
    <div class="btn-box">
      <div class="tool">
        <el-button
          :disabled="!rightChecked||rightChecked.length==0"
          type="primary"
          size="medium"
          icon="el-icon-arrow-left"
          circle
          @click="toLeft"
        ></el-button>
      </div>
      <div class="tool">
        <el-button
          :disabled="!leftChecked||leftChecked.length==0"
          type="primary"
          size="medium"
          icon="el-icon-arrow-right"
          circle
          @click="toRight"
        ></el-button>
      </div>
    </div>
    <div class="right-box">
      <div class="title">
        <dCheckbox
          v-model="rightCheckAll"
          :data="titles[1]"
          @change="handleRightCheckAllChange"
          :disabled="!rightData || rightData.length == 0"
        ></dCheckbox>
      </div>
      <div class="content">
        <p v-for="(item,index) in rightData" :key="index" class="check">
          <dCheckbox v-model="item.check" @change="rightSelect(arguments,index)" />
          <span @dblclick="toLeftOwn(index)">{{item.label}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import dCheckbox from "./checkbox-dxy";
export default {
  components: { dCheckbox },
  name: "DxyTransfer",
  props: {
    // 总数据
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    // 已选择数据（右侧数据）
    value: {
      type: [String, Array],
      default() {
        return [];
      }
    },
    // 两侧标题名称
    titles: { type: Array, default: () => ["标题1", "标题2"] },
    // 数据属性重命名
    props: {
      type: Object,
      default: () => {
        return { key: "key", label: "label" };
      }
    }
  },
  data() {
    return {
      leftCheckAll: false,
      rightCheckAll: false,
      // leftChecked: [],
      // rightChecked: [],
      leftData: [],
      rightData: []
    };
  },
  watch: {
    data: {
      // immediate: true,
      handler: function() {
        this.value = this.value;
      }
    },
    value: {
      immediate: true,
      handler: function() {
        this.initData();
      }
    }
  },
  computed: {
    valueKey() {
      let result = [];
      if (Array.isArray(this.value)) {
        result = this.value;
      } else if (typeof this.value == "string") {
        result = JSON.parse(this.value);
      }
      return result;
    },
    leftChecked() {
      return this.leftData.filter(item => item.check);
    },
    rightChecked() {
      return this.rightData.filter(item => item.check);
    }
  },
  methods: {
    // 数据处理
    initData() {
      let result = [];
      result = this.data.map(item => {
        return {
          label: item[this.props.label],
          key: item[this.props.key],
          check: false
        };
      });
      this.leftData = result.filter(
        item => this.valueKey.indexOf(item.key) === -1
      );
      this.rightData = result.filter(
        item => this.valueKey.indexOf(item.key) !== -1
      );
    },
    // 穿梭框中间按钮向左
    toLeft() {
      this.rightCheckAll = false;
      let result = this.rightChecked.map(item => item.key);
      result = this.valueKey.filter(item => {
        return result.indexOf(item) === -1;
      });
      this.$emit("input", result);
      this.$forceUpdate;
    },
    // 穿梭框中间按钮向右
    toRight() {
      this.leftCheckAll = false;
      let result = this.leftChecked.map(item => item.key);
      result = [...this.valueKey, ...result];
      this.$emit("input", result);
    },
    // 双击左侧
    toRightOwn(i) {
      this.valueKey.push(this.leftData[i].key);
      this.$emit("input", this.valueKey);
    },
    // 双击右侧
    toLeftOwn(i) {
      let result = this.valueKey.filter(item => {
        return item !== this.rightData[i].key;
      });
      this.$emit("input", result);
    },
    // 点击左侧多选
    leftSelect(arg, i) {
      this.$set(this.leftData[i], "check", arg[0]);
    },
    // 点击右侧多选
    rightSelect(arg, i) {
      this.$set(this.rightData[i], "check", arg[0]);
    },
    // 左侧全选
    handleLeftCheckAllChange(val) {
      if (val) {
        this.leftData.forEach((item, i) => {
          this.$set(this.leftData[i], "check", true);
        });
      } else {
        this.leftData.forEach((item, i) => {
          this.$set(this.leftData[i], "check", false);
        });
      }
    },
    // 右侧全选
    handleRightCheckAllChange(val) {
      if (val) {
        this.rightData.forEach((item, i) => {
          this.$set(this.rightData[i], "check", true);
        });
      } else {
        this.rightData.forEach((item, i) => {
          this.$set(this.rightData[i], "check", false);
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.transfer {
  height: 100%;
  .left-box,
  .right-box {
    vertical-align: middle;
    box-sizing: border-box;
    display: inline-block;
    width: calc(50% - 30px);
    border: 1px solid #ebeef5;
    border-radius: 5px;
    height: 100%;
    .title {
      vertical-align: top;
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 15px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    .content {
      // margin-top: -40px;
      // padding-top: 40px;
      height: calc(100% - 40px);
      overflow-y: auto;
      padding-left: 15px;
      .check {
        cursor: pointer;
        padding-right: 10px;
        .checkbox {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          border: 1px solid #dcdfe6;
          border-radius: 2px;
          &:hover {
            border-color: #409eff;
          }
        }
        span {
          user-select: none;
        }
      }
    }
  }
  .btn-box {
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    text-align: center;
    .tool {
      margin: 10px 0;
    }
  }
}
</style>