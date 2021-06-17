<template>
  <div class="dxy-tab" v-if="showTop">
    <div>
      <span class="logo">VUE栈组件{{menuPath}}={{topMenuPath}}=={{$route.meta}}</span>
      <menuDXY
        :data="menuData"
        :active="menuPath"
        @change="topMenuChange"
        style="justify-content: flex-end;"
      ></menuDXY>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuData: Array,
    menuPath: String
  },
  data() {
    return {
      // 用来记录top的path 用来做左侧菜单leftMenuData的切换
      topMenuPath: this.$route.name
    };
  },
  methods: {
    topMenuChange(data) {
      console.log(data);
      this.topMenuPath = data.path;
      this.$emit("change", data);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>