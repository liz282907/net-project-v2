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
  <div >
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

import { urls } from '../utils/constants';

export default {
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter,
  },
  data(){
    return {
      subjects:[],
      categories:[],
      // fullscreenLoading: false
    }
  },
  created(){
    //fetch subject and category
    console.log("---------app.vue created------------");
    let topicPromise = this.$http.get(urls.topic,{params: {type: 0}})
        .then(response=>{
          this.subjects = response.body;
        });
    let categoryPromise = this.$http.get(urls.category,{params: {type: 1}})
        .then(response=>{
          this.categories = response.body;
        });
    Promise.all([topicPromise,categoryPromise]).then(response=> {
        console.log("app.vue获取数据成功");
      })
        .catch(err=>{
          console.log("获取数据失败");

        });
  },
  beforeMount(){
    console.log("---------app.vue beforeMount------------");
  },
  mounted(){
    console.log("---------app.vue mount------------");
  }
};
</script>


