<template>
  <div class="pf-date-select">
    <el-radio-group
      v-model="radio1"
      size="small"
      style="margin-right:20px;"
      v-if="hasBtn"
      @change="getshortcuts"
    >
      <el-radio-button label="本年"></el-radio-button>
      <el-radio-button label="本季"></el-radio-button>
      <el-radio-button label="本月"></el-radio-button>
    </el-radio-group>
    <p>{{txt? txt: '自定义：'}}</p>
    <el-date-picker
      v-model="value"
      type="monthrange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      size="small"
      @change="dateChange"
      value-format="yyyy-MM"
      :picker-options="pickerOption1"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    hasBtn: {
      type: Boolean,
      default: true
    },
    txt: String
  },
  data() {
    return {
      value: [],
      radio1: "",
      pickerOption1: {
        disabledDate(time) {
          // return true;

          return time.getTime() > Date.now() - 8.64e6;
        }
      }
    };
  },
  computed: {
    nowRadio() {
      let startY = this.$date(
        new Date().getFullYear() + "-" + 1 + "-" + 1,
        "yyyy-MM"
      );
      let startQ = "";
      if (new Date().getMonth() > 1) {
        startQ = this.$date(
          new Date().getFullYear() +
            "-" +
            (new Date().getMonth() - 1) +
            "-" +
            1,
          "yyyy-MM"
        );
      } else {
        startQ = this.$date(
          new Date().getFullYear() -
            1 +
            "-" +
            (new Date().getMonth() - 1) +
            "-" +
            1,
          "yyyy-MM"
        );
      }
      let startM = this.$date(
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + 1,
        "yyyy-MM"
      );
      if (this.value[1] == this.$date(new Date(), "yyyy-MM")) {
        if (this.value[0] == startY) {
          // console.log(this.value);
          return "本年";
        } else if (this.value[0] == startQ) {
          return "本季";
        } else if (this.value[0] == startM) {
          return "本月";
        }
      }
    }
  },
  watch: {
    nowRadio: function() {
      if (this.nowRadio) {
        this.$nextTick(function() {
          this.radio1 = this.nowRadio;
        });
      }
    }
  },
  methods: {
    dateChange(date) {
      if (date) {
        this.$emit("dateChange", date);
        this.radio1 = "";
      }
    },
    getshortcuts() {
      let end = this.$date(new Date(), "yyyy-MM");
      let start = new Date();
      switch (this.radio1) {
        case "本年":
          start = this.$date(
            start.getFullYear() + "-" + 1 + "-" + 1,
            "yyyy-MM"
          );
          break;
        case "本季":
          if (start.getMonth() > 1) {
            start = this.$date(
              start.getFullYear() + "-" + (start.getMonth() - 1) + "-" + 1,
              "yyyy-MM"
            );
          } else {
            start = this.$date(
              start.getFullYear() - 1 + "-" + (start.getMonth() - 1) + "-" + 1,
              "yyyy-MM"
            );
          }

          break;
        case "本月":
          // start = date(start.setTime(start.getTime() - 1000 * 3600 * 24 * 30));
          start = this.$date(
            start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + 1,
            "yyyy-MM"
          );

          break;
        case "本日":
          start = this.$date(start, "yyyy-MM");
          break;
      }
      this.value = [start, end];
      this.$emit("dateChange", this.value);
    }
  },
  mounted() {
    this.value = sessionStorage.getItem("starTime")
      ? [sessionStorage.getItem("starTime"), sessionStorage.getItem("endTime")]
      : [
          this.$date(new Date(new Date().getFullYear() + "-" + 1), "yyyy-MM"),
          this.$date(new Date(), "yyyy-MM")
        ];
    this.$emit("dateChange", this.value, true);
  }
};
</script>

<style lang='scss'>
.el-date-editor .el-range-separator {
  width: 8%;
}
.pf-date-select {
  display: flex;
  align-items: center;
}

// 颜色修改
// 快速选择
.el-radio-button__inner {
  background: #030f16;
  color: #ffffff;
}
// 快速选择时间
.el-radio-button--small .el-radio-button__inner {
  padding: 7px 16px;
  font-size: 16px;
}
// 时间选择
.pf-date-select {
  .el-date-editor .el-range-separator {
    padding: 0;
  }
  .el-range-editor--small .el-range-input {
    background-color: #030f16;
    font-size: 18px;
  }
  .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator {
    color: #fff;
  }
  .el-date-editor .el-range-input {
    color: #fff;
  }
  .el-input__inner {
    background-color: #030f16;
    border: 1px solid #fff;
  }
  .el-range-editor--small.el-input__inner {
    width: 300px;
  }
  .el-range-editor.el-input__inner {
    padding: 3px 0 3px 10px;
  }
}
.el-month-table td.disabled .cell {
  background-color: #76767685;
}

// 外部生成选择框（可能影响其他组件样式）
.el-picker-panel {
  background-color: #030f1696;
  color: #fff;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  top: 0;
}
.el-picker-panel *[slot="sidebar"],
.el-picker-panel__sidebar {
  background-color: #030f16;
}
.el-date-table td.in-range div {
  background-color: #030f16;
}
.el-picker-panel__shortcut,
.el-picker-panel__icon-btn,
.el-date-table th {
  color: #fff;
}
.el-date-table td:hover span {
  color: #3058f7;
}
.el-picker-panel__shortcut:hover {
  color: #3058f7;
}
.el-date-table td.start-date span,
.el-date-table td.end-date span {
  background-color: #000;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #5d5e60;
}
</style>