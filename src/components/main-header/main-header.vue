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
$base-color: #3F3F3F;

.header-wrapper{
    height: 64px;

    width: 100%;
    background-color: $base-color;
    padding: 0 120px;
    font-size: 14px;

    .logo,.nav{
        float: left;
    }
    .header-right{
        float: right;
        display: inline-block;
    }
    .nav,.header-right{
      line-height: 64px;
    }

}

.logo{
    display: inline-block;
    padding: 10px 50px;
    box-sizing:border-box;
    background-color: rgba(255,255,255,0.45);
    border-radius: 5px;
    color: #fff;
    vertical-align: middle;
    margin-top: 12px;
}
.nav{
    .nav-item{
        float: left;
        padding: 0 20px;
        a{
          color: rgba(255,255,255,0.45);
          font: 14px "Microsoft Yahei";
        }
        .router-link-active{
          color: #fff;
        }
    }
}




</style>
