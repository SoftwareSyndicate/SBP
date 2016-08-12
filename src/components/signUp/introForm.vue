<template>
  <div class="intro-form">
    <div class="image-wrapper">
      <img class="iphone-image" src="~images/iphone_img.png" alt="" />
    </div>
  </div>
</template>

<script>
import BaseComponent from 'rms-components/base/baseComponent.vue'
import UserModel from 'rms-models/UserModel.js'

var IntroForm = BaseComponent.extend({
  name: 'IntroForm',
  data(){
    return {

    }
  },
  created(){
    this.$dispatch('setNavHeaderVisible', false);
  },

  methods: {

  }
});

export default IntroForm;
</script>

<style lang="scss">
@import '~sbpStyles/main.scss';

.intro-form {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  flex-direction: column;
  background: $color-orange-1;

  .image-wrapper {
    padding: 0 50px;
    padding-top: 40px;
    .iphone-image {
      width: 100%;
      height: auto;
    }
  }

}
</style>
