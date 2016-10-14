<style lang="scss">
@import './assets/styles/common/index.scss';
@import "./assets/styles/fonts/iconfont.css";
@import './assets/styles/components/index.scss';
@import './assets/styles/pages/index.scss';


.container{
  background-color: #F4F4F4;
}
</style>

<template>
  <div>
      <main-header></main-header>
      <main class="container">
          <router-view></router-view>
      </main>
      <main-footer></main-footer>
  </div>


</template>

<script>
import MainHeader from './components/main-header/main-header';
import MainFooter from './components/main-footer/main-footer';

export default {
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter,
  },
};
</script>


