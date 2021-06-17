<template>
  <div class="pf-ranking">
    <ul v-if="data.length>0">
      <!-- 单个值的情况 -->
      <template v-if="length==1">
        <li v-for="(item, index) in listData" :key="index" class="single-li">
          <span class="txt">
            <slot name="aa" :count="index+1"></slot>
            {{ item.name }}
          </span>
          <span class="col" :style="{}">
            <span
              :style="{ width: item.num/max*100 + '%' }"
            >{{ item.num }} {{item.unit?item.unit:''}}</span>
          </span>
          <div class="right">
            <slot :row="item"></slot>
          </div>
        </li>
      </template>
      <!-- 多个值的情况 -->
      <template v-if="length>1">
        <li v-for="(item, index) in listData" :key="index" class="multi-li">
          <span class="txt">
            <slot name="aa" :count="index+1"></slot>
            {{ item.name }}
          </span>
          <div class="two-right">
            <div v-for="i in length" :key="i">
              <span class="col">
                <span
                  :style="{ width: item.num?item.num[i-1]/max*100 + '%':0,background:i==1?'#06a1fc':'#fcb441' }"
                >{{ item.num?item.num[i-1]:'' }} {{i==1?'件':'人'}}</span>
              </span>
              <slot name="right"></slot>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    sort: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function() {
        // console.log(this, this.$scopedSlots);
        if (this.data.length == 0) {
          return;
        }
        let arrCope = JSON.parse(JSON.stringify(this.data));
        if (Array.isArray(arrCope[0].num) && arrCope.length != 0) {
          // 多个数据
          // console.log(arrCope);
          this.length = arrCope[0].num.length;
          let arr = [];
          for (let i = 0; i < this.length; i++) {
            let itemArr = arrCope.map(item => {
              return item.num[i];
            });
            arr = arr.concat(itemArr);
          }
          // console.log(arr);
          this.max = Math.max.apply(null, arr);
          if (this.sort) {
            this.listData = arrCope.sort((a, b) => {
              let value1 = a.num[0];
              let value2 = b.num[0];
              return value2 - value1;
            });
            // console.log("!!", arrCope);
            this.listData = arrCope;
          }
        } else {
          // 单个数据
          this.length = 1;
          let arr = arrCope.map(item => {
            return item.num;
          });
          this.max = Math.max.apply(null, arr);
          if (this.sort) {
            this.listData = arrCope.sort((a, b) => {
              let value1 = a.num;
              let value2 = b.num;
              return value2 - value1;
            });
          }
          this.listData = arrCope;
        }

        // console.log(this.listData);
      }
    }
  },
  data() {
    return {
      listData: [],
      max: 0,
      length: 1
    };
  }
  // mounted() {
  //   if (this.$scopedSlots.aa) {
  //     console.log(true);
  //   } else {
  //     console.log(false);
  //   }
  //   console.log(this, this.$scopedSlots, this.$slots);
  // }
};
</script>

<style lang="scss" scoped>
.pf-ranking {
  height: 100%;
  overflow-y: auto;
  ul {
    width: 100%;
    padding: 0;
    .single-li {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        // vertical-align: middle;
      }
      & > .txt {
        flex: 2;
        width: 0;
        min-height: 40px;
        line-height: 30px;
        font-size: 16px;
        padding-right: 6px;
        border-right: 2px solid #541c1c;
        word-wrap: break-word;
      }
      & > .col {
        flex: 6;
        width: 0;
        font-size: 0;
        display: flex;
        align-items: center;
        height: 40px;
        span {
          display: inline-block;
          white-space: nowrap;
          height: 20px;
          line-height: 20px;
          width: 0;
          color: #fff;
          font-weight: bold;
          background-color: #fcb441;
          // background-color: #541c1c;
          text-align: right;
          padding-right: 6px;
          font-size: 12px;
        }
      }
      & > .right {
        flex: 2;
        width: 0;
      }
    }
    .multi-li {
      display: flex;
      align-items: center;
      margin-top: 30px;
      &:nth-child(1) {
        margin-top: 0;
      }
      span {
        display: inline-block;
      }
      .txt {
        flex: 1;
        width: 0;
        font-size: 16px;
      }
      .two-right {
        flex: 6;
        width: 0;
        border-left: 2px solid #541c1c;
        & > div {
          height: 30px;
          display: flex;
          align-items: center;
          & > .col {
            width: 100%;
            display: flex;
            align-items: center;
            & > span {
              height: 20px;
              line-height: 20px;
              white-space: nowrap;
              text-align: right;
              color: #fff;
              font-weight: bold;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
