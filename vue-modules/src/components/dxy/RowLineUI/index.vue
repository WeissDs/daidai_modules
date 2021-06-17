<template>
  <div class="pf-row-line">
    <div class="main">
      <span class="name">{{data[0]?data[0].name:''}}</span>
      <ul class="nums">
        <el-popover
          :style="{width: (item.num/total)*100+'%'}"
          placement="top-start"
          title
          trigger="hover"
          :content="item.num+(unit?unit:'')"
          v-for="(item,index) in data"
          :key="index"
        >
          <template slot="reference">
            <li style="width:100%;" @click="onClick(item)">{{(item.num/total*100).toFixed(2)}}%</li>
          </template>
        </el-popover>
      </ul>

      <span class="name">{{data[1]?data[1].name:''}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    unit: String
  },
  data() {
    return {
      data1: []
    };
  },
  computed: {
    total: function() {
      let a = 0;
      this.data.forEach(item => {
        a += item.num;
      });
      if (a == 0) {
        a = 1;
      }
      return a;
    }
  },
  methods: {
    ss() {
      this.data[1].num += 1;
    },
    onClick(item) {
      this.$emit("click", item);
    }
  },
  // watch: {
  //   data: {
  //     deep: true,
  //     immediate: true,
  //     handler() {
  //       this.data1 = this.data;
  //       console.log(this.data);
  //     }
  //   }
  // },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.pf-row-line {
  width: 100%;
  .main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    .name {
      width: 12%;
      font-weight: bold;
      margin-left: 10px;
      &:nth-child(1) {
        text-align: right;
        margin-right: 10px;
      }
    }
    .nums {
      padding: 0;
      margin: 0;
      width: 80%;
      display: flex;
      &:after {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      span {
        li {
          list-style: none;
          float: left;
          height: 1.96vh;
          line-height: 1.96vh;
          font-size: 12px;
          text-align: center;
          white-space: nowrap;
        }
        &:nth-child(odd) {
          li {
            background-color: #3058f7;
            color: red;
          }
        }
        &:nth-child(even) {
          li {
            background-color: #f8b140;
            color: #fff;
          }
        }
        &:nth-child(1) {
          li {
            background-color: #3058f7;
            color: #fff;
          }
        }
        &:last-child {
          li {
            background-color: #00a4fc;
            color: #fff;
          }
        }
      }
      li {
        &:nth-child(odd) {
          background-color: #3058f7;
          color: red;
        }
        &:nth-child(even) {
          background-color: #3058f7;
          color: #fff;
        }
        &:nth-child(1) {
          background-color: #3058f7;
          color: #fff;
        }
        &:last-child {
          background-color: #ff4070;
          color: #fff;
        }

        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>