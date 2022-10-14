<template>
  <section class="keyboard">
    <ul class="keyboard-num-ul" v-if="!showLetterView">
      <li
        v-for="index in 9"
        :key="index"
        @click="press(index)"
        :class="[chooseItem == index ? 'press-color' : '']"
      >
        {{ index }}
      </li>
      <li @click="toggleKey">
        abc
      </li>
      <li @click="press(0)" :class="[chooseItem == 0 ? 'press-color' : '']">
        0
      </li>
      <li
        class="delete-li"
        @click="deleteNumber()"
        :class="[chooseItem == -1 ? 'press-color' : '']"
      >
        <img :src="require('@/assets/images/delete.png')" alt="" class="img" />
      </li>
    </ul>
    
    <div class="keyboard-letter-ul" v-else>
      <ul class="line1">
        <li
          v-for="(item, index) in letters1"
          :key="index"
          @click="press(item)"
          :class="[chooseItem == item ? 'press-color' : '']"
        >
        {{item}}
        </li>
      </ul>
      <ul class="line2">
        <li
          v-for="(item, index) in letters2"
          :key="index"
          @click="press(item)"
          :class="[chooseItem == item ? 'press-color' : '']"
        >
        {{item}}
        </li>
      </ul>
      <ul class="line3">
        <li class="up-li" @click="toggleUppers">
          <img :src="require('@/assets/images/up.png')" alt="" class="up-img">
        </li>
        <li
          v-for="(item, index) in letters3"
          :key="index"
          @click="press(item)"
          :class="[chooseItem == item ? 'press-color' : '']"
        >
        {{item}}
        </li>
        <li
          class="delete-li"
          @click="deleteNumber()"
          :class="[chooseItem == -1 ? 'press-color' : '']"
        >
          <img :src="require('@/assets/images/delete.png')" alt="" class="img" />
        </li>
      </ul>
      <ul class="line4" @click="toggleKey">
        切换数字键盘
      </ul>
    </div>
    
  </section>
</template>

<script type="text/babel">
export default {
  name: 'Keyboard',

  props: {},
  data() {
    return {
      showPassword: false,
      showLetterView: false,
      value: '',
      chooseItem: null,
      letters1: ['q','w', 'e', 'r', 't', 'y', 'u', 'i', 'o','p'],
      letters2: [ 'a','s','d','f','g','h', 'j', 'k', 'l'],
      letters3: [ 'z','x','c','v','b','n','m'],
      upper: false // 大小写标识 false：小写, true：大写
    };
  },
  computed: {},
  watch: {
    chooseItem() {
      setTimeout(() => {
        this.chooseItem = null;
      }, 100);
    },
  },
  methods: {
    deleteNumber() {
      this.chooseItem = -1;
      this.$emit('deleteNumberParent');
    },
    press(key) {
      this.chooseItem = key;
      this.$emit('pressParent', key);
    },
    // 切换字母数字键盘
    toggleKey(){
      this.showLetterView = !this.showLetterView;
    },
    // 大小写转换
    toggleUpper(arr){
      let result = arr.map((item) => {
        if(this.upper){
          return item.toUpperCase();
        } else {
          return item.toLowerCase();
        }
      });
      return result;
    },
    toggleUppers(){
      this.upper = !this.upper;
      this.letters1 = this.toggleUpper(this.letters1);
      this.letters2 = this.toggleUpper(this.letters2);
      this.letters3 = this.toggleUpper(this.letters3);
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>