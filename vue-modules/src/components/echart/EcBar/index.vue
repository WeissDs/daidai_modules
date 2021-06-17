<template>
  <div ref="bar" :id="id" style="width:100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    value: {
      type: Array,
      default: function() {
        return [120, 200, 150, 80, 70, 110, 300];
      }
    },
    xAxis: {
      type: Array,
      default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    // value: {
    //   type: Array,
    //   default: [120, 200, 150, 80, 70, 110, 300]
    // },
    // value2: {
    //   type: Array
    //   // default: []
    // },
    italic: {
      type: String,
      default: "0"
    },
    width: {
      type: String,
      default: "20"
    },
    color: {
      type: Array,
      default() {
        // return ["#ff4070", "#188df0", "#188df0"];
        // return ["#188df0", "#188df0", "#188df0"];
        // return ["#7bf9ff", "#3058f7", "#3058f7"];
        // return [
        //   "#3058f7",
        //   "#3058f7",
        //   "#3058f7",
        //   "#00a4fc",
        //   "#00a4fc",
        //   "#00a4fc"
        // ];
        // return [
        //   "#223da9",
        //   "#223da9",
        //   "#223da9",
        //   "#00a4fc",
        //   "#00a4fc",
        //   "#00a4fc",
        //   "#e5247f",
        //   "#e5247f",
        //   "#e5247f",
        //   "#616161",
        //   "#616161",
        //   "#616161",
        //   "#efefef",
        //   "#efefef",
        //   "#efefef"
        // ];
        return [
          "#1e3382",
          "#1e3382",
          "#1e3382",
          "#b03963",
          "#b03963",
          "#b03963",
          "#a4c9ff",
          "#a4c9ff",
          "#a4c9ff",
          "#ffc446",
          "#ffc446",
          "#ffc446",
          "#fefefe",
          "#fefefe",
          "#fefefe",
          "#1e3382",
          "#1e3382",
          "#1e3382"
        ];
      }
    },
    legend: {
      type: Array
    },
    offset: 0
  },
  data() {
    return {
      echartsBarInstance: null,
      id: "echarts-bar-" + new Date() + (Math.random() * 1000).toFixed(0) + ""
    };
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.setOptionBar();
      }
    },
    legend() {
      this.setOptionBar();
    },
    sideBar() {
      setTimeout(() => {
        this.echartsBarInstance.resize();
      }, 1000);
    }
  },
  computed: {
    optionBar: function() {
      return {
        grid: {
          left: "4%",
          right: "4%",
          bottom: "2%",
          top: "14%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: this.legend,
          textStyle: {
            color: "#fff",
            fontSize: 15
          }
        },
        xAxis: {
          type: "category",
          data: this.xAxis,

          // nameLocation: "end", //坐标轴名称显示位置。
          axisLabel: {
            // interval: 0,
            rotate: this.italic,
            // show: true,
            textStyle: {
              color: "#fff",
              fontSize: 15
            }
          },
          axisLine: {
            lineStyle: {
              // type: "solid",
              color: "#fff",
              width: "1"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#444"],
              width: 1,
              type: "solid"
            }
          }
        },
        series: []
      };
    },
    sideBar() {
      return this.$store.state.sideBar;
    }
  },
  methods: {
    initBar() {
      this.echartsBarInstance = echarts.init(document.getElementById(this.id));
    },
    setSeries() {
      if (!Array.isArray(this.value[0])) {
        this.optionBar.series = [
          {
            name: this.legend ? this.legend[0] : "",
            data: this.value,
            type: "bar",
            barWidth: this.width,
            tooltip: {
              show: true
            },
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 12
              },
              // formatter: "{c}  {name|{a}}",
              formatter: "{c}",
              rich: {
                name: {
                  textBorderColor: "#fff"
                }
              }
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.color[0] },
                { offset: 0.7, color: this.color[1] },
                { offset: 1, color: this.color[2] }
              ])
            }
          }
        ];
      } else if (this.value && this.value.length !== 0) {
        let result = this.value.map((item, i) => {
          return {
            name: this.legend ? this.legend[i] : "",
            data: item,
            type: "bar",
            barWidth: this.width,
            tooltip: {
              show: true
            },
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 12
              },
              // formatter: "{c}  {name|{a}}",
              formatter: "{c}",
              rich: {
                name: {
                  textBorderColor: "#fff"
                }
              }
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.color[3 * i] },
                { offset: 0.7, color: this.color[3 * i + 1] },
                { offset: 1, color: this.color[3 * i + 2] }
              ])
            }
          };
        });
        this.optionBar.series = result;
      }
    },
    setOptionBar() {
      this.setSeries();
      // this.optionBar.series = [];
      this.echartsBarInstance.setOption(this.optionBar, true);
      // this.echartsBarInstance.clear();
    },
    resize() {
      this.echartsBarInstance.resize();
    }
  },
  mounted() {
    let that = this;
    this.initBar();
    this.setOptionBar();
    // 监听视图resize
    window.addEventListener("resize", this.resize);
    // 监听容器resize
    // let oBar = this.$refs.bar;

    // legend 切换事件
    this.echartsBarInstance.on("legendselectchanged", function(obj) {
      that.$emit("legendChange", obj);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style lang='scss' scoped>
</style>