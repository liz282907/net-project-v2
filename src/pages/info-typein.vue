<template>

   <div class="typein-container"  v-loading.fullscreen="fullscreenLoading">
        <div class="typein-nav">
            <!-- 当tab数目多时，建议用路由配置+子组件，tab动态渲染v-for -->
             <el-tabs>
                <el-tab-pane label="关键词录入">
                    <div class="filter-topic form-item">
                        <span class="tag-key">主题</span>
                        <el-radio-group v-model="userChoice.chosenTopic" size="small">
                          <el-radio-button v-for="topic in topics"  :label="topic"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="filter-category form-item">
                        <span class="tag-key">分类</span>
                        <el-select v-model="userChoice.chosenCategories" multiple size="small">
                            <el-option
                              v-for="item in categories"
                              :label="item.zh_name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="file-upload form-item">
                        <span class="tag-key">关键词</span>
                        <el-upload
                          action="/upload"
                          type="drag"
                          :multiple="true"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :on-success="handleUploadState('success')"
                          :on-error="handleUploadState('error')"
                        >
                          <i class="el-icon-upload"></i>
                          <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip">只能上传txt文件</div>
                        </el-upload>
                    </div>

                    <div class="button-group form-item">
                        <el-button size="small">取消</el-button>
                        <el-button type="primary" size="small" @click.native="typeinWords">上传</el-button>
                    </div>


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
        userChoice:{
            chosenCategories: [],
            chosenTopic: '',
        },


        fullscreenLoading: false
    }
  },

  methods:{
    showMessage(message,type){
        this.$message({message,type});
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleUploadState(state){
        if(state==="success")
            this.showMessage("文件上传成功","success");
        else
            this.showMessage("文件上传失败","error");
    },
    typeinWords(){
        this.$http.post(urls.typein,this.userChoice)
                    .then(response=>{
                        this.showMessage("关键词录入成功","success")
                    })
                    .catch(err=>{
                        console.log(" 关键词录入失败 ",err);
                        this.showMessage("关键词录入失败","error");
                    })
    }
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
