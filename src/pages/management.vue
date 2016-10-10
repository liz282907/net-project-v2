<template>
   <div class="manage-container">
       <div class="filter-part">
            <el-breadcrumb separator="/" class="filter-breadcrumb">
                <el-breadcrumb-item>全部</el-breadcrumb-item>
                <el-breadcrumb-item>{{curTopic}}
                    <i class="iconfont">&#xe62a;</i>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <el-input placeholder="请输入内容" v-model="searchInput" style="width: 300px;">
                          <el-select v-model="searchSelect" slot="prepend">
                            <el-option label="关键词" value="keyword"></el-option>
                            <el-option label="分类" value="category"></el-option>
                          </el-select>
                        </el-input>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="filter-tags">
                <section class="tag-bar clearfix">
                    <span class="tag-key">分类：</span>
                    <div class="tag-value">
                        <ul class="tag-expand clearfix" >
                            <li v-for="item in categories" class="tag">{{item}}</li>
                        </ul>
                        <span class="tag-more">展开<i class="iconfont arrow-closed">&#xe62a;</i></span>
                    </div>

                </section>
                <section class="tag-bar clearfix">
                    <span class="tag-key">显示内容：</span>
                    <div class="tag-value">
                        <ul class="tag-expand clearfix" >
                            <li v-for="item in auditStates" class="tag">{{item}}</li>
                        </ul>
                        <span class="tag-more">展开<i class="iconfont arrow-closed">&#xe62a;</i></span>
                    </div>

                </section>
            </div>
       </div>
       <div class="table-part"></div>

   </div>

</template>

<script>

export default {
  components: {
    // "": ElBreadcrumb
  },
  data(){
    return {
        curTopic: "习近平",
        searchInput: '',
        searchSelect: '',
        categories: [ "全部","出访","下基层","讲话","国际会议" ],
        auditStates: [ "全部","未审核","已通过","未通过" ]
    }
  }
};
</script>

<style>

</style>
