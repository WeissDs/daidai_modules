<template>
  <treeselect
    class="tree-select"
    v-model="data"
    :options="treeData"
    placeholder="请选择单位"
    :max-height="250"
    :normalizer="normalizer"
    noOptionsText="暂无数据"
    :default-expand-level="1"
    @select="changeSelect"
    @input="changeInput"
    @close="changeInput"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "ElTreeSelect",
  props: {
    prop: String,
    form: Object,
    value: [String, Object, Array],
    url: String,
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    Treeselect
  },
  watch: {
    data() {
      let result = {};
      if (this.data) {
        result = {
          dwbm: this.dwbm,
          dwmc: this.label,
          bbjb: this.contain,
          key: this.data,
          fdwbm: this.fdwbm
        };
      } else {
        result = {
          dwbm: sessionStorage.getItem("dwbm"),
          dwmc: this.label,
          bbjb: this.contain,
          key: sessionStorage.getItem("key"),
          fdwbm: sessionStorage.getItem("fdwbm")
        };
      }
      if (this.init) {
        this.init = false;
      } else {
        this.$emit("changeDw", result);
      }
      this.$emit("input", this.data);
    },
    options() {
      this.$set(this, "treeData", this.options);
    },
    value() {
      this.$set(this, "data", this.value);
    }
  },
  data() {
    return {
      loading: false,
      data: null,
      init: true,
      normalizer(node) {
        return {
          id: node.key
        };
      },
      treeData: [],
      label: "",
      contain: 0,
      dwbm: "",
      fdwbm: ""
    };
  },
  methods: {
    changeSelect(node, instanceId) {
      // console.log(node.data);
      this.contain = node.data.contain;
      this.label = node.label;
      this.dwbm = node.data.dwbm;
      this.fdwbm = node.data.fdwbm;
    },
    changeInput() {
      this.$nextTick(() => {
        if (this.form) {
          this.form.validateField(this.prop);
        }
      });
    },
    initValue() {
      let result = [];
      if (sessionStorage.getItem("dwbm")) {
        this.dwbm = sessionStorage.getItem("dwbm");
        this.label = sessionStorage.getItem("dwmc");
        this.contain = sessionStorage.getItem("bbjb");
        this.data = sessionStorage.getItem("key");
        this.fdwbm = sessionStorage.getItem("fdwbm");
      } else {
        this.data = this.treeData[0].key;
        this.label = this.treeData[0].label;
        this.dwbm = this.treeData[0].value;
        this.fdwbm = this.treeData[0].data.fdwbm;
      }
      result = {
        dwbm: this.dwbm,
        dwmc: this.label,
        bbjb: this.contain,
        key: this.data,
        fdwbm: this.fdwbm
      };
      this.$emit("changeDw", result, this.init);
    },
    loadOptions() {
      // this.treeData = this.params.dwbm;
      if (this.url) {
        this.loading = true;
        Ajax.post(this.url, this.params).then(res => {
          const reduce = data => {
            data.forEach(item => {
              if (item.children && item.children.length > 0) {
                reduce(item.children);
              } else {
                delete item["children"];
              }
            });
          };
          reduce(res.data);
          // res.data[0].key = "111";
          // console.log(res.data);
          this.treeData = res.data;
          this.loading = false;
          this.initValue();
        });
      } else {
        this.$set(this, "treeData", this.options);
        this.$set(this, "data", this.value);
        this.label = "湖北省院";
        this.$emit(
          "changeDw",
          { dwbm: this.data, dwmc: this.label },
          this.init
        );
      }
    }
  },
  mounted() {
    this.loadOptions();
  }
};
</script>

<style lang='scss' >
.tree-select {
  .el-loading-spinner {
    margin-top: -15px;
  }
}
.vue-treeselect__option {
  padding-top: 3px;
  padding-bottom: 3px;
}
.vue-treeselect__single-value {
  line-height: 40px;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.vue-treeselect__input-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
  input {
    vertical-align: top;
  }
}
.vue-treeselect__placeholder {
  line-height: 40px;
  padding-left: 0px;
}
.vue-treeselect__control,
.vue-treeselect {
  line-height: 40px;
  height: 40px;
}
.vue-treeselect__control {
  padding: 0 15px;
}
.is-error {
  .vue-treeselect__control {
    border-color: #f56c6c;
  }
}
</style>