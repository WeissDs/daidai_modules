<template>
  <div class="cmp-others-page">
    <el-card>
      <div slot="header" class="dxy-title">
        <span>pdf预览 依赖pdfh5插件</span>
      </div>
      <ViewPdf :url="pdfUrl" class="pdf" />
    </el-card>
    <el-card>
      <div slot="header" class="dxy-title">
        <span>获取公网ip</span>
      </div>
      <!-- 获取公网ip -->
      <OuterIp ></OuterIp>
      <div class="outer-ip-inner">
        <button @click="getOuterIpData">点击获取公网ip</button>
        <div>{{outerIpData}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import OuterIp from '@/components/others/OuterNetIp';
export default {
  data() {
    return {
      pdfUrl: './test.pdf', // pdf展示组件入参 url
      outerIpData: ''
      
    };
  },
  components: { OuterIp },
  methods:{
    getOuterIpData(){
      if( returnCitySN ){
        this.outerIpData = returnCitySN['cip'];
      }
      
      // console.log( returnCitySN , returnCitySN['cip'] );
    }
  },
  mounted(){
    setTimeout(function(){ // 需要等异步请求结束后才能取到返回值 给了4秒 网络过慢会获取不到
      console.log( returnCitySN , returnCitySN['cip'] );
    }, 4000);
  }
};
</script>

<style lang='scss' scoped>
.cmp-others-page {
  & > div {
    margin-top: 26px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}

.outer-ip-inner{
  display: flex;
  align-items: center;
  & > div {
    padding: 0 30px;
  }
}
</style>