<template>
  <div>
    {{optionBar.series}}
    <div :id="id" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    xAxis: {
      type: Array,
      default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    value: {
      type: Array,
      default: [120, 200, 150, 80, 70, 110, 300]
    },
    value2: {
      type: Array
      // default: []
    },
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
        return ["#3058f7", "#3058f7", "#3058f7"];
      }
    },
    legend: {
      type: Array
    }
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
            color: "#fff"
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
              color: "#fff"
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
        series: [
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
        ]
      };
    }
  },
  methods: {
    initBar() {
      this.echartsBarInstance = echarts.init(document.getElementById(this.id));
    },
    setOptionBar() {
      if (this.value2) {
        this.optionBar.series.push({
          name: this.legend ? this.legend[1] : "",
          data: this.value2,
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
              { offset: 0, color: this.color[3] },
              { offset: 0.7, color: this.color[4] },
              { offset: 1, color: this.color[5] }
            ])
          }
        });
      }
      // this.optionBar.series = [];
      this.echartsBarInstance.setOption(this.optionBar);
      // this.echartsBarInstance.clear();
    }
  },
  mounted() {
    let that = this;
    this.initBar();
    this.setOptionBar();
    window.addEventListener("resize", function() {
      console.log(1);

      that.echartsBarInstance.clear();
      that.setOptionBar();
    });
  }
};
</script>

<style lang='scss' scoped>
</style>