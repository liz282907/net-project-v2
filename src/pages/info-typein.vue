<template>

   <div class="typein-container"  v-loading.fullscreen="fullscreenLoading">
        <div class="typein-nav">
            <!-- 当tab数目多时，建议用路由配置+子组件，tab动态渲染v-for -->
             <el-tabs>
                <el-tab-pane label="关键词录入">
                    <div class="filter-topic">
                        <span class="tag-key">主题</span>
                        <el-radio-group v-model="chosenTopic" size="small">
                          <el-radio-button v-for="topic in topics"  :label="topic"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="filter-category">
                        <span class="tag-key">分类</span>
                        <el-select v-model="chosenCategories" multiple>
                            <el-option
                              v-for="item in categories"
                              :label="item.zh_name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="file-upload"></div>

                    <div class="button-group"></div>


                </el-tab-pane>
                <el-tab-pane label="其他录入"></el-tab-pane>
            </el-tabs>
        </div>

   </div>

</template>

<script>
import { urls } from '../../utils/constants.js';

export default {
  components: {
  },

  data(){
    return {
        topics: [],
        categories: [],
        chosenCategories: [],
        chosenTopic: '',

        fullscreenLoading: false
    }
  },

  methods:{
    showMessage(message,type){
        this.$message({message,type});
    },
  },

  mounted(){
    //fetch topic + category
    this.fullscreenLoading = true;

    let promises = [urls.topic,urls.category].map(url=> this.$http.get(url));

    Promise.all(promises).then(results=>{
        this.fullscreenLoading = false;
        [this.topics, this.categories] = results.map(result=>result.data);
        // debugger;
    }).catch(reasons=>{
        this.fullscreenLoading = false;
        this.showMessage("oops,获取信息失败","error");
        console.log(reasons);
    });
  }
};
</script>

<style>

</style>
