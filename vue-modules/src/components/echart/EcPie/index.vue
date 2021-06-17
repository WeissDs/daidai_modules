<template>
  <div :id="id" style="width:100%;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    data: Array,
    ring: Boolean,
    color: {
      type: Array,
      default: function() {
        // return ["#00a4fc", "#3058f7", "#f8b140", "#fb605c", "#fff"];
        return ["#00a4fc", "#3058f7", "#f8b140","#fb605c"];
      }
    },
    labelLine: Boolean,
    position: String,
    legend: {
      type: Object,
      default: function() {
        return {
          left: 0,
          top: 0
        };
      }
    },
    title: {
      type: Object,
      default: function() {
        return {
          text: "",
          subtext: "",
          fontSize: "",
          top: ""
        };
      }
    },
    ShowLegend: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    option: function() {
      return {
        title: {
          show: true,
          text: this.title.text,
          subtext: this.title.subtext,
          left: "center",
          top: this.title.top ? this.title.top : "38%",
          itemGap: 5,
          // textVerticalAlign: "middle",
          // textAlign: "center",
          textStyle: {
            color: "#bbdfe6",
            fontSize: this.title.fontSize ? this.title.fontSize : 32
          },
          subtextStyle: {
            color: "#bbdfe6",
            fontSize: 18
          }
          // align: "left",
          // verticalAlign: "middle"
        },
        color: this.color,
        // color: ["#fb605c", "#f8b140", "#00a4fc", "#3058f7"],
        // color: ["#00254c", "#006483", "#007792", "#0d8799", "#32b6af"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show: this.ShowLegend,
          orient: "vertical",
          ...this.legend,
          data: this.data,

          // legend形状设置
          icon: "rect",
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          formatter: function(params) {
            params = params.split("");
            let result = [];
            params.forEach((item, i) => {
              result.push(item);

              if (i % 11 == 0 && i != 0) {
                console.log(i);
                result.push("\n");
              }
            });
            return result.join("");
          },
          textStyle: {
            color: "#fff",
            fontSize: 14
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: this.ring ? ["50%", "70%"] : "70%",
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            label: {
              normal: {
                // formatter: "{b}:\n {d}%",
                formatter: function(val) {
                  let name = val.name.split("");
                  let newName = [];
                  for (let i = 0; i < name.length; i++) {
                    newName.push(name[i]);
                    if (i % 3 === 0 && i !== 0) {
                      newName.push("\n");
                    }
                  }
                  newName = newName.join("");
                  return newName + "\n" + val.percent + "%";
                },
                show: this.labelLine,
                position: this.position,

                emphasis: {
                  // show: true
                },
                textStyle: {
                  //文本样式
                  fontSize: "14",
                  fontWeight: "600",
                  color: "#bbdfe6"
                }
              }
            },
            labelLine: {
              normal: {
                show: this.labelLine,
                smooth: 0.2,
                length: 10,
                length2: 20,
                lineStyle: {
                  color: "#2663a3"
                }
              }
            }
          }
        ]
      };
    },
    sideBar() {
      return this.$store.state.sideBar;
    }
  },
  data() {
    return {
      chartsInstance: null,
      id: "echarts-pie-" + new Date() + ((Math.random() * 1000).toFixed(0) + "")
    };
  },
  methods: {
    initPie() {
      this.chartsInstance = echarts.init(document.getElementById(this.id));
    },
    setOption() {
      this.chartsInstance.setOption(this.option);
    },
    reseizePie() {
      this.chartsInstance.resize();
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.setOption();
      }
      // this.chartsInstance.clear();
    },
    sideBar() {
      setTimeout(() => {
        this.reseizePie();
      }, 1000);
    }
  },
  mounted() {
    this.initPie();
    this.setOption();
    window.addEventListener("resize", this.reseizePie);
  },
  destroyed() {
    window.removeEventListener("resize", this.reseizePie);
  }
};
</script>

<style lang='scss' scoped>
</style>