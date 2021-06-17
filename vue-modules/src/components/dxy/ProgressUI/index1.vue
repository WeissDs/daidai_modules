<template>
  <div class="progress-box" ref="idPro">
    <svg width="100%" height="100%" class="svg-box" v-if="width!==0">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8efffa;stop-opacity:1" />
          <stop offset="8%" style="stop-color:#8efffa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3058f7;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#222c31" stroke-width="17" />
      <circle
        id="move-cir"
        cx="50%"
        cy="50%"
        r="40%"
        fill="transparent"
        stroke="url(#grad1)"
        stroke-width="18"
        stroke-linecap="round"
        :stroke-dasharray="this.offsetDash"
        :stroke-dashoffset="this.proData"
      />
    </svg>
    <div class="title">
      <p :style="{fontSize:title.fontSize,top:title.top,color:title.color}">{{title.name}}</p>
      <p class="sub-title" v-if="title.subName" style="margin-top:10px;">{{title.subName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Number
      // default: 0
    },
    title: {
      type: Object,
      default: function() {
        return {
          name: "0%",
          subName: "333",
          fontSize: "",
          top: "",
          color: ""
        };
      }
    }
  },
  data() {
    return {
      width: 0,
      proData: 0
    };
  },
  computed: {
    offsetDash: function() {
      return (parseInt(this.width) * 0.8 * 3.1415).toFixed(0);
    },
    offsetData: function() {
      return (this.offsetDash / 100) * (100 - parseInt(this.data));
    }
  },
  watch: {
    data: function() {
      this.setData();
    }
  },
  methods: {
    setData() {
      this.proData = (parseInt(this.width) * 0.8 * 3.1415).toFixed(0);
      setTimeout(() => {
        this.proData = this.offsetData;
      });
    }
  },
  mounted() {
    this.width = this.$refs.idPro.offsetWidth;
    this.proData = (parseInt(this.width) * 0.8 * 3.1415).toFixed(0);
    setTimeout(() => {
      this.proData = this.offsetData;
    });
  }
};
</script>

<style lang='scss' scoped>
.progress-box {
  width: 100%;
  height: 100%;
  position: relative;
  .svg-box {
    transform: rotate(-90deg);
  }
  #move-cir {
    transition: stroke-dashoffset 0.5s linear;
  }
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: #bbdfe6;
    p {
      margin: 0;
    }
    .sub-title {
      font-size: 16px;
    }
  }
}
</style>