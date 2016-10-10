<template>
  <div class="header-wrapper clearfix">
      <h1 class="logo">关键词</h1>
      <ul class="nav clearfix">
        <li v-for="item in navList" class="nav-item">
            <router-link :to="item.url">{{item.zh_name}}</router-link>
        </li>
      </ul>
    <div class="header-right clearfix">
      <span class="nav-item user-photo" data-imgsrc="">
          luchen
      </span>
    </div>
  </div>
</template>

<script>
import navList from '../../../utils/constants';


export default {

  props: ['curUser'],
  data() {
    return {

      navList,
      // curUser: "luchen"

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "scss">





</style>
