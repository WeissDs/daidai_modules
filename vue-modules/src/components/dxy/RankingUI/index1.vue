<template>
  <div class="pf-ranking">
    <ul v-if="data.length>0">
      <template v-if="length==1">
        <li v-for="(item, index) in listData" :key="index">
          <span class="txt">{{ item.name }}</span>
          <span class="col" :style="{}">
            <i :style="{ width: item.num/max*100 + '%' }">
              <span class="num">{{ item.num }}</span>
            </i>
          </span>
        </li>
      </template>
      <template v-if="length>1">
        <li v-for="(item, index) in listData" class="two" :key="index">
          <span class="txt">{{ item.name }}</span>
          <div>
            <div v-for="i in length" :key="i">
              <span class="col" :style="{}">
                <i :style="{ width: item.num?item.num[i-1]/max*100 + '%':0}">
                  <span class="num">{{ item.num?item.num[i-1]:'' }}</span>
                </i>
              </span>
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
            // console.log(arrCope);
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
};
</script>

<style lang="scss" scoped>
.pf-ranking {
  height: 100%;
  overflow-y: auto;
  ul {
    width: 100%;
    // margin: 0 auto;
    padding: 0;
    li {
      // height: 5.4vh;
      // min-height: 35px;
      margin: 20px 0;
      list-style: none;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .txt {
        width: 10%;
        font-size: 16px;
        line-height: 2vh;
        margin-right: 2%;
        color: #64758f;
        @media screen and (max-width: 1600px) {
          font-size: 12px;
        }
      }
      .col {
        width: 80%;
        // height: 2vh;
        // padding: 14px 0;
        display: inline-flex;
        flex-direction: column;

        i {
          position: relative;
          white-space: nowrap;
          flex: 1;
          min-height: 17px;
          width: 0;
          color: #fff;
          font-weight: bold;
          // background-color: #3058f7;
          background-image: linear-gradient(to right, #049ffc, #32d0ff);
          text-align: right;
          padding-right: 6px;
          font-size: 12px;
          line-height: 2.1vh;
          margin-top: 3px;
          border-radius: 0 17px 17px 0;
          &:nth-child(1) {
            margin-top: 0;
          }
          .num {
            position: absolute;
            right: -30px;
            top: 50%;
            transform: translateY(-50%);
            margin: 0;
            font-family: "Microsoft Yahei";
            color: #049ffc;
          }
        }

        // border-left: 2px solid #009ff7;
        // border-left: 2px solid #541c1c;
      }
    }
  }
  .two {
    display: flex;
    align-items: center;
    margin: 30px 0;
    & > div {
      flex: 1;
      .col {
        margin: 6px 0;
        width: 65%;
      }
      .right {
        width: 35%;
      }
    }
  }
}
</style>
