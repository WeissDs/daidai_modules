<template>
  <div class="col-percent" :style="{padding:'0 '+data.padding}">
    <div class="out-line">
      <p>{{data.num}}%</p>
      <div :style="{height:data.num+'%'}">
        <svg
          class="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          id="738255fe-a9fa-4a5e-963a-8e97f59370ad"
          data-name="3-waves"
          viewBox="0 0 600 215.43"
        >
          <title>wave shape</title>
          <path
            class="871c1787-a7ef-4a54-ad03-3cd50e05767a"
            d="M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z"
            transform="translate(-76 -985)"
            fill="#00a4fc"
          />
        </svg>
      </div>
    </div>
    <div class="line"></div>
    <p>{{data.title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return { num: 20, padding: "4%", title: "aoidfon" };
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.col-percent {
  padding: 0 4%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 16px;
  .out-line {
    width: 100%;
    flex: 1;
    border: 2px solid #3058f7;
    position: relative;
    overflow: hidden;
    & > p {
      color: #fff;
      position: absolute;
      top: 3px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .wave-svg {
      width: 100%;
      overflow: hidden;
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      transform: scale(3) translateY(20%);
      animation: svgMove 5s linear infinite;
    }
    @keyframes svgMove {
      0% {
        left: -50%;
      }
      50% {
        left: 80%;
      }
      100% {
        left: -50%;
      }
    }
    & > div {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40%;
      // background-color: #3058f7;
      background-color: #00a4fc;
    }
  }
  .line {
    height: 24px;
  }
  & > p {
    position: absolute;
    padding-top: 6px;
    white-space: nowrap;
    font-size: 14px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
}
</style>