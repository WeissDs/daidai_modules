

<template>
  <label style="display:inline-block;" class="checkbox-dxy">
    <span class="checkbox" @click="handleChange" :class="[{'checked':check},{'disabled':disabled}]"></span>
    <span class="txt" :class="{'checked':check}" v-if="data">{{this.data}}</span>
  </label>
</template>

<script>
export default {
  props: {
    data: String,
    value: null,
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      ownCheck: false
    };
  },
  computed: {
    check: {
      get() {
        return this.value !== undefined ? this.value : this.ownCheck;
      },
      set(val) {
        this.ownCheck = val;
        this.$emit("input", val);
        this.$emit("change", val);
      }
    }
  },
  methods: {
    handleChange() {
      if (this.disabled) return false;
      this.check = !this.check;
    }
  },
  mounted() {
    // console.log(this.value);
  }
};
</script>

<style lang='scss' scoped>
.checkbox-dxy {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  // cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 30px;
}
.checkbox {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 14px;
  height: 14px;
  font-size: 0;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    border-color: #409eff;
  }
  &.checked {
    background-color: #409eff;
    border: #409eff;
    &::after {
      transform: rotate(45deg) scaleY(1);
    }
  }
  &.disabled {
    background-color: #edf2fc;
    border-color: #dcdfe6;
    cursor: not-allowed;
    &:hover {
      border-color: #dcdfe6;
    }
  }
  &::after {
    box-sizing: content-box;
    content: "";
    border: 1px solid rgb(255, 255, 255);
    border-left: 0;
    border-top: 0;
    height: 7px;
    width: 3px;
    left: 5px;
    top: 2px;
    position: absolute;
    transform: rotate(45deg) scaleY(0);
    transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
    transform-origin: center;
  }
}
.txt {
  color: #606266;
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  user-select: none;
  &.checked {
    color: #409eff;
  }
  &.disabled {
    color: rgb(139, 139, 139);
  }
}
</style>