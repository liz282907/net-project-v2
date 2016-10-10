<template>
   <div class="manage-container">
       <div class="form-part">
            <el-breadcrumb separator="/" class="bread-crumb">
                <el-breadcrumb-item>全部</el-breadcrumb-item>
                <el-breadcrumb-item>{{curTopic}}
                    <i class="iconfont">&#xe62a;</i>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <el-input placeholder="请输入内容" v-model="searchInput" style="width: 300px;">
                          <el-select v-model="select" slot="prepend">
                            <el-option label="关键词" value="keyword"></el-option>
                            <el-option label="分类" value="category"></el-option>
                          </el-select>
                        </el-input>
                </el-breadcrumb-item>
            </el-breadcrumb>
       </div>

   </div>

</template>

<script>


export default {
  components: {
    // "": ElBreadcrumb
  },
  data(){
    return {
        curTopic: "习近平"
    }
  }
};
</script>

<style>

</style>
