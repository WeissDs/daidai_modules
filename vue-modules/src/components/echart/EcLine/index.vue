<template>
  <div :id="id"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    value: Array,
    xAxis: Array,
    legend: Array,
    color: {
      type: Array,
      default: function() {
        // return ["#3058f7", "#00a4fc", "#fcb441"];
        return ["#3058f7", "#e43a3a"];
      }
    },
    max: Number,
    grid: {
      type: Object,
      default: function() {
        return {
          left: "4%",
          right: "2%",
          top: "16%",
          bottom: "10%"
        };
      }
    },
    unit: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      id:
        "echarts-line-" + new Date() + ((Math.random() * 1000).toFixed(0) + "")
    };
  },
  computed: {
    option: function() {
      return {
        grid: this.grid,
        xAxis: {
          type: "category",
          data: this.xAxis,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            fontSize: 14
          }
        },
        color: this.color,
        legend: {
          data: this.legend,
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            console.log("tooltip", params);
            var result = params[0].axisValue + "</br>";
            params.map(res => {
              result = `${result}<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${res.color}"></span> ${res.seriesName}: ${res.data}%</br>`;
            });
            return result;
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#444"],
              width: 1,
              type: "solid"
            }
          },
          max: this.max,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: []
      };
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.chartsInstance.clear();
        this.setOption();
      }
    }
  },
  methods: {
    initLine() {
      this.chartsInstance = echarts.init(document.getElementById(this.id));
    },
    setSeries() {
      if (this.value && this.value.length !== 0) {
        if (!Array.isArray(this.value[0])) {
          this.option.series = [
            {
              name: this.legend ? this.legend[0] : "",
              data: this.value,
              type: "line",
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: "#fff",
                    formatter: "{@score}" + this.unit
                  }
                }
              }
            }
          ];
        } else {
          let result = [];
          result = this.value.map((item, i) => {
            return {
              name: this.legend ? this.legend[i] : "",
              data: item,
              type: "line",
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: "#fff",
                    formatter: "{@score}" + this.unit
                  }
                }
              }
            };
          });
          this.option.series = result;
        }
      }
    },
    setOption() {
      this.setSeries();
      this.chartsInstance.setOption(this.option);
    }
  },
  mounted() {
    this.initLine();
    this.setOption();
  }
};
</script>

<style lang='scss' scoped>
</style>