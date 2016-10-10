<style lang="scss">
@import './assets/styles/common/index.scss';
@import './assets/styles/components/index.scss';


html {
  height: 100%;
}

body {

}
</style>

<template>
  <div id="#app">
      <main-header></main-header>
      <main>
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


