<template>
  <div class="cmp-dxy-page">
    <!-- 穿梭框 -->
    <el-card>
      <div slot="header" class="dxy-title">
        <span>穿梭框</span>
      </div>
      <TransferDXY
        :data="transferData"
        v-model="transferValue"
        :titles="transferTitle"
        style="height:280px"
      />
    </el-card>

    <!-- 勾选框 (v-model不需要时可以不输入) -->
    <el-card>
      <div slot="header" class="dxy-title">
        <span>勾选框</span>
      </div>
      <CheckboxDXY v-model="checkboxValue" data="勾选框" />
      <CheckboxDXY data="勾选框" :disabled="true" />
    </el-card>

    <!-- 排名(样式一) -->
    <el-card>
      <div slot="header" class="dxy-title">
        <span>排名(样式一)</span>
      </div>
      <p class="dxy-explain">按数字由大到小排序（左侧排序数字为作用域插槽，右侧百分比内容为插槽）</p>
      <RankingUI :data="rankData0" style="width:60%;">
        <template v-slot:aa="scope">{{scope.count}} .</template>
        <template v-slot:default="scope">
          <div>
            <p v-if="scope.row.percent>=0">↑</p>
            <p v-if="scope.row.percent<0">↓</p>
            {{scope.row.percent}}%
          </div>
        </template>
      </RankingUI>
      <p class="dxy-explain" style="margin-top:50px;">可以存在一个项对多条数据的情况，默认按照第一条数据排序</p>
      <RankingUI :data="rankData1" style="width:60%;">
        <template v-slot:aa="scope">{{scope.count}} .</template>
        <template v-slot:default="scope">
          <div>
            <p v-if="scope.row.percent>=0">↑</p>
            <p v-if="scope.row.percent<0">↓</p>
            {{scope.row.percent}}%
          </div>
        </template>
      </RankingUI>
    </el-card>

    <!-- 排名(样式二) -->
    <el-card>
      <div slot="header" class="dxy-title">
        <span>排名(样式二)</span>
      </div>
      <RankingUI1 :data="rankData2" style="width:60%;" />
    </el-card>

    <!-- 环形百分比图 -->
    <el-card>
      <div slot="header" class="dxy-title">
        <span>环形百分比图</span>
      </div>
      <ProgressUI :data="progressData" style="width:60%;margin:0 auto;" />
    </el-card>

    <!-- 环形百分比图 -->
    <el-card>
      <div slot="header" class="dxy-title">
        <span>环形百分比图</span>
      </div>
      <RowLineUI :data="rowLineData" style="width:60%;margin:0 auto;" />
    </el-card>

    <!-- 数字+字母键盘 -->
    <el-card>
      <div slot="header" class="dxy-title">
        <span>数字+字母键盘</span>
      </div>
      <KeyboardUI />
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 穿梭框
      transferData: [
        {
          label: "aaaa",
          key: "111"
        },
        {
          label: "bbbb",
          key: "222"
        },
        {
          label: "cccc",
          key: "333"
        },
        {
          label: "dddd",
          key: "444"
        },
        {
          label: "eeee",
          key: "555"
        }
      ],
      transferValue: [],
      transferTitle: ["左", "右"],
      // 勾选框
      checkboxValue: false,
      // 排名
      rankData0: [
        { name: "襄阳市院", num: 88, percent: 10 },
        { name: "襄阳市院院院院院院院院院院院院院", num: 88, percent: 10 },
        { name: "襄城区", num: 10, percent: -10 },
        { name: "襄城区", num: 90, percent: -10 },
        { name: "襄城区", num: 50, percent: -10 }
      ],
      rankData1: [
        { name: "襄阳市院", num: [220, 17, 90, 30] },
        { name: "襄城区", num: [80, 28, 80, 56] }
      ],
      rankData2: [
        { name: "樊城区樊城区樊城区", num: 22 },
        { name: "襄州区", num: 90 },
        { name: "枣阳市", num: 223 },
        { name: "宜城市", num: 123 },
        { name: "南漳县", num: 321 },
        { name: "保康县", num: 222 },
        { name: "谷城县", num: 123 },
        { name: "老河口市", num: 111 }
      ],
      // 环形百分比图
      progressData: 80,
      // 横向比例图
      rowLineData: [40, 80]
    };
  }
};
</script>

<style lang='scss' scoped>
.cmp-dxy-page {
  & > div {
    margin-top: 26px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>