<template>
  <div ref="viewPdf" :id="pdfId" class="view-pdf"></div>
</template>
<script>
    import Pdfh5 from "pdfh5"
    import "pdfh5/css/pdfh5.css"
    import { v4 } from "uuid";
    export default {
        name: 'pdfH5',
        props: {
          url: {
            type: String,
            default: ''
          },
          lazy: {
            type: Boolean,
            default: false
          }
        },
        data() {
          return {
            visible: false,
            pdfh5: null,
            totalNum: 0,
            pdfId: `viewpdf${v4().replace(/-/g, '')}`
          }
        },
        // watch: {
        //   url: {
        //     // immediate: true,
        //     handler: function(){
        //       console.log('watch____________', this.url)
        //       this.openPdf(this.url);
        //     }
        //   }
        // },
        mounted(){
          console.log('mounted', this.url);
          this.$nextTick(function(){ // mounted生命周期无法正确使用pdf插件使用原生方法获取dom，需要添加nextTick
            if(this.url){
              this.openPdf(this.url);
            }
          })
        },
        activated(){
          console.log('activated')
        },
        methods: {
          openPdf(url) {
            // let pdfDom = document.getElementById('viewPdf');
            // console.log('openpdf', pdfDom, this.$refs.viewPdf, this.url);
            const that = this;
            this.visible = true
            this.pdfh5 = new Pdfh5(`#${this.pdfId}`, {
                pdfurl: url,
                lazy: this.lazy
            })

            // 监听pdf准备开始渲染
            this.pdfh5.on('ready', function(){
              that.totalNum = this.totalNum;
              console.log('pdf ready')
              that.$emit('loadFinish');
            });

            // 监听完成事件
            this.pdfh5.on("complete", function (status, msg, time) {
              console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
              console.log('pdf complete');
              that.$emit('renderFinish');
            })

            // 监听pdf渲染
            this.pdfh5.on('render', function(currentNum, time, currentPageDom){
              console.log(`总页数：${that.totalNum}当前渲染页：${currentNum}当前渲染dom：${currentPageDom}`);
              if(that.totalNum == currentNum){
                const viewer = document.getElementsByClassName('viewerContainer')[0];
                // console.log(`可滚动高度：${viewer.scrollHeight} 父元素高度： ${viewer.offsetHeight} ${viewer.scrollTop}+${viewer.offsetHeight}  >= ${viewer.scrollHeight} - 100`)
                that.$nextTick(function(){
                  console.log(`nextTick 可滚动高度：${viewer.scrollHeight} 父元素高度： ${viewer.offsetHeight} ${viewer.scrollTop}+${viewer.offsetHeight}  >= ${viewer.scrollHeight} - 100`)
                  let noScoll = (viewer.scrollTop + viewer.offsetHeight) >= (viewer.scrollHeight - 200)
                  console.log('noScoll:', noScoll);
                  if(noScoll){
                    that.$emit('bottomFlag');
                  }
                })

                viewer.addEventListener('scroll', () => {
                  const ifDown =
                    viewer.scrollTop + viewer.offsetHeight >=
                    viewer.scrollHeight - 200; // 预留一点距离
                  // console.log('滚动中：' , viewer.scrollTop + viewer.offsetHeight, viewer.scrollHeight)
                  if (ifDown) {
                    that.$emit('bottomFlag', ifDown);
                  }
                });
              }
            })

              
          },
        }
    }
</script>

<style lang="scss" scoped>
  .view-pdf {
    width: 100%;
    height: 100%;
  }
</style>